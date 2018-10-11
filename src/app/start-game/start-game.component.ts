import { Component, OnInit } from '@angular/core';
import { User } from '../shared/models/user';
import { UserService } from '../shared/services/user.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-start-game',
  templateUrl: './start-game.component.html',
  styleUrls: ['./start-game.component.css']
})
export class StartGameComponent implements OnInit {

  currectPartner: User;

  constructor(userService: UserService, private router: Router) {

    this.currectPartner = userService.currectPartner;
   
  }

  ngOnInit() {
  }

  startGame() {
    this.router.navigate(['/game']);
  }

}
