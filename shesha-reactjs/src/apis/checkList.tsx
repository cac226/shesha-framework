/* Generated by restful-react */

import React from 'react';
import { Get, GetProps, useGet, UseGetProps, Mutate, MutateProps, useMutate, UseMutateProps } from 'restful-react';

import * as RestfulShesha from '../utils/fetchers';
export const SPEC_VERSION = 'v1';
/**
 * Check list item selection made by the user
 */
export interface CheckListItemSelectionDto {
  /**
   * Check list item id
   */
  checkListItemId?: string;
  /**
   * User selection (yes = 1, no = 2, na = 3), see Shesha.Domain.Enums.RefListCheckListSelectionType
   */
  selection?: number | null;
  /**
   * User comments
   */
  comments?: string | null;
  name?: string | null;
}

export interface ValidationErrorInfo {
  message?: string | null;
  members?: string[] | null;
}

export interface ErrorInfo {
  code?: number;
  message?: string | null;
  details?: string | null;
  validationErrors?: ValidationErrorInfo[] | null;
}

export interface CheckListItemSelectionDtoListAjaxResponse {
  targetUrl?: string | null;
  success?: boolean;
  error?: ErrorInfo;
  unAuthorizedRequest?: boolean;
  __abp?: boolean;
  result?: CheckListItemSelectionDto[] | null;
}

export interface AjaxResponseBase {
  targetUrl?: string | null;
  success?: boolean;
  error?: ErrorInfo;
  unAuthorizedRequest?: boolean;
  __abp?: boolean;
}

/**
 * Save check list selection input
 */
export interface SaveSelectionInput {
  /**
   * Owner entity Id
   */
  id: string;
  /**
   * Owner entity type short alias
   */
  ownerType: string;
  /**
   * Check list id
   */
  ownerId: string;
  /**
   * User selection
   */
  selection: CheckListItemSelectionDto[];
}

/**
 * Check list item model
 */
export interface CheckListItemModel {
  id?: string;
  /**
   * Item type (group = 1, two state = 2, tri state = 3), see Shesha.Domain.Enums.RefListCheckListItemType
   */
  itemType?: number;
  /**
   * Item name
   */
  name?: string | null;
  /**
   * Item description
   */
  description?: string | null;
  /**
   * If true, the user is able to add comments to this item/group
   */
  allowAddComments?: boolean;
  /**
   * Heading of the comments box
   */
  commentsHeading?: string | null;
  /**
   * Custom visibility of comments (javascript expression)
   */
  commentsVisibilityExpression?: string | null;
  /**
   * Child items
   */
  childItems?: CheckListItemModel[] | null;
}

/**
 * Checklist model
 */
export interface CheckListModel {
  id?: string;
  /**
   * Name of the check list
   */
  name?: string | null;
  /**
   * Description
   */
  description?: string | null;
  /**
   * Items of the check list
   */
  items?: CheckListItemModel[] | null;
}

export interface CheckListModelAjaxResponse {
  targetUrl?: string | null;
  success?: boolean;
  error?: ErrorInfo;
  unAuthorizedRequest?: boolean;
  __abp?: boolean;
  result?: CheckListModel;
}

/**
 * CheckList DTO
 */
export interface CheckListDto {
  id?: string;
  /**
   * Name of the check list
   */
  name?: string | null;
  /**
   * Description
   */
  description?: string | null;
}

export interface CheckListDtoAjaxResponse {
  targetUrl?: string | null;
  success?: boolean;
  error?: ErrorInfo;
  unAuthorizedRequest?: boolean;
  __abp?: boolean;
  result?: CheckListDto;
}

export interface CheckListDtoPagedResultDto {
  items?: CheckListDto[] | null;
  totalCount?: number;
}

export interface CheckListDtoPagedResultDtoAjaxResponse {
  targetUrl?: string | null;
  success?: boolean;
  error?: ErrorInfo;
  unAuthorizedRequest?: boolean;
  __abp?: boolean;
  result?: CheckListDtoPagedResultDto;
}

export interface CheckListGetSelectionQueryParams {
  /**
   * Owner entity type short alias
   */
  ownerType: string;
  /**
   * Owner entity Id
   */
  ownerId: string;
}

export interface CheckListGetSelectionPathParams {
  /**
   * Check list Id
   */
  id: string;
}

export type CheckListGetSelectionProps = Omit<
  GetProps<
    CheckListItemSelectionDtoListAjaxResponse,
    AjaxResponseBase,
    CheckListGetSelectionQueryParams,
    CheckListGetSelectionPathParams
  >,
  'path'
