import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import {Parse} from 'parse';

import { NavbarService } from '../../providers/navbar/navbar.service';
import { AuthService } from '../../providers/auth/auth.service';



@Component({
  selector: 'app-sign-in',
  templateUrl: './sign-in.component.html',
  styleUrls: ['./sign-in.component.scss']
})
export class SignInComponent implements OnInit {
  password: string = '';
  username: string = '';

  constructor(
    private authPvdr: AuthService,
    private route: ActivatedRoute,
    private router: Router,
    private nav:NavbarService) { }

  ngOnInit() {
    this.nav.hide();
  }
  async doSignin(){
    //this.authPvdr.signin(this.username, this.password)
    //  .subscribe(
    //    success => {
    await Parse.User.logIn(this.username, this.password);
    this.router.navigate(['/home']);
    // },
    //    error => {
            //this.alertService.error(error);
            //this.loading = false;
    //    });
  }

}
