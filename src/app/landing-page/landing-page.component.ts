import { Component, HostListener, OnInit } from '@angular/core';
import { AuthService } from '../auth/auth.service';
import { ActivatedRoute, Router } from '@angular/router';

declare const gapi: any;

@Component({
  selector: 'app-landing-page',
  templateUrl: './landing-page.component.html',
  styleUrls: ['./landing-page.component.css']
})
export class LandingPageComponent implements OnInit {

  shrinkNavBar: boolean = false;

  constructor(private authService: AuthService,
              private router: Router,
              private route: ActivatedRoute) { }

  ngOnInit() {
    this.route.queryParams.subscribe(
      params => {
        console.debug('landing params', params);
        if (params['from'] === '404') {
          console.log('Route params is from 404');
          this.router.navigate(['main']);
        }
      }
    );
    /*if (this.authService.isAuthenticated()) {
      this.router.navigate(['main']);
      /!*this.route.queryParams.subscribe(
        params => {
        console.debug('landing params', params);
        if(params['from'] === '404'){
          console.log('Route params is from 404');
          this.router.navigate(['main']);
        }

      });*!/
    }
    else {

    }*/
  }

  @HostListener('window:scroll')
  onScroll(){
    let yOffset = window.pageYOffset;
    // console.log(yOffset);
    this.shrinkNavBar = yOffset >= 200;
  }
}
