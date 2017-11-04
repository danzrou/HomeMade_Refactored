import { AfterViewInit, Component, Input, OnInit, ViewChild } from '@angular/core';
import { Dish } from '../../dishes/dish.model';
import { AttachmentService } from '../../shared/services/attachment.service';
import { RecipeService } from '../../shared/services/recipe.service';
import { GenericModalComponent } from '../../shared/generic-modal/generic-modal.component';

@Component({
  selector: 'main-feed-card',
  templateUrl: './feed-card.component.html',
  styleUrls: ['./feed-card.component.css']
})
export class FeedCardComponent implements OnInit, AfterViewInit {

  @Input() dish: Dish;
  isCollapsed: boolean = true;
  maxDescLength: number = 250;
  dishDesc: string = '';
  hideToggle: boolean = false;

  @ViewChild('modal') modal: GenericModalComponent;
  modalMsg: string;

  constructor(public attService: AttachmentService,
              public recipeService: RecipeService) { }

  ngOnInit() {
    // console.debug('feedDishes item', this.dish-modal);
  }

  ngAfterViewInit(){
    this.determineView();
  }

  toggleView() {
    this.isCollapsed = !this.isCollapsed;
    this.determineView();
  }

  determineView() {
    if (this.dish.description.length <= this.maxDescLength) {
      this.dishDesc = this.dish.description;
      this.isCollapsed = false;
      this.hideToggle = true;
      return;
    }
    this.hideToggle = false;
    if (this.isCollapsed) {
      this.dishDesc = this.dish.description.substring(0, this.maxDescLength) + "...";
    } else if(this.isCollapsed == false)  {
      this.dishDesc = this.dish.description;
    }
  }

  ngOnChanges() {
    this.determineView();
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
