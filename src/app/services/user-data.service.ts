import { environment } from './../../environments/environment';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { LocalstorageElement } from '../enums/localstorage-elements';
import { BehaviorSubject } from 'rxjs';
import { ApiariesModel } from '../model/apiaries';

@Injectable({
  providedIn: 'root'
})
export class UserDataService {

  public apiaries = new BehaviorSubject<ApiariesModel[]>([]);

  constructor(private httpClient: HttpClient) {}

  public async createApiary(data: { name: string}): Promise<void> {
    const url = `${environment.serverBaseUrl}/api/create-apiary`;
    const result = await this.httpClient.post<ApiariesModel[]>(url, data, { headers: this.getHeaders() }).toPromise();
    this.apiaries.next(result);
  }

  public async getApiaryData(): Promise<void> {
    const url = `${environment.serverBaseUrl}/api/apiary-data`;
    const result = await this.httpClient.get<ApiariesModel[]>(url, { headers: this.getHeaders() }).toPromise();
    this.apiaries.next(result);
  }

  private getHeaders(): HttpHeaders {
    const token = localStorage.getItem(LocalstorageElement.HIVE_USER_TOKEN);
    return new HttpHeaders({
      'Content-Type': 'application/json',
      'authorization': `Bearer ${token}`
    });
  }
}
