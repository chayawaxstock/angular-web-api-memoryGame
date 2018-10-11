import { Component, OnInit } from '@angular/core';
import { UserService } from '../shared/services/user.service';
import { GameService } from '../shared/services/game.service';
import { User } from '../shared/models/user';
import { Dictinary } from '../shared/interface/dictionary';
import { MatchCards } from '../shared/interface/matchCard';
import { Router } from '@angular/router';


@Component({
  selector: 'app-game',
  templateUrl: './game.component.html',
  styleUrls: ['./game.component.css']
})
export class GameComponent implements OnInit {

    //-----------------properties-------------------
  currentUser: User;
  currentPartner: User;
  currentNamePlayerNow: string;
  CardGameDictionary: Dictinary[];
  CardGameRandomDictionary: Dictinary[] = [];
  index = 0;
  interval: any = null;
  scoreCurrentUser: number = 0;
  scorePartnerUser: number = 0;


  //-----------------constructor-------------------
  constructor(private userService: UserService, private gameService: GameService, private router: Router) {

  }


  //-----------------functions-------------------
  ngOnInit() {

    this.currentUser = this.userService.currentUser;
    this.currentPartner = this.userService.currectPartner;
    this.currectTurnUser();
    if (this.gameService.currectTurnUser != this.userService.currentUser.Name)
      this.interval2();
  }

  currectTurnUser() {

    this.gameService.getListCardsAndCurrectTurn(this.currentUser).subscribe(
      data => {
        this.CardGameDictionary = Object.keys(data["CardList"]).map(key => ({ key: key, value: data["CardList"][key] }));
        this.CardGameDictionary = [...this.CardGameDictionary].concat([...this.CardGameDictionary]);
        for (let index in this.CardGameRandomDictionary) {

          let card = this.CardGameDictionary.find(key => key.key == this.CardGameRandomDictionary[index].key);
          this.CardGameRandomDictionary[index] = { key: card.key, value: card.value };
        }

        if (this.index == 0) {
          this.randomCards();
        }

        this.index++;
        this.gameService.currectTurnUser = data["CurrentTurn"];
        this.currentNamePlayerNow = this.gameService.currectTurnUser;
        this.win();

      }

    )
  }

  randomCards(): any {

    let CardGameHelpDictionary:Dictinary[] = [...this.CardGameDictionary];
    for (let key in this.CardGameDictionary) {
      let index = Math.floor(Math.random() * Math.floor(CardGameHelpDictionary.length));
      let card: Dictinary = { key:CardGameHelpDictionary[index].key, value: CardGameHelpDictionary[index].value }
      this.CardGameRandomDictionary.push(card);
      CardGameHelpDictionary.splice(index, 1);
    }

  }

  checkMatch(matchCards: MatchCards) {

    this.gameService.checkConfirmAndChangeTurn(matchCards).subscribe(
      data => {
        this.CardGameDictionary = Object.keys(data["CardList"]).map(key => ({ key: key, value: data["CardList"][key] }));

        for (let index in this.CardGameRandomDictionary) {
          let card = this.CardGameDictionary.find(key => key.key == this.CardGameRandomDictionary[index].key);
          this.CardGameRandomDictionary[index] = { key: card.key, value: card.value };
        }

        this.scoreCurrentUser = this.CardGameDictionary.filter(card => card.value == this.userService.currentUser.Name).length;
        this.scorePartnerUser = this.CardGameDictionary.filter(card => card.value == this.userService.currectPartner.Name).length;

        if (matchCards.cards[0] == matchCards.cards[1])
             this.win();
        
        this.gameService.currectTurnUser = data["CurrentTurn"];
        this.currentNamePlayerNow = this.gameService.currectTurnUser;

      }
    );

    this.interval2();
  }


  interval2() {

    this.interval = setInterval(() => {
      this.currectTurnUser();
      if (this.gameService.currectTurnUser == this.currentUser.Name)
        this.clearIntervalCard();
    }, 1000);

  }


  clearIntervalCard(): any {
//div 2 - the CardGameDictionary contain each of card 2 times
    this.scoreCurrentUser = this.CardGameDictionary.filter(card => card.value == this.userService.currentUser.Name).length/2;
    this.scorePartnerUser = this.CardGameDictionary.filter(card => card.value == this.userService.currectPartner.Name).length/2;
    clearInterval(this.interval);

  }

  win() {
    var empty = this.CardGameDictionary.filter(card => card.value == null);
    if (empty.length > 0)
      return;
    this.router.navigate(['/endGame']);
  }

  ngOnDestroy() {
    // Will clear when component is destroyed e.g. route is navigated away from.
    clearInterval(this.interval);

  }

}



