import { Component, OnInit } from '@angular/core';
import { Dish } from '../../dishes/dish.model';
import { DishService } from '../../shared/services/dish.service';

@Component({
  selector: 'main-dish-search',
  templateUrl: './dish-search.component.html',
  styleUrls: ['./dish-search.component.css', '../../dishes/user-dishes/user-dishes.component.css']
})
export class DishSearchComponent implements OnInit {

  dishes: Array<Dish>;

  search: {
    nameLike?: string,
    ingrdLike?: string,
    kosher?: boolean
  } = {
    nameLike: '',
    ingrdLike: ''
  };

  constructor(private dishService: DishService) { }

  ngOnInit() {
  }

  onSubmit(){
    this.dishService.pushSearchParams(this.search);
  }

}
