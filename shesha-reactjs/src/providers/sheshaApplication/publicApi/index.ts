import { CurrentUserApi, IInternalCurrentUserApi } from './currentUser/api';
import { ISettingsApi, SettingsApi } from './settings/api';
import { HttpClientApi } from './http/api';

export interface IApplicationContext {
    user: IInternalCurrentUserApi;
    settings: ISettingsApi;
}

export class ApplicationContext implements IApplicationContext {
    public user: IInternalCurrentUserApi;
    public settings: ISettingsApi;
    readonly _httpClient: HttpClientApi;

    constructor(httpClient: HttpClientApi) {
        this._httpClient = httpClient;
        this.user = new CurrentUserApi(this._httpClient);
        this.settings = new SettingsApi(this._httpClient);
    }
}