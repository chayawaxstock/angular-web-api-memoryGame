import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import { User } from '../models/user';
import { Router } from '@angular/router';
import { Subject } from 'rxjs/Subject';
import { MatchCards } from '../interface/matchCard';


@Injectable()
export class GameService {

  

    baseUrl = "http://localhost:59956/api/game";
    currentUser: User;
    listPartners: any;
    mySubject: Subject<any> = new Subject();
    currectTurnUser: string;

    constructor(private httpClient: HttpClient) { }

    getListCardsAndCurrectTurn(user: User): Observable<any> {
        return this.httpClient.get(this.baseUrl + "/" + user.Name);
    }

    checkConfirmAndChangeTurn(matchCards:MatchCards): Observable<any> {
        
        return this.httpClient.put(this.baseUrl + "/" + matchCards.user.Name, matchCards.cards);
    }
   

}