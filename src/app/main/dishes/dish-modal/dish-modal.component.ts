import { Component, NgZone, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { DataStorageService } from '../../../services/data-storage.service';
import { GenericModalComponent } from '../../shared/generic-modal/generic-modal.component';
import { AttachmentService } from "../../shared/services/attachment.service";
import { DishService } from '../../shared/services/dish.service';
import { GMapsService } from '../../shared/services/gmaps.service';
import { RecipeService } from '../../shared/services/recipe.service';
import { Dish } from '../dish.model';

@Component({
  selector: 'dishes-dish',
  templateUrl: './dish-modal.component.html',
  styleUrls: ['./dish-modal.component.css', '../../home/feed-card/feed-card.component.css']
})
export class DishComponent implements OnInit {

  dish: Dish;
  dishId: number;
  paypalApproval: any;

  mapCords = {
    lat: 0,
    lng: 0
  };

  @ViewChild('modal') modal: GenericModalComponent;
  modalMsg: string;

  public visible = false;
  public visibleAnimate = false;

  constructor(private dsService: DataStorageService,
              private route: ActivatedRoute,
              private dishService: DishService,
              private router: Router,
              private gmapsService: GMapsService,
              private _zone: NgZone,
              public attService: AttachmentService,
              public recipeService: RecipeService) { }

  ngOnInit() {
    this.show();
    this.route.params.subscribe(
      params => {
        this.dishId = +params['id'];
        console.debug('params id=', this.dishId);
        this.dish = this.dsService.getFeedDishById(this.dishId);
        if(!this.dish){
          this.dishService.getDishById(this.dishId).subscribe(
            dish => {
              this.dish = dish[0];
            }
          );
        }
      }
    );

    this.gmapsService.resolveUserAddress(this.dish.seller).subscribe(
      result => {
        this._zone.run(() => {
            this.mapCords.lat = result.lat();
            this.mapCords.lng = result.lng();
          }
        )
      }
    );
  }


  dishesKeys(){
    if(this.dish)
      return Object.keys(this.dish);
    return null;
  }

  paymentFinished(ppApproval: Event) {
    console.debug('DISH PAYMENT FINISHED', ppApproval);
    this.paypalApproval = ppApproval;
  }

  // TODO -  Aviv: add draggable capability
  public show(): void {
    console.debug('show modal', this.visible);
    this.visible = true;
    setTimeout(() => this.visibleAnimate = true, 100);
  }

  public hide(): void {
    this.visibleAnimate = false;
    setTimeout(() => {
      this.visible = false;
      this.router.navigate(['/main/home']);
    }, 300);

  }

  public onContainerClicked(event: MouseEvent): void {
    if ((<HTMLElement>event.target).classList.contains('modal')) {
      this.hide();
      this.router.navigate(['/main/home']);
    }
  }

  addToRecipeBook(recipe){
    this.recipeService.addToRecipeBook(recipe).subscribe(
      response => {
        this.modalMsg = 'The recipe was added to your recipe book successfully!'
        this.modal.show();
      },
      error => {
        let errorBody;
        try{
          errorBody = error.json();
        } catch(e) {

        }
        this.modalMsg = errorBody.message ? errorBody.message : 'Something went wrong. Please try again.';
        this.modal.show();
        console.error('error adding recipe to recipbook', recipe);
      }
    );
  }
}
