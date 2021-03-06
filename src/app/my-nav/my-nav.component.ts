import { Component, OnInit } from '@angular/core';
import { BreakpointObserver, Breakpoints, BreakpointState } from '@angular/cdk/layout';
import { Observable } from 'rxjs';

import { AuthService } from '../providers/auth/auth.service';
import { NavbarService } from '../providers/navbar/navbar.service';
import { async } from '@angular/core/testing';


@Component({
  selector: 'my-nav',
  templateUrl: './my-nav.component.html',
  styleUrls: ['./my-nav.component.scss']
})
export class MyNavComponent implements OnInit {
  isHandset: Observable<BreakpointState> = this.breakpointObserver.observe(Breakpoints.Handset);

  username = ''
  constructor(
    private breakpointObserver: BreakpointObserver,
    public nav:NavbarService,
    public auth:AuthService) {
      //if (this.auth.currentUser().name !=null) {
      //  this.username = this.auth.currentUser().name
      //};
    }
        
    ngOnInit() {
      //this.auth.authenticated()
    }
  }
