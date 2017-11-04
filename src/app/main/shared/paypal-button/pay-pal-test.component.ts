import { AfterViewInit, Component, EventEmitter, Input, Output } from '@angular/core';
import { PaypalService } from '../services/paypal-service.service';

declare var paypal: any;

@Component({
  selector: 'main-paypal',
  templateUrl: './pay-pal-test.component.html',
  styleUrls: ['./pay-pal-test.component.css']
})
export class PayPalButtonComponent implements AfterViewInit {

  @Input() data: any;

  @Output() onPayPalProcess = new EventEmitter();
  @Output() onPayPalExecute = new EventEmitter();
  @Output() onExecuteError = new EventEmitter();

  constructor(private ppService: PaypalService) {
  }

  public ngAfterViewInit() {

    /*    let s = this._renderer2.createElement('script');
        s.type = `text/javascript`;
        s.src = `https://www.paypalobjects.com/api/checkout.js`;

        this._renderer2.appendChild(document.body, s);*/

    paypal.Button.render({

      env: 'sandbox', // sandbox / production

      commit: true, // Show a 'Pay Now' button

      /*client: {
        sandbox: 'ARlrFf_Zw0EIKFxfikYzsP68eV2ZmhK5IW8itGRl_8KepbQYk2mw2LcmK4HbKErZcZDre-zoJZIvI9S3',
        production: 'AbJm0wf3G8jz5JHVpkznVo4ZMiAVHmPmRM11M8VKPTXOGj0gawLd75Sp-AhrOp2i2zsUb2D-YqYWUkO5'
      },*/

      payment:  (data, actions) => {
         return this.ppService.getPayPalPaymentId(this.data).then(
            ppPayment => {
              console.debug('ppPayment', ppPayment);
              return ppPayment.id;
            }
          )
        },

      onAuthorize: (data,actions) => {
        this.onPayPalProcess.emit();
        console.log(data);
        console.log(actions);
        // this.router.navigate(['/home']);
        this.ppService.executePayPalPayment(data.paymentID, data.payerID).subscribe(
          response => {
            console.debug('execution log', response);
            this.onPayPalExecute.emit(response);
          },
          error => {
            console.error('Error in payment execution', error);
            this.onExecuteError.emit(error);
          }
        );
      },


    }, '#paypal-button');
  }

}
