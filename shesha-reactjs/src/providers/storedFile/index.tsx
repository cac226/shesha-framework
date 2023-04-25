import React, { FC, useReducer, useContext, PropsWithChildren, useEffect } from 'react';
import { storedFilesReducer as storedFileReducer } from './reducer';
import {
  StoredFileActionsContext,
  StoredFileStateContext,
  STORED_FILE_CONTEXT_INITIAL_STATE,
  IStoredFile,
  IUploadFilePayload,
  IDownloadFilePayload,
} from './contexts';
import { getFlagSetters } from '../utils/flagsSetters';
import {
  downloadFileRequestAction,
  downloadFileSuccessAction,
  downloadFileErrorAction,
  uploadFileSuccessAction,
  uploadFileErrorAction,
  deleteFileRequestAction,
  deleteFileSuccessAction,
  deleteFileErrorAction,
  fetchFileInfoRequestAction,
  fetchFileInfoSuccessAction,
  fetchFileInfoErrorAction,
  uploadFileRequestAction,
  /* NEW_ACTION_IMPORT_GOES_HERE */
} from './actions';
import { useStoredFileGet, useStoredFileGetEntityProperty, StoredFileDeleteQueryParams } from '../../apis/storedFile';
import axios from 'axios';
import FileSaver from 'file-saver';
import qs from 'qs';
import { useMutate } from 'restful-react';
import { useSheshaApplication } from '../..';
import { useDelayedUpdate } from 'providers/delayedUpdateProvider';
import { STORED_FILES_DELAYED_UPDATE } from 'providers/delayedUpdateProvider/models';

export interface IStoredFileProviderPropsBase {
  baseUrl?: string;
}

export interface IEntityProperty extends IStoredFileProviderPropsBase {
  ownerId: string;
  ownerType: string;
  propertyName: string;
}

export interface ISingleFile extends IStoredFileProviderPropsBase {
  fileId: string;
}

export type FileUploadMode = 'async' | 'sync';

export interface IStoredFileProviderProps {
  ownerId?: string;
  ownerType?: string;
  propertyName?: string;
  fileId?: string;
  baseUrl?: string;
  uploadMode?: FileUploadMode;
  value?: any;
  onChange?: (value: any) => void;
}

