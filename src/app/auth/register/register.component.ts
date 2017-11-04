import { AfterViewInit, Component, NgZone, OnInit, ViewChild } from '@angular/core';
import {Router} from "@angular/router";
import {DataStorageService} from "../../services/data-storage.service";
import {NgForm} from "@angular/forms";
import {AuthService} from "../auth.service";
import {BlockUI, NgBlockUI} from "ng-block-ui";
import { LoginUser } from '../login/login.component';
import { UserContext } from '../../main/profile/user.model';

declare const gapi: any;

export const cities = [
  "Acre",
  "Afiqim",
  "Ahituv",
  "Allonim",
  "Ashdod",
  "Ashqelon",
  "Azor",
  "Bahan",
  "Baraq",
  "Bareqet",
  "Bat Hadar",
  "Bat Hefer",
  "Bat Yam",
  "Be'er Toviyya",
  "Beersheba",
  "Ben Shemen-Kefar Hano`ar",
  "Bene Ziyyon",
  "Bet Alfa",
  "Bet Dagan",
  "Bet Oren",
  "Bet She'an",
  "Bet Shemesh",
  "Binyamina",
  "Biriyya",
  "Dabburiya",
  "Dimona",
  "Eilat",
  "Elyakhin",
  "Elyaqim",
  "Emunim",
  "Et Taiyiba",
  "Even Yehuda",
  "Gan Hayyim",
  "Gan Yavne",
  "Ganne Tiqwa",
  "Gedera",
  "Gibbeton",
  "Gimzo",
  "Ginnosar",
  "Giv`at Hayyim",
  "HaKarmel",
  "Hadar Ramatayim",
  "Hadar `Am",
  "Hadera",
  "Hadid",
  "Haifa",
  "Haluz",
  "Hazav",
  "Hazor Ashdod",
  "Hazor HaGelilit",
  "Herut",
  "Herzliya",
  "Hever",
  "Hod HaSharon",
  "Holon",
  "Hurfeish",
  "Jaffa",
  "Jerusalem",
  "Kadima",
  "Karkur",
  "Karmi'el",
  "Kefar Daniyyel",
  "Kefar Netter",
  "Kefar Witqin",
  "Kefar Yona",
  "Kfar Saba",
  "Liman",
  "Lod",
  "Ma`agan Mikha'el",
  "Magen",
  "Maghar",
  "Mazkeret Batya",
  "Mazliah",
  "Mazor",
  "Mesillat Ziyyon",
  "Migdal",
  "Mikhmoret",
  "Misgav Regional Council",
  "Mizpe Netofa",
  "Modiin",
  "Moran",
  "Naham",
  "Nahariya",
  "Nazareth",
  "Nazerat `Illit",
  "Nesher",
  "Ness Ziona",
  "Netanya",
  "Netivot",
  "Newe Efrayim",
  "Newe Yamin",
  "Nir Zevi",
  "Nirim",
  "Nordiyya",
  "Ofaqim",
  "Or Yehuda",
  "Or `Aqiva",
  "Pardes Hanna Karkur",
  "Pardesiyya",
  "Pasuta",
  "Petah Tikwah",
  "Qiryat Ata",
  "Qiryat Bialik",
  "Qiryat Gat",
  "Qiryat Hayyim",
  "Qiryat Mal'akhi",
  "Qiryat Motzkin",
  "Qiryat Ono",
  "Qiryat Tiv`on",
  "Qiryat Yam",
  "Ra'anana",
  "Ramat Aviv",
  "Ramat Dawid",
  "Ramat Ef`al",
  "Ramat Gan",
  "Ramat HaSharon",
  "Ramat Poleg",
  "Ramat Yishay",
  "Ramla",
  "Ramot Naftali",
  "Rehovot",
  "Rinnatya",
  "Rishon LeZion",
  "Rishpon",
  "Rosh Ha'Ayin",
  "Safed",
  "Sarid",
  "Savyon",
  "Sde Boker",
  "Sde Warburg",
  "Sderot",
  "Sedot Yam",
  "Shamir",
  "Shave Ziyyon",
  "Shefayim",
  "Shelomi",
  "Shetulim",
  "Shoval",
  "Talme Menashe",
  "Tel Aviv",
  "Tel Mond",
  "Tiberias",
  "Timrat",
  "Tirat Karmel",
  "Tirat Yehuda",
  "Urim",
  "Yaqum",
  "Yavne",
  "Yehud",
  "Zoran",
  "`Alma",
  "`Amir",
  "`Arugot",
  "`Aseret",
  "`En Ayyala",
  "`En HaShelosha",
  "`Evron",
  "Maalot Tarshiha"
];

