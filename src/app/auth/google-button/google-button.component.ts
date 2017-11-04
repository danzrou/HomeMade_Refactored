import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'google-button',
  template: `
    <div role="button" id="googleBtn" class="customGPlusSignIn">
      <img src="assets/google/g-logo.png" align="center" style="max-width:25px;">
      <span>
        &nbsp;Sign in with Google&nbsp;
      </span>
    </div>
  `,
  styles: [`
    #googleBtn {
      display: inline-block;
      background: white;
      color: #000;
      border-radius: 5px;
      /*border: thin solid #888;*/
      box-shadow: 1px 1px 6px 2px #ccc;
      /*white-space: nowrap;*/
      padding: 8px 6px 6px 6px;
      font-size: 0.9rem;
      font-family: Roboto, Helvetica, sans-serif;
      text-transform: uppercase;
      
    }

    #googleBtn:hover {
      cursor: pointer;
      opacity: 0.8;
      background-color: #fec503;
    }
  `]
})
export class GoogleButtonComponent implements OnInit {

  constructor() { }

  ngOnInit() {
  }

}
