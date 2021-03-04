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
    return this.httpClient.get<RoleResponse[]>(`/${this.accountAPI}/role`);
  }

  // *** [POST] Sent JSON to server
  login(accountRequest: AccountRequest): Observable<LoginResponse> {
    return this.httpClient.post<LoginResponse>(`/${this.accountAPI}/login`, accountRequest);
  }

  // *** [POST] Sent JSON to server
  register(accountRequest: AccountRequest): Observable<unknown> {
    return this.httpClient.post<unknown>(`/${this.accountAPI}/register`, accountRequest);
  }

  getProducts(): Observable<ProductResponse[]> {
    return this.httpClient.get<ProductResponse[]>(`/${this.productAPI}`);
  }

  deleteProducts(productId: string): Observable<unknown> {
    return this.httpClient.delete<unknown>(`/${this.productAPI}/${productId}`);
  }
}