> &
  CheckListGetSelectionPathParams;

/**
 * Get user selection
 */
export const CheckListGetSelection = ({ id, ...props }: CheckListGetSelectionProps) => (
  <Get<
    CheckListItemSelectionDtoListAjaxResponse,
    AjaxResponseBase,
    CheckListGetSelectionQueryParams,
    CheckListGetSelectionPathParams
  >
    path={`/checkList/${id}/selection`}
    {...props}
  />
);

export type UseCheckListGetSelectionProps = Omit<
  UseGetProps<
    CheckListItemSelectionDtoListAjaxResponse,
    AjaxResponseBase,
    CheckListGetSelectionQueryParams,
    CheckListGetSelectionPathParams
  >,
  'path'
> &
  CheckListGetSelectionPathParams;

/**
 * Get user selection
 */
export const useCheckListGetSelection = ({ id, ...props }: UseCheckListGetSelectionProps) =>
  useGet<
    CheckListItemSelectionDtoListAjaxResponse,
    AjaxResponseBase,
    CheckListGetSelectionQueryParams,
    CheckListGetSelectionPathParams
  >((paramsInPath: CheckListGetSelectionPathParams) => `/checkList/${paramsInPath.id}/selection`, {
    pathParams: { id },
    ...props,
  });

export type checkListGetSelectionProps = Omit<
  RestfulShesha.GetProps<
    CheckListItemSelectionDtoListAjaxResponse,
    AjaxResponseBase,
    CheckListGetSelectionQueryParams,
    CheckListGetSelectionPathParams
  > & {
    /**
     * Check list Id
     */
    id: string;
  },
  'queryParams'
>;
/**
 * Get user selection
 */
export const checkListGetSelection = (
  queryParams: CheckListGetSelectionQueryParams,
  { id, ...props }: checkListGetSelectionProps
) =>
  RestfulShesha.get<
    CheckListItemSelectionDtoListAjaxResponse,
    AjaxResponseBase,
    CheckListGetSelectionQueryParams,
    CheckListGetSelectionPathParams
  >(`/checkList/${id}/selection`, queryParams, props);

export interface CheckListSaveSelectionPathParams {
  id: string;
}

export type CheckListSaveSelectionProps = Omit<
  MutateProps<void, unknown, void, SaveSelectionInput, CheckListSaveSelectionPathParams>,
  'path' | 'verb'
> &
  CheckListSaveSelectionPathParams;

/**
 * Save user selection
 */
export const CheckListSaveSelection = ({ id, ...props }: CheckListSaveSelectionProps) => (
  <Mutate<void, unknown, void, SaveSelectionInput, CheckListSaveSelectionPathParams>
    verb="POST"
    path={`/checkList/${id}/selection`}
    {...props}
  />
);

export type UseCheckListSaveSelectionProps = Omit<
  UseMutateProps<void, unknown, void, SaveSelectionInput, CheckListSaveSelectionPathParams>,
  'path' | 'verb'
> &
  CheckListSaveSelectionPathParams;

/**
 * Save user selection
 */
export const useCheckListSaveSelection = ({ id, ...props }: UseCheckListSaveSelectionProps) =>
  useMutate<void, unknown, void, SaveSelectionInput, CheckListSaveSelectionPathParams>(
    'POST',
    (paramsInPath: CheckListSaveSelectionPathParams) => `/checkList/${paramsInPath.id}/selection`,
    { pathParams: { id }, ...props }
  );

export type checkListSaveSelectionProps = Omit<
  RestfulShesha.MutateProps<void, unknown, void, SaveSelectionInput, CheckListSaveSelectionPathParams> & { id: string },
  'data'
>;
/**
 * Save user selection
 */
export const checkListSaveSelection = (data: SaveSelectionInput, { id, ...props }: checkListSaveSelectionProps) =>
  RestfulShesha.mutate<void, unknown, void, SaveSelectionInput, CheckListSaveSelectionPathParams>(
    'POST',
    `/checkList/${id}/selection`,
    data,
    props
  );

export interface CheckListGetCheckListTreePathParams {
  id: string;
}

export type CheckListGetCheckListTreeProps = Omit<
  GetProps<CheckListModelAjaxResponse, AjaxResponseBase, void, CheckListGetCheckListTreePathParams>,
  'path'
> &
  CheckListGetCheckListTreePathParams;

/**
 * Get check list tree
 */
