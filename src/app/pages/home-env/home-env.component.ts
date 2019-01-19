import { Component, OnInit } from '@angular/core';

import { NavbarService} from '../../providers/navbar/navbar.service';

@Component({
  selector: 'app-home-env',
  templateUrl: './home-env.component.html',
  styleUrls: ['./home-env.component.scss']
})
export class HomeEnvComponent implements OnInit {

  constructor(private nav:NavbarService) { }

  ngOnInit() {
    this.nav.show();
  }

}
