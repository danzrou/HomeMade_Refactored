import { Component, EventEmitter, Input, OnInit, Output, ViewChild } from '@angular/core';
import { Dish } from '../dish.model';
import { IMyDateModel, IMyDpOptions } from 'mydatepicker';
import { FileUploadComponent } from '../../shared/file-upload/file-upload.component';
import { DishService } from '../../shared/services/dish.service';
import { BlockUI, NgBlockUI } from 'ng-block-ui';
import { AttachmentService } from '../../shared/services/attachment.service';
import { GenericModalComponent } from '../../shared/generic-modal/generic-modal.component';

@Component({
  selector: 'dishes-dish-details',
  templateUrl: './dish-edit-form.component.html',
  styleUrls: ['./dish-edit-form.component.css']
})
export class DishEditFormComponent implements OnInit {

  @Input() dish: Dish;
  @ViewChild('imgUpload') imgUpload: FileUploadComponent;
  @ViewChild('modal') modal: GenericModalComponent;

  @Output() dishUpdated = new EventEmitter();

  uploadSuccess: boolean = false;
  uploadFailed: boolean = false;

  @BlockUI() blockUi: NgBlockUI;
  cookDate: any;

  // For component union
  @Input() submitButtonText: string;
  @Input() isEditMode: boolean = false;
  @Input() submitButtonWidth: number;
  @Output() onUpdateSuccess = new EventEmitter();
  @Output() onUpdateFailed = new EventEmitter();


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

  constructor(private dishService: DishService, public attService: AttachmentService) { }

  ngOnInit() {
    this.cookDate = this.dish.cookDate;
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

  onSubmit(){
    this.uploadSuccess = this.uploadFailed = false;

    this.blockUi.start('Loading your foodie...');
    let formData = this.imgUpload.getFormData();

    if(this.dish.cookDate.indexOf('/') >= 0){
      let date = new Date(this.dish.cookDate);
      this.dish.cookDate = date.toISOString();
    }

    formData.append('dish', JSON.stringify(this.dish));

    console.debug('formData', formData);

    if(this.isEditMode) {
      this.dishService.updateDish(formData).subscribe(
        dish => {
          console.log(dish);
          this.uploadSuccess = true;
          this.blockUi.stop();
          // this.dishUpdated.emit(dish);
          this.onUpdateSuccess.emit(dish);
        },
        error=>{
          console.error(error);
          this.blockUi.stop();
          this.uploadFailed = true;
          this.onUpdateFailed.emit(error);
        }
      );
    }
    else{
      this.dishService.uploadDish(formData).subscribe(
        dish => {
          console.log(dish);
          this.dish = dish;
          // this.dishUpdated.emit(dish);
          // this.dsService.addUserDish(dish);
          this.onUpdateSuccess.emit(dish);
          this.uploadSuccess = true;
          this.blockUi.stop();
        },
        error=>{
          console.error(error);
          this.blockUi.stop();
          this.uploadFailed = true;
          this.onUpdateFailed.emit(error);
        }
      );
    }
  }

  updateDish(dish: Dish, status: number, modal){
    modal.hide();
    this.dishService.updateDishStatus(dish, status).subscribe(
      response => {
        console.debug('update dish status OK');
        this.dish.status = status;
        this.dishUpdated.emit(dish);
      },
      error => {
        console.debug('error removing dish');
      }
    )
  }
}
