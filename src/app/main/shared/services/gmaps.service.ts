import { Injectable, NgZone } from '@angular/core';
import { MapsAPILoader, LazyMapsAPILoader } from '@agm/core';
import { Observable } from 'rxjs/Observable';
import { User } from '../../profile/user.model';

declare var google: any;

@Injectable()
export class GMapsService {

  constructor(private __zone: NgZone, private __loader: MapsAPILoader) {
  }

  resolveUserAddress(user: User){
    let userFullAddress = `${user.address} ${user.houseNum}, ${user.city}`;
    console.debug('user add', userFullAddress);
    return this.getLatLan(userFullAddress);
  }

  getLatLan(address: string) {
    console.log('Getting Address - ', address);

    return Observable.create(observer => {
      try {
        //at this point the variable google may be still undefined (google maps scripts still loading)
        //so load all the scripts, then...
        this.__loader.load().then(() => {
          let geocoder = new google.maps.Geocoder();
          geocoder.geocode({ address }, (results, status) => {

            if (status === google.maps.GeocoderStatus.OK) {
              const place = results[0].geometry.location;
              observer.next(place);
              observer.complete();
            } else {
              console.error('Error - ', results, ' & Status - ', status);
              if (status === google.maps.GeocoderStatus.ZERO_RESULTS) {
                observer.error('Address not found!');
              }else {
                observer.error(status);
              }

              observer.complete();
            }
          });
        });
      } catch (error) {
        observer.error('error getGeocoding' + error);
        observer.complete();
      }

    });
 /*   let geocoder = new google.maps.Geocoder();
    return Observable.create(observer => {
      geocoder.geocode( { 'address': address}, function(results, status) {
        if (status == google.maps.GeocoderStatus.OK) {
          observer.next(results[0].geometry.location);
          observer.complete();
        } else {
          console.log('Error - ', results, ' & Status - ', status);
          observer.next({});
          observer.complete();
        }
      });
    })*/
  }

}
