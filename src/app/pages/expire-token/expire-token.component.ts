import { Component, NgModule, OnInit } from '@angular/core';
import { LoginViewModel } from 'src/app/shared/models/user';
import { AccountService } from 'src/app/shared/services/account.service';
import { constants } from 'src/environments/constants';
import {MatSnackBar} from '@angular/material/snack-bar';
import { Router, RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { AuthService } from 'src/app/shared/services';

@Component({
  selector: 'app-expire-token',
  templateUrl: './expire-token.component.html',
  styleUrls: ['./expire-token.component.scss']
})
export class ExpireTokenComponent implements OnInit {

  _bar: boolean = false;
  _message: string = "Token expiro, cree uno!";
  

  constructor(private auth : AuthService, private _snackBar: MatSnackBar, private router : Router) {}

  ngOnInit(): void {
  }
  CreateToken(){
    this._bar = !this._bar;
    let default_creeds : LoginViewModel = { 
      username : constants.root_user,
      password : constants.root_pass
    };
    this.auth.LogIn(default_creeds).subscribe(user => {
      if (user != null){
        console.log('Logged in');
        this._bar = false;
      }
    },error => {
      console.error('token expired', error);
      this._snackBar.open(constants.error_create_token, constants.acept );
      this._bar = false;
    })
  }

}

import {MatProgressBarModule} from '@angular/material/progress-bar';
@NgModule({
  imports: [
    CommonModule,
    RouterModule,
    MatProgressBarModule
  ],
  declarations: [ ExpireTokenComponent ],
  exports: [ ExpireTokenComponent ]
})
export class ExpireTokenModule { }