export const CheckListGetCheckListTree = ({ id, ...props }: CheckListGetCheckListTreeProps) => (
  <Get<CheckListModelAjaxResponse, AjaxResponseBase, void, CheckListGetCheckListTreePathParams>
    path={`/checkList/${id}/tree`}
    {...props}
  />
);

export type UseCheckListGetCheckListTreeProps = Omit<
  UseGetProps<CheckListModelAjaxResponse, AjaxResponseBase, void, CheckListGetCheckListTreePathParams>,
  'path'
> &
  CheckListGetCheckListTreePathParams;

/**
 * Get check list tree
 */
export const useCheckListGetCheckListTree = ({ id, ...props }: UseCheckListGetCheckListTreeProps) =>
  useGet<CheckListModelAjaxResponse, AjaxResponseBase, void, CheckListGetCheckListTreePathParams>(
    (paramsInPath: CheckListGetCheckListTreePathParams) => `/checkList/${paramsInPath.id}/tree`,
    { pathParams: { id }, ...props }
  );

export type checkListGetCheckListTreeProps = Omit<
  RestfulShesha.GetProps<CheckListModelAjaxResponse, AjaxResponseBase, void, CheckListGetCheckListTreePathParams> & {
    id: string;
  },
  'queryParams'
>;
/**
 * Get check list tree
 */
export const checkListGetCheckListTree = ({ id, ...props }: checkListGetCheckListTreeProps) =>
  RestfulShesha.get<CheckListModelAjaxResponse, AjaxResponseBase, void, CheckListGetCheckListTreePathParams>(
    `/checkList/${id}/tree`,
    undefined,
    props
  );

export interface CheckListGetQueryParams {
  id?: string;
}

export type CheckListGetProps = Omit<
  GetProps<CheckListDtoAjaxResponse, AjaxResponseBase, CheckListGetQueryParams, void>,
  'path'
>;

export const CheckListGet = (props: CheckListGetProps) => (
  <Get<CheckListDtoAjaxResponse, AjaxResponseBase, CheckListGetQueryParams, void>
    path={`/api/services/app/CheckList/Get`}
    {...props}
  />
);

export type UseCheckListGetProps = Omit<
  UseGetProps<CheckListDtoAjaxResponse, AjaxResponseBase, CheckListGetQueryParams, void>,
  'path'
>;

export const useCheckListGet = (props: UseCheckListGetProps) =>
  useGet<CheckListDtoAjaxResponse, AjaxResponseBase, CheckListGetQueryParams, void>(
    `/api/services/app/CheckList/Get`,
    props
  );

export type checkListGetProps = Omit<
  RestfulShesha.GetProps<CheckListDtoAjaxResponse, AjaxResponseBase, CheckListGetQueryParams, void>,
  'queryParams'
>;
export const checkListGet = (queryParams: CheckListGetQueryParams, props: checkListGetProps) =>
  RestfulShesha.get<CheckListDtoAjaxResponse, AjaxResponseBase, CheckListGetQueryParams, void>(
    `/api/services/app/CheckList/Get`,
    queryParams,
    props
  );

export interface CheckListGetAllQueryParams {
  sorting?: string | null;
  skipCount?: number;
  maxResultCount?: number;
}

export type CheckListGetAllProps = Omit<
  GetProps<CheckListDtoPagedResultDtoAjaxResponse, AjaxResponseBase, CheckListGetAllQueryParams, void>,
  'path'
>;

export const CheckListGetAll = (props: CheckListGetAllProps) => (
  <Get<CheckListDtoPagedResultDtoAjaxResponse, AjaxResponseBase, CheckListGetAllQueryParams, void>
    path={`/api/services/app/CheckList/GetAll`}
    {...props}
  />
);

export type UseCheckListGetAllProps = Omit<
  UseGetProps<CheckListDtoPagedResultDtoAjaxResponse, AjaxResponseBase, CheckListGetAllQueryParams, void>,
  'path'
>;

export const useCheckListGetAll = (props: UseCheckListGetAllProps) =>
  useGet<CheckListDtoPagedResultDtoAjaxResponse, AjaxResponseBase, CheckListGetAllQueryParams, void>(
    `/api/services/app/CheckList/GetAll`,
    props
  );

export type checkListGetAllProps = Omit<
  RestfulShesha.GetProps<CheckListDtoPagedResultDtoAjaxResponse, AjaxResponseBase, CheckListGetAllQueryParams, void>,
  'queryParams'