export interface RegistrationUser {
  id?: number,
  firstName: string,
  lastName: string,
  password?: '',
  email: string,
  address: string,
  city: string,
  houseNum?: number,
  zip?: number
}

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css', '../login/login.component.css']
})
export class RegisterComponent implements OnInit, AfterViewInit {

  @BlockUI() blockUi: NgBlockUI;
  @ViewChild('f') form: NgForm;

  hasRegistered: boolean = false;
  showGoogleBtn: boolean = true;

  userReg: RegistrationUser = {
    firstName: '',
    lastName: '',
    password: '',
    email: '',
    address: '',
    city: ''
  };

  isError: boolean = false;
  errorMsg: string;

  cities = cities;

  constructor(private authService: AuthService,
              private dsService: DataStorageService,
              private router: Router,
              private zone: NgZone) { }

  ngOnInit() {
  }

  ngAfterViewInit(): void {
    this.zone.run(() => gapi.load('auth2', () => {
      let auth = gapi.auth2.init({
        client_id: '90111058406-ca62uli8c9i31qard5o5atk5mf9d07tl.apps.googleusercontent.com'
      });

      if (auth.isSignedIn.get()) {
        console.log(auth.currentUser.get());
      }
      /*else*/ {
        auth.attachClickHandler(document.getElementById('googleBtn'), {},
          (googleUser) => {
            console.log('google User logged successfully');
            console.log(googleUser.getBasicProfile().getEmail());
            this.zone.run(() => this.onGoogleSignIn(googleUser.getBasicProfile()));
          },
          (error) => {
            console.error('ERROR')
          });
      }
    }));
  }

  onGoogleSignIn(googleUser){
    console.log('onSignin');
    this.blockUi.start('Getting Google Details...');

    let profile = googleUser;

    let nameSplit = profile.getName().split(' ');
    let firstName = nameSplit[0];
    let lastName = '';
    for(let i=1; i<nameSplit.length; i++){
      lastName += nameSplit[i];
    }
    let email = profile.getEmail();

    console.log(`firstName=${firstName} lastName=${lastName}, email=${email}`);

    this.userReg.firstName = firstName;
    this.userReg.lastName = lastName;
    this.userReg.email = email;
    this.form.controls['firstName'].disable();
    this.form.controls['lastName'].disable();
    this.form.controls['email'].disable();

    this.showGoogleBtn = false;

    this.blockUi.stop();
  }

  onRegister(form: NgForm){
    this.blockUi.start(`Registering ${this.userReg.firstName}, Please wait...`);
    // this.isError = false;
    this.errorMsg = null;
    this.authService.register(this.userReg)
      .subscribe(
        (registeredUser: RegistrationUser) => {
          console.log(registeredUser);
          setTimeout(() => {
            this.handleRegistration(registeredUser);
          }, 1000);
        },
        error => {
          console.debug('ERROR!', error);
          this.handleError(error);
        }
      );
  }

  handleRegistration(registeredUser: RegistrationUser){
    this.hasRegistered = true;
    this.blockUi.stop();
    console.debug('response', registeredUser);
    let loginUser: LoginUser = {
      userName: registeredUser.email,
      password: ''
    };
    setTimeout(() => {
      this.authService.authenticate(loginUser, true, true)
        .subscribe(
          (userContext: UserContext) => {
            this.authService.storeAuthInfo(userContext.user);
            this.dsService.storeUserContext(userContext);
            this.router.navigate(['/main/home']);
          }
        );
    },1500);
  }

  handleError(error) {
    let errorBody = error.json();
    this.isError = true;
    // this.authService.hasLogged = false;
    this.errorMsg = errorBody.message ? errorBody.message : 'Something went wrong. Please try again.';
    this.blockUi.stop();
  }

  private onGoogleFail(param: any) {
    console.debug('google fail', param);
  }
}
