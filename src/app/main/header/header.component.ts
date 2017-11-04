import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../auth/auth.service';
import { BlockUIService } from 'ng-block-ui';
import { DataStorageService } from '../../services/data-storage.service';
import { Router } from '@angular/router';

@Component({
  selector: 'main-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {

  navItems: [ {name: string, active: boolean, routerLink?: string, goToAnchor?: string, children?: any, dpName?: string}] = [
    { name: 'Orders', active: false, routerLink: '/main/myorders' , dpName: 'orders', children: [
      { name: 'My Orders', active: false, routerLink: '/main/myorders' },
      // { name: 'Search for a dish', active: false, routerLink: './search' },
    ]},
    { name: 'Share Food', active: false, routerLink: '/main/mydishes' , dpName: 'dishes', children: [
      { name: 'My Dish List', active: false, routerLink: '/main/mydishes' },
      { name: 'Share a dish!', active: false, routerLink: '/main/sell' }
    ]},
    { name: 'Recipe-Book', active: false, routerLink: '/main/recipebook' }
  ];

  adminMenu = {
    name: 'Admin', active: false, routerLink: '/main/admin'
  };

  constructor(private authService: AuthService,
              private buiService: BlockUIService,
              private dsService: DataStorageService,
              private router: Router) { }

  ngOnInit() {
/*    if(!this.dsService.isUserSeller()){
      this.navItems.push(this.navBecomeProducer);
    }
    else{
      this.navItems.push(this.navSell);
    }*/

    if(this.dsService.isUserAdmin()){
      this.navItems.push(this.adminMenu);
    }
  }


  logOut(){
    this.buiService.start('appRoot', 'Logging out...');
    this.authService.logOut();
    setTimeout(() => {
      this.buiService.stop('appRoot');
    }, 1000);
  }

  goTo(anchor: string){
    let element = <HTMLElement> document.querySelector('#' + anchor);
    console.log(element);
    if(element) element.scrollIntoView(true);
  }
}