>;
export const checkListGetAll = (queryParams: CheckListGetAllQueryParams, props: checkListGetAllProps) =>
  RestfulShesha.get<CheckListDtoPagedResultDtoAjaxResponse, AjaxResponseBase, CheckListGetAllQueryParams, void>(
    `/api/services/app/CheckList/GetAll`,
    queryParams,
    props
  );

export type CheckListCreateProps = Omit<
  MutateProps<CheckListDtoAjaxResponse, AjaxResponseBase, void, CheckListDto, void>,
  'path' | 'verb'
>;

export const CheckListCreate = (props: CheckListCreateProps) => (
  <Mutate<CheckListDtoAjaxResponse, AjaxResponseBase, void, CheckListDto, void>
    verb="POST"
    path={`/api/services/app/CheckList/Create`}
    {...props}
  />
);

export type UseCheckListCreateProps = Omit<
  UseMutateProps<CheckListDtoAjaxResponse, AjaxResponseBase, void, CheckListDto, void>,
  'path' | 'verb'
>;

export const useCheckListCreate = (props: UseCheckListCreateProps) =>
  useMutate<CheckListDtoAjaxResponse, AjaxResponseBase, void, CheckListDto, void>(
    'POST',
    `/api/services/app/CheckList/Create`,
    props
  );

export type checkListCreateProps = Omit<
  RestfulShesha.MutateProps<CheckListDtoAjaxResponse, AjaxResponseBase, void, CheckListDto, void>,
  'data'
>;
export const checkListCreate = (data: CheckListDto, props: checkListCreateProps) =>
  RestfulShesha.mutate<CheckListDtoAjaxResponse, AjaxResponseBase, void, CheckListDto, void>(
    'POST',
    `/api/services/app/CheckList/Create`,
    data,
    props
  );

export type CheckListUpdateProps = Omit<
  MutateProps<CheckListDtoAjaxResponse, AjaxResponseBase, void, CheckListDto, void>,
  'path' | 'verb'
>;

export const CheckListUpdate = (props: CheckListUpdateProps) => (
  <Mutate<CheckListDtoAjaxResponse, AjaxResponseBase, void, CheckListDto, void>
    verb="PUT"
    path={`/api/services/app/CheckList/Update`}
    {...props}
  />
);

export type UseCheckListUpdateProps = Omit<
  UseMutateProps<CheckListDtoAjaxResponse, AjaxResponseBase, void, CheckListDto, void>,
  'path' | 'verb'
>;

export const useCheckListUpdate = (props: UseCheckListUpdateProps) =>
  useMutate<CheckListDtoAjaxResponse, AjaxResponseBase, void, CheckListDto, void>(
    'PUT',
    `/api/services/app/CheckList/Update`,
    props
  );

export type checkListUpdateProps = Omit<
  RestfulShesha.MutateProps<CheckListDtoAjaxResponse, AjaxResponseBase, void, CheckListDto, void>,
  'data'
>;
export const checkListUpdate = (data: CheckListDto, props: checkListUpdateProps) =>
  RestfulShesha.mutate<CheckListDtoAjaxResponse, AjaxResponseBase, void, CheckListDto, void>(
    'PUT',
    `/api/services/app/CheckList/Update`,
    data,
    props
  );

export interface CheckListDeleteQueryParams {
  id?: string;
}

export type CheckListDeleteProps = Omit<
  MutateProps<void, unknown, CheckListDeleteQueryParams, void, void>,
  'path' | 'verb'
>;

export const CheckListDelete = (props: CheckListDeleteProps) => (
  <Mutate<void, unknown, CheckListDeleteQueryParams, void, void>
    verb="DELETE"
    path={`/api/services/app/CheckList/Delete`}
    {...props}
  />
);

export type UseCheckListDeleteProps = Omit<
  UseMutateProps<void, unknown, CheckListDeleteQueryParams, void, void>,
  'path' | 'verb'
>;

export const useCheckListDelete = (props: UseCheckListDeleteProps) =>
  useMutate<void, unknown, CheckListDeleteQueryParams, void, void>('DELETE', `/api/services/app/CheckList/Delete`, {
    ...props,
  });

export type checkListDeleteProps = Omit<
  RestfulShesha.MutateProps<void, unknown, CheckListDeleteQueryParams, void, void>,
  'data'
>;
export const checkListDelete = (props: checkListDeleteProps) =>
  RestfulShesha.mutate<void, unknown, CheckListDeleteQueryParams, void, void>(
    'DELETE',
    `/api/services/app/CheckList/Delete`,
    undefined,
    props
  );
