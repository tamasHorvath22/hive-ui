import { ResponseMessages } from './../enums/response-messages';
import { environment } from './../../environments/environment';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { LocalstorageElement } from '../enums/localstorage-elements';
import { BehaviorSubject } from 'rxjs';
import { ApiariesModel } from '../model/apiaries';
import { ApiaryModel } from '../model/apiary';

@Injectable({
  providedIn: 'root'
})
export class UserDataService {

  public apiary = new BehaviorSubject<ApiaryModel>({} as ApiaryModel);
  public apiaries = new BehaviorSubject<ApiariesModel[]>([]);
  public isDatabaseError = new BehaviorSubject<boolean>(false);

  constructor(private httpClient: HttpClient) {}

  public async addSite(data: { apiaryId: string, siteName: string }): Promise<void> {
    const url = `${environment.serverBaseUrl}/api/add-site`;
    const result = await this.httpClient.post<ApiariesModel[] | ResponseMessages.DATABASE_ERROR>(
      url,
      data,
      { headers: this.getHeaders() }
    ).toPromise();
    this.handleApiaryResponse(result);
  }

  public async createApiary(data: { name: string}): Promise<void> {
    const url = `${environment.serverBaseUrl}/api/create-apiary`;
    const result = await this.httpClient.post<ApiariesModel[] | ResponseMessages.DATABASE_ERROR>(
      url,
      data,
      { headers: this.getHeaders() }
    ).toPromise();
    this.handleApiariesResponse(result);
  }

  public async getApiariesData(): Promise<void> {
    const url = `${environment.serverBaseUrl}/api/apiary-data`;
    const result = await this.httpClient.get(
      url,
      { headers: this.getHeaders() }
    ).toPromise();
    this.handleApiariesResponse(result);
  }

  public async getApiaryData(apiaryId: string): Promise<void> {
    const url = `${environment.serverBaseUrl}/api/apiary-data/${apiaryId}`;
    const result = await this.httpClient.get(
      url,
      { headers: this.getHeaders() }
    ).toPromise();
    this.handleApiaryResponse(result);
  }

  private getHeaders(): HttpHeaders {
    const token = localStorage.getItem(LocalstorageElement.HIVE_USER_TOKEN);
    return new HttpHeaders({
      'Content-Type': 'application/json',
      'authorization': `Bearer ${token}`
    });
  }

  private handleApiaryResponse(response: any): void {
    if (response.error) {
      this.isDatabaseError.next(true);
    } else {
      this.apiary.next(response);
    }
  }

  private handleApiariesResponse(response: any): void {
    if (response.error) {
      this.isDatabaseError.next(true);
    } else {
      this.apiaries.next(response);
    }
  }
}
