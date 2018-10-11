import { Component, OnInit } from '@angular/core';
import {  FormGroup, FormControl, ValidatorFn } from '@angular/forms';
import { User } from '../shared/models/user';
import { UserService } from '../shared/services/user.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {

    //-----------------properties-------------------
  formGroup: FormGroup;
  obj: typeof Object = Object;

  //-----------------constructor-------------------
  constructor(private userService:UserService,private router:Router)
  {
    let formGroupConfig = {
      Name: new FormControl("", this.createValidatorText("userName", 2, 10)),
      Age: new FormControl("", this.createValidatorNumber("age", 18, 120)),
    };
    this.formGroup = new FormGroup(formGroupConfig);
  }


  //-----------------functions-------------------
  ngOnInit(): void {
   
  }

  submitRegister() {
      let user: User = this.formGroup.value;
      this.userService.registerUser(user).subscribe(data=>{
        this.userService.currentUser=user;
        this.router.navigate(['/choosePartner']);
      },err=>{
        alert("invalid")
      }); 
  }

  createValidatorText(cntName: string, min: number, max: number): Array<ValidatorFn>  {
    return [
      f => !f.value ? { "val": `${cntName} is required` } : null,
      f => f.value && f.value.length > max ? { "val": `${cntName} is max ${max} chars` } : null,
      f => f.value && f.value.length < min ? { "val": `${cntName} is min ${min} chars` } : null
    ];
  }
  
  createValidatorNumber(cntName: string, min: number, max: number): Array<ValidatorFn>  {
    return [
      f => !f.value ? { "val": `${cntName} is required` } : null,
      f => f.value && Number( f.value) > max ? { "val": `${cntName} is max ${max} ` } : null,
      f => f.value && Number( f.value)< min ? { "val": `${cntName} is min ${min} ` } : null
    ];
  }
}
