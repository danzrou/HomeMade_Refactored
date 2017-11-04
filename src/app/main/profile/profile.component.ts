import { AfterViewInit, Component, NgZone, OnInit } from '@angular/core';
import { DataStorageService } from '../../services/data-storage.service';
import { AttachmentService } from '../shared/services/attachment.service';
import {ActivatedRoute} from "@angular/router";
import { UsersService } from '../../services/users.service';
import { User } from './user.model';
import { GMapsService } from '../shared/services/gmaps.service';
import { MapsAPILoader } from "@agm/core";
import { LazyMapsAPILoader } from '@agm/core';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css'],
  providers: [
    {provide: MapsAPILoader, useClass: LazyMapsAPILoader}
  ]
})
export class ProfileComponent implements OnInit {

  constructor(private dsService: DataStorageService,
              public attService: AttachmentService,
              private route: ActivatedRoute,
              private userService: UsersService,
              private gmapsService: GMapsService,
              private _zone: NgZone) { }

  user: User = null;

  lat: number;
  lng: number;

  ngOnInit() {
    // this.user = this.dsService.getCurrentUser();
    this.route.params.subscribe(
      params => {
        if(params['id']){
          let userId = +params['id'];
          this.userService.getUserbyId(userId).subscribe(
            user => {
              this.user = user;
              this.resolveAddress();
            },
            error => {
              this.user = null;
            }
          );
        }
      }
    );

    console.log('removeme');
  }

  resolveAddress(){
    this.gmapsService.resolveUserAddress(this.user).subscribe(
      result => {
        this.lat = result.lat();
        this.lng = result.lng();
      }
    )
  }

  /*resolveAddress() {
    let userFullAddress = `${this.user.address} ${this.user.houseNum}, ${this.user.city} Israel`;
    console.debug('user add', userFullAddress);
    this.gmapsService.getLatLan(userFullAddress)
      .subscribe(
        result => {
          // needs to run inside zone to update the map
          this._zone.run(() => {
            console.debug('Geocode result=', result);
            this.lat = result.lat();
            this.lng = result.lng();
          });
        },
        error => console.log(error),
        () => console.log('Geocoding completed!')
      );
  }*/
}
