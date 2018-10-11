import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { GameService } from '../shared/services/game.service';
import { User } from '../shared/models/user';
import { UserService } from '../shared/services/user.service';
import { Dictinary } from '../shared/interface/dictionary';
import { MatchCards } from '../shared/interface/matchCard';

@Component({
  selector: 'app-board',
  templateUrl: './board.component.html',
  styleUrls: ['./board.component.css']
})
export class BoardComponent implements OnInit {

  @Input() CardGameRandomDictionary: Dictinary[];
  @Output() checkMatch: EventEmitter<MatchCards> = new EventEmitter<MatchCards>();

  //-----------------properties-------------------
  firstCard: string = "";
  secondCard: string = "";
  currentUser: User;
 
//-----------------constructor-------------------
  constructor(public gameService: GameService, public userService: UserService) {
    this.currentUser = userService.currentUser;
  }


  //-----------------functions-------------------
  ngOnInit() {

  }


  onClick(card: string): void {

    console.log(this.CardGameRandomDictionary);
    if (this.firstCard == "")
      this.firstCard = card;
    else {
      setTimeout(() => {
      this.secondCard = card;
      let listTwoCards: string[] = [this.firstCard, this.secondCard];
      this.firstCard = "";
      this.secondCard = "";

      let matchCard:MatchCards={cards:listTwoCards,user:this.currentUser};
      this.checkMatch.emit(matchCard);

        }, 3000);    
    }
  }

}

