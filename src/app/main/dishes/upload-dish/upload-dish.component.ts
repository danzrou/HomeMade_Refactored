import { Component, Input, OnInit, ViewChild } from '@angular/core';
import { IMyDateModel, IMyDpOptions } from 'mydatepicker';
import { BlockUI, NgBlockUI } from "ng-block-ui";
import { DataStorageService } from "../../../services/data-storage.service";
import { FileUploadComponent } from '../../shared/file-upload/file-upload.component';
import { DishService } from '../../shared/services/dish.service';
import { Dish } from '../dish.model';

@Component({
  selector: 'dishes-upload-dish',
  templateUrl: './upload-dish.component.html',
  styleUrls: ['./upload-dish.component.css']
})
export class UploadDishComponent implements OnInit {

  @Input() dish: Dish;

  uploadSuccess: boolean = false;
  uploadFailed: boolean = false;

  @BlockUI() blockUi: NgBlockUI;
  @ViewChild('imgUpload') imgUpload: FileUploadComponent;


  public myDatePickerOptions: IMyDpOptions = {
    // other options...
    dateFormat: 'yyyy/mm/dd',
    editableDateField: false,
    satHighlight: true,
    sunHighlight: false,
    firstDayOfWeek: 'su',
    maxYear: 2018,
    disableSince: {year: new Date().getFullYear(), month: new Date().getMonth()+1, day: new Date().getDate()+1},
    height: '36px'
  };

  public cookDate: any;

  constructor(private dsService: DataStorageService, private dishService: DishService) { }

  ngOnInit() {
    this.dish = {
      name: '',
      description: '',
      ingredients: '',
      kosher: false,
      price: 0,
      cookDate: '',
      seller: this.dsService.getCurrentUser()
    };
  }

  onDateChanged(event: IMyDateModel){
    let date = event.jsdate;
    if(!date) {
      this.dish.cookDate = null;
      return;
    }
    date.setDate(date.getDate()+1);
    this.dish.cookDate = date.toISOString();
  }

  // MOVED TO UNIONED COMPONENT --> now calls onDishLoaded
  /*onSubmit(){
    this.blockUi.start('Loading your foodie...');
    let formData = this.imgUpload.getFormData();
    formData.append('dish', JSON.stringify(this.dish));

    console.debug('formData', formData);

    this.dishService.uploadDish(formData).subscribe(
      dish => {
        console.log(dish);
        this.dish = dish;
        this.dsService.addUserDish(dish);
        this.uploadSuccess = true;
        this.blockUi.stop();
      },
      error=>{
        console.error(error);
        this.blockUi.stop();
        this.uploadFailed = true;
      }
    );
  }*/

  onDishLoaded(dish: Dish){
    this.dish = dish;
    this.dsService.addUserDish(dish);
    this.uploadSuccess = true;
  }

  onLoadFailed(error){
    this.uploadFailed = true;
  }
}
