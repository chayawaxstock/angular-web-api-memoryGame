import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import { User } from '../models/user';
import { Router } from '@angular/router';
import { Subject } from 'rxjs/Subject';


@Injectable()
export class UserService {

 

    baseUrl="http://localhost:59956/api/user";
    currentUser:User;
    listPartners: any;
    currectPartner:User;


    constructor(private httpClient: HttpClient) { }

    registerUser(user: User): Observable<any> {
       return this.httpClient.post(this.baseUrl,user);
    }

    getUserDetails(userName:string): Observable<any> {
        return this.httpClient.get(this.baseUrl+"/"+userName);
    }

    getListPartners():Observable<any> {
      return this.httpClient.get(this.baseUrl);
    }

    choosePartner(user: User): Observable<any> {
       return this.httpClient.put(this.baseUrl+"/"+this.currentUser.Name,user);
    }


}