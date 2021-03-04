import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { AccountRequest, LoginResponse, RoleResponse } from '../models/account.model';
import { ProductResponse } from '../models/product.model';

@Injectable({
  providedIn: 'root'
})
export class NetworkService {

  accountAPI = 'account';
  productAPI = 'products';

  constructor(private httpClient: HttpClient) { }

  getRoles(): Observable<RoleResponse[]> {
    let url = `${environment.endpoint}/api/v1/${this.accountAPI}/role`;
    return this.httpClient.get<RoleResponse[]>(url);
  }

  // *** [POST] Sent JSON to server
  login(accountRequest: AccountRequest): Observable<LoginResponse> {
    let url = `${environment.endpoint}/api/v1/${this.accountAPI}/login`
    return this.httpClient.post<LoginResponse>(url, accountRequest);
  }

  // *** [POST] Sent JSON to server
  register(accountRequest: AccountRequest): Observable<unknown> {
    let url = `${environment.endpoint}/api/v1/${this.accountAPI}/register`
    return this.httpClient.post<unknown>(url, accountRequest);
  }

  getProducts(): Observable<ProductResponse[]> {
    let url = `${environment.endpoint}/api/v1/${this.productAPI}`;
    return this.httpClient.get<ProductResponse[]>(url);
  }

  deleteProducts(productId: string): Observable<unknown> {
    let url = `${environment.endpoint}/api/v1/${this.productAPI}/${productId}`;
    return this.httpClient.delete<unknown>(url);
  }
}
