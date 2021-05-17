import { ResponseMessages } from './../enums/response-messages';
import { environment } from './../../environments/environment';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { LocalstorageElement } from '../enums/localstorage-elements';
import { BehaviorSubject } from 'rxjs';
import { ApiariesModel } from '../model/apiaries';
import { ApiaryModel } from '../model/apiary';

export interface ServerError {
  error: string;
}
@Injectable({
  providedIn: 'root'
})
export class UserDataService {

  public apiary = new BehaviorSubject<ApiaryModel>({} as ApiaryModel);
  public apiaries = new BehaviorSubject<ApiariesModel[]>([]);
  public isDatabaseError = new BehaviorSubject<boolean>(false);
  public isLoading = new BehaviorSubject<boolean>(false);

  constructor(private httpClient: HttpClient) {}

  public async addSite(data: { apiaryId: string, siteName: string }): Promise<void> {
    const url = `${environment.serverBaseUrl}/api/add-site`;
    this.isLoading.next(true);
    try {
      const result = await this.httpClient.post<ApiaryModel | ServerError>(
        url,
        data,
        { headers: this.getHeaders() }
      ).toPromise();
      this.handleApiaryResponse(result);
      this.isLoading.next(false);
    } catch (e) {
      // TODO error handling
      this.isLoading.next(false);
    }
  }

  public async createApiary(data: { name: string}): Promise<void> {
    const url = `${environment.serverBaseUrl}/api/create-apiary`;
    this.isLoading.next(true);
    try {
      const result = await this.httpClient.post<ApiariesModel[] | ServerError>(
        url,
        data,
        { headers: this.getHeaders() }
      ).toPromise();
      this.handleApiariesResponse(result);
      this.isLoading.next(false);
    } catch (e) {
      // TODO error handling
      this.isLoading.next(false);
    }
  }

  public async createHive(data: { apiaryId: string, siteId: string}): Promise<void> {
    const url = `${environment.serverBaseUrl}/api/create-hive`;
    this.isLoading.next(true);
    try {
      const result = await this.httpClient.post<ApiariesModel[] | ServerError>(
        url,
        data,
        { headers: this.getHeaders() }
      ).toPromise();
      this.handleApiariesResponse(result);
      this.isLoading.next(false);
    } catch (e) {
      // TODO error handling
      this.isLoading.next(false);
    }
  }

  public async getApiariesData(): Promise<void> {
    const url = `${environment.serverBaseUrl}/api/apiary-data`;
    this.isLoading.next(true);
    try {
      const result = await this.httpClient.get<ApiariesModel[] | ServerError>(
        url,
        { headers: this.getHeaders() }
      ).toPromise();
      this.handleApiariesResponse(result);
      this.isLoading.next(false);
    } catch (e) {
      // TODO error handling
      this.isLoading.next(false);
    }
  }

  public async getApiaryData(apiaryId: string): Promise<void> {
    const url = `${environment.serverBaseUrl}/api/apiary-data/${apiaryId}`;
    this.isLoading.next(true);
    try {
      const result = await this.httpClient.get<ApiaryModel | ServerError>(url, { headers: this.getHeaders() }).toPromise();
      this.isLoading.next(false);
      this.handleApiaryResponse(result);
    } catch (e) {
      // TODO error handling
      this.isLoading.next(false);
    }
  }

  private getHeaders(): HttpHeaders {
    const token = localStorage.getItem(LocalstorageElement.HIVE_USER_TOKEN);
    return new HttpHeaders({
      'Content-Type': 'application/json',
      'authorization': `Bearer ${token}`
    });
  }

  private isError(elem: any): elem is ServerError {
    return (<ServerError>elem).error !== undefined;
  }

  private handleApiaryResponse(response: ApiaryModel | ServerError): void {
    if (this.isError(response)) {
      this.isDatabaseError.next(true);
    } else {
      this.apiary.next(response);
    }
  }

  private handleApiariesResponse(response: ApiariesModel[] | ServerError): void {
    if (this.isError(response)) {
      this.isDatabaseError.next(true);
    } else {
      this.apiaries.next(response);
    }
  }
}
