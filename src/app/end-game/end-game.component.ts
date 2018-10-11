import { Component, OnInit } from '@angular/core';
import { UserService } from '../shared/services/user.service';
import { User } from '../shared/models/user';
import swal from 'sweetalert2';

@Component({
  selector: 'app-end-game',
  templateUrl: './end-game.component.html',
  styleUrls: ['./end-game.component.css']
})
export class EndGameComponent implements OnInit {

  //-----------------properties-------------------
  scoreCurrentUser: number = 0;
  scorePartnerUser: number = 0;
  partnerName: string = "";
  winUserName: string = "";

  //-----------------constructor-------------------
  constructor(private userService: UserService) { }


  //-----------------functions-------------------
  ngOnInit() {
    this.userService.getUserDetails(this.userService.currentUser.Name).subscribe((data: User) => {
      this.scoreCurrentUser = data.Score;
      this.userService.getUserDetails(this.userService.currectPartner.Name).subscribe((data: User) => {
        this.scorePartnerUser = data.Score;

        this.partnerName = this.userService.currectPartner.Name;
        if (this.scoreCurrentUser > this.scorePartnerUser)
          this.winUserName = this.userService.currentUser.Name;
        else this.winUserName = this.partnerName;

      })
    })



  }

}
