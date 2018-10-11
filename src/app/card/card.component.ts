import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { UserService } from '../shared/services/user.service';
import { GameService } from '../shared/services/game.service';
import { Dictinary } from '../shared/interface/dictionary';

@Component({
  selector: 'app-card',
  templateUrl: './card.component.html',
  styleUrls: ['./card.component.css']
})
export class CardComponent implements OnInit {


  //-----------------properties-------------------
  @Input() card: Dictinary;
  @Output() notify: EventEmitter<string> = new EventEmitter<string>();
  cardDisplay: string;

  //-----------------constructor-------------------
  constructor(private userService: UserService, private gameService: GameService) {

  }

  //-----------------functions-------------------
  ngOnInit() {
  
  }

  displayCard() {

    if (this.gameService.currectTurnUser != this.userService.currentUser.Name) {
      alert("now the currentTurn: " + this.gameService.currectTurnUser);
      return;
    }

    //atribute add when click on button
    this.card["click"] = "click";
    this.notify.emit(this.card.key);

  }

}
