import { Component, OnInit } from '@angular/core';
import { User } from '../shared/models/user';
import { UserService } from '../shared/services/user.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-choose-partner',
  templateUrl: './choose-partner.component.html',
  styleUrls: ['./choose-partner.component.css']
})
export class ChoosePartnerComponent implements OnInit {

    //-----------------properties-------------------
  currectUser: User;
  listChoosePartners: User[] = [];
  interval: any;

  //-----------------constructor-------------------
  constructor(public userService: UserService, public router: Router) {
    this.currectUser = this.userService.currentUser;
    this.getListPartner();
    this.interval = setInterval(() => {
      this.getListPartner();
    }, 1000)
  }


    //-----------------functions-------------------
  getListPartner() {

    this.userService.getListPartners().subscribe(users => {
      this.listChoosePartners = users;
      var indexOfUser = users.findIndex(i => i.Name == this.currectUser.Name);

      //someone choose him
      if (indexOfUser == -1) {
        this.userService.getUserDetails(this.currectUser.Name).subscribe(data => {
          this.currectUser = data; 
          this.userService.getUserDetails(this.currectUser.PartnerUserName).subscribe(user => {
            this.userService.currectPartner = user;
            this.router.navigate(['/startGame']);
          })
        });
        
      }

      this.listChoosePartners.splice(indexOfUser, 1);
    }, () => { alert("can not get the partners") });
  }

  choosePartner(user: User) {
    this.userService.choosePartner(user).subscribe(
      data => {
      this.userService.currectPartner = user;
      this.router.navigate(['/startGame']);
    },
     () => {
      alert("error of choose the partner");
    });

  }

  ngOnInit() {

  }
  
  ngOnDestroy() {
    // Will clear when component is destroyed e.g. route is navigated away from.
    clearInterval(this.interval);
  }


}
