import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute, Event, NavigationEnd, Router } from '@angular/router';
import { BlockUIService } from 'ng-block-ui';
import { DataStorageService } from '../services/data-storage.service';
import { User } from './profile/user.model';
import { Subscription } from 'rxjs/Subscription';
import 'rxjs/add/operator/filter';

@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.css']
})
export class MainComponent implements OnInit, OnDestroy {

  blockUiName = 'main';
  currUser: User;
  subscription: Subscription;

  constructor(private buiService: BlockUIService,
              private router: Router,
              private route: ActivatedRoute,
              private dsService: DataStorageService) { }

  ngOnInit() {
    this.currUser = this.dsService.getCurrentUser();
    this.buiService.start(this.blockUiName, 'Cooking your home page...');
    console.debug('router.url', this.router.url);

    if (this.router.url.endsWith('main') || this.router.url.endsWith('main/')) {
      console.log('router.url.endsWith main or main/');
      this.router.navigate(['home'], {relativeTo: this.route});
    }

    this.subscription = this.router.events.subscribe(
      (routeEvent: Event)=> {
        if(routeEvent instanceof NavigationEnd && this.router.url.indexOf('home') < 0 )
          window.scrollTo(0, 0);
        this.buiService.start(this.blockUiName, 'Loading...');
        setTimeout( () => this.buiService.stop(this.blockUiName), 500);
      }
    );
  /*  this.subscription = this.router.events
      .filter(e => e.constructor.name === 'RoutesRecognized')
      .pairwise()
      .subscribe((e: any[]) => {
       console.debug('referrer', e[0].urlAfterRedirects);
      });*/

    setTimeout(() => {
      this.buiService.stop(this.blockUiName);
    }, 1000);
  }

  ngOnDestroy(){
    this.subscription.unsubscribe();
  }


}