const StoredFileProvider: FC<PropsWithChildren<IStoredFileProviderProps>> = props => {
  const {
    ownerId,
    ownerType,
    propertyName,
    fileId,
    children,
    baseUrl = 'http://sheshabackend.boxfusion.co.za',
    uploadMode = 'async',
    onChange,
    value,
  } = props;

  const [state, dispatch] = useReducer(storedFileReducer, {
    ...STORED_FILE_CONTEXT_INITIAL_STATE,
    ownerId,
    ownerType,
    propertyName,
    fileId: fileId ?? (typeof value === 'string' ? value : null),
  });

  const { httpHeaders: headers } = useSheshaApplication();

  const fileFetcher = useStoredFileGet({
    lazy: true,
    requestOptions: {
      headers,
    },
  });

  const propertyFetcher = useStoredFileGetEntityProperty({
    lazy: true,
    requestOptions: {
      headers,
    },
  });
  const { loading: isFetchingFileInfo, error: fetchingFileInfoError, data: fetchingFileInfoResponse } = state.fileId
    ? fileFetcher
    : propertyFetcher;

  const { addItem: addDelayedUpdate, removeItem: removeDelayedUpdate } = useDelayedUpdate(false) ?? {};

  const doFetchFileInfo = () => {
    if (state.fileId) fileFetcher.refetch({ queryParams: { id: state.fileId } });
    else if (ownerId && ownerType && propertyName)
      propertyFetcher.refetch({ queryParams: { ownerId, ownerType, propertyName } });
  };

  useEffect(() => {
    if (uploadMode === 'async') doFetchFileInfo();
  }, [uploadMode, ownerId, ownerType, propertyName, fileId, value]);

  useEffect(() => {
    if (uploadMode === 'sync' && value) {
      const fileInfo: IStoredFile = value
        ? {
            //id: value.uid,
            uid: value.uid,
            url: null,
            status: 'success',
            name: value.name,
            size: value.size,
            type: value.type,
            originFileObj: null,
          }
        : null;

      dispatch(fetchFileInfoSuccessAction(fileInfo));
    }
  }, [uploadMode, value]);

  useEffect(() => {
    if (!isFetchingFileInfo && uploadMode === 'async') {
      if (fetchingFileInfoResponse) {
        const fetchedFile = fetchingFileInfoResponse?.result;
        if (fetchedFile) {
          const fileInfo: IStoredFile = {
            id: fetchedFile.id,
            uid: fetchedFile.id,
            url: fetchedFile.url,
            status: 'success',
            name: fetchedFile.name,
            size: fetchedFile.size,
            type: fetchedFile.type,
            originFileObj: null,
          };

          dispatch(fetchFileInfoSuccessAction(fileInfo));
        }
      }

      if (fetchingFileInfoError) {
        // todo: handle error
      }
    }
  }, [isFetchingFileInfo, fetchingFileInfoResponse, fetchingFileInfoError]);

  const downloadFileAsync = (payload: IDownloadFilePayload) => {
    dispatch(downloadFileRequestAction());

    const url = `${baseUrl}/api/StoredFile/Download?${qs.stringify({
      id: payload.fileId,
      versionNo: payload.versionNo,
    })}`;
    axios({
      url,
      method: 'GET',
      responseType: 'blob',
      headers,
    })
      .then(response => {
        dispatch(downloadFileSuccessAction());
        FileSaver.saveAs(new Blob([response.data]), payload.fileName);
      })
      .catch(() => {
        dispatch(downloadFileErrorAction());
      });
  };

  const downloadFileSync = (_payload: IDownloadFilePayload) => {
    if (value) FileSaver.saveAs(new Blob([value]), value.name);
  };

  const downloadFile = (payload: IDownloadFilePayload) => {
    if (uploadMode === 'async') downloadFileAsync(payload);
    if (uploadMode === 'sync') downloadFileSync(payload);
  };

  const downloadFileSuccess = () => {
    dispatch(downloadFileSuccessAction());
  };

  const downloadFileError = () => {
    dispatch(downloadFileErrorAction());
  };

  const uploadFileAsync = (payload: IUploadFilePayload, callback?: (...args: any) => any) => {
    const formData = new FormData();

    const { file } = payload;

    const appendIfDefined = (itemName, itemValue) => {
      if (itemValue) formData.append(itemName, itemValue);
    };

    formData.append('file', file);
    appendIfDefined('id', state.fileId);
    appendIfDefined('ownerId', state.ownerId);
    appendIfDefined('ownerType', state.ownerType);
    appendIfDefined('propertyName', state.propertyName);

    const newFile: IStoredFile = {
      uid: '',
      ...file,
      status: 'uploading',
      name: file.name,
      size: file.size,
      type: file.type,
      originFileObj: null,
    };

    if (!(Boolean(state.fileId)) && !(Boolean(state.ownerId) && Boolean(state.propertyName)) && typeof addDelayedUpdate !== 'function') {
      console.error('File component is not configured');
      dispatch(uploadFileErrorAction({ ...newFile, uid: '-1', status: 'error', error: 'File component is not configured' }));
      return;
    }

    dispatch(uploadFileRequestAction(newFile));

    axios
      .put(`${baseUrl}/api/StoredFile`, formData, {
        headers,
      })
      .then((response: any) => {
        const responseFile = response.data.result as IStoredFile;

        responseFile.uid = newFile.uid;

        dispatch(uploadFileSuccessAction({ ...responseFile }));
        if (typeof onChange === 'function')
          onChange(responseFile?.id);
        if (callback) 
          callback(responseFile);
        if (responseFile.temporary &&  typeof addDelayedUpdate === 'function')
          addDelayedUpdate(STORED_FILES_DELAYED_UPDATE, responseFile.id, { propertyName });
      })
      .catch(e => {
        console.error(e);
        dispatch(uploadFileErrorAction({ ...newFile, uid: '-1', status: 'error', error: 'uploading failed' }));
      });
  };

  // @ts-ignore
  const uploadFileSync = (payload: IUploadFilePayload, callback?: (...args: any) => any) => {
    if (typeof onChange === 'function') {
      onChange(payload.file);
      if (typeof callback === 'function') 
        callback();
    }
  };

  const uploadFile = (payload: IUploadFilePayload, callback?: (...args: any) => any) => {
    if (uploadMode === 'async') 
      return uploadFileAsync(payload, callback);
    if (uploadMode === 'sync') 
      return uploadFileSync(payload, callback);
  };

  const { mutate: deleteFileHttp } = useMutate({
    queryParams: {}, // Important if you'll be calling this as a side-effect
    path: '/api/StoredFile',
    verb: 'DELETE',
    requestOptions: {
      headers,
    },
  });

  //#region delete file
  const deleteFileAsync = () => {
    dispatch(deleteFileRequestAction());

    const deleteFileInput: StoredFileDeleteQueryParams = {
      fileId: state.fileId ?? state.fileInfo?.id,
      ownerId,
      ownerType,
      propertyName,
    };
    deleteFileHttp('Delete', { queryParams: deleteFileInput })
      .then(() => {
        deleteFileSuccess();
        if (typeof onChange === 'function') 
          onChange(null);
        if (typeof removeDelayedUpdate === 'function')
          removeDelayedUpdate(STORED_FILES_DELAYED_UPDATE, deleteFileInput.fileId);
      })
      .catch(() => deleteFileError());
  };

  const deleteFileSync = () => {
    if (typeof onChange === 'function') onChange(null);
  };

  const deleteFile = () => {
    if (uploadMode === 'async') deleteFileAsync();

    if (uploadMode === 'sync') deleteFileSync();
  };

  const deleteFileSuccess = () => {
    dispatch(deleteFileSuccessAction());
  };

  const deleteFileError = () => {
    dispatch(deleteFileErrorAction());
  };
  //#endregion

  const fetchFileInfo = () => {
    dispatch(fetchFileInfoRequestAction());
  };

  const fetchFileInfoError = () => {
    dispatch(fetchFileInfoErrorAction());
  };

  /* NEW_ACTION_DECLARATION_GOES_HERE */

  return (
    <StoredFileStateContext.Provider value={state}>
      <StoredFileActionsContext.Provider
        value={{
          ...getFlagSetters(dispatch),
          downloadFile,
          downloadFileSuccess,
          downloadFileError,
          uploadFile,
          deleteFile,
          fetchFileInfo,
          fetchFileInfoError,
          /* NEW_ACTION_GOES_HERE */
        }}
      >
        {children}
      </StoredFileActionsContext.Provider>
    </StoredFileStateContext.Provider>
  );
};

function useStoredFileState() {
  const context = useContext(StoredFileStateContext);

  if (context === undefined) {
    throw new Error('useStoredFileState must be used within a StoredFileProvider');
  }

  return context;
}

function useStoredFileActions() {
  const context = useContext(StoredFileActionsContext);

  if (context === undefined) {
    throw new Error('useStoredFileActions must be used within a StoredFileProvider');
  }

  return context;
}

function useStoredFile() {
  return { ...useStoredFileState(), ...useStoredFileActions() };
}

export { StoredFileProvider, useStoredFileState, useStoredFileActions, useStoredFile };
