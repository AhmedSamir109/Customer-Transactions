import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class DataService {
  private Url ='http://localhost:3000';

  constructor(private _HttpClient:HttpClient) { }

  getCustomrs():Observable<any>{
   return this._HttpClient.get(`${this.Url}/customers`)
  };

  getTransations():Observable<any>{
    return this._HttpClient.get(`${this.Url}/transactions`)
  };
}
