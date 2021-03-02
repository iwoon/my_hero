import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { RoleResponse } from '../models/account.model';

@Injectable({
  providedIn: 'root'
})
export class NetworkService {

  accountAPI = 'account';
  productAPI = 'products';

  constructor(private httpClient: HttpClient) { }

  getRoles(): Observable<RoleResponse[]>{
    let url = `${environment.endpoint}/api/v1/${this.accountAPI}/role`
    return this.httpClient.get<RoleResponse[]>(url)
  }
}
