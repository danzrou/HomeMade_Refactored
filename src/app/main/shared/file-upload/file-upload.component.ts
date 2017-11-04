import { Component, ElementRef, EventEmitter, Input, OnInit, Output, ViewChild } from '@angular/core';
import { Http } from '@angular/http';
import { BlockUIService } from 'ng-block-ui';
import 'rxjs/add/operator/catch';
import { DataStorageService } from '../../../services';
import { Dish } from '../../dishes/dish.model';
import { User } from '../../profile/user.model';
import { AttachmentService } from '../services/attachment.service';

@Component({
  selector: 'main-file-upload',
  templateUrl: './file-upload.component.html',
  styleUrls: ['./file-upload.component.css']
})
export class FileUploadComponent implements OnInit {

  @ViewChild('fileInput') inputEl: ElementRef;

  @Input() type: string;
  @Input() buiName: string = 'main';
  @Input() dish: Dish;
  @Input() user: User;
  @Input() showUpload: boolean = true;
  @Input() imgWidth: number = 150;

  @Output() onUploadFinished = new EventEmitter();

  uploadUrl: string = 'HomeMadeApi/api/upload';
  url: string;
  uploadSuccess = false;
  uploadFailed = false;
  uploadSuccessMsg: string = 'File was uploaded successfully';
  uploadFailedMsg: string = 'Something went wrong during upload. Please try again.';


  @Input() maxSize: number = 1024;
  warningMsg: string;

  constructor(private buiService: BlockUIService,
              private attService: AttachmentService) { }

  ngOnInit() {
  }

  readFileToDisplay(event){
    this.warningMsg = null;
    if (event.target.files && event.target.files[0]) {
      var reader = new FileReader();

      let size = event.target.files[0].size/1024;
      if(size > this.maxSize){
        this.warningMsg = 'File size can be maximum of '+this.maxSize+'KB';
        this.url = null;
        return;
      }

      reader.onload = (event: any) => {
        this.url = event.target.result;
        this.uploadSuccess = false;
      };


      reader.readAsDataURL(event.target.files[0]);
    }
  }

  public getFormData(){
    let inputEl: HTMLInputElement = this.inputEl.nativeElement;
    let fileCount: number = inputEl.files.length;
    let formData = new FormData();

    if (fileCount > 0) { // a file was selected
      for (let i = 0; i < fileCount; i++) {
        console.debug('File size', inputEl.files.item(i).size);
        formData.append('file', inputEl.files.item(i), inputEl.files.item(i).name);
      }
    }

    // console.debug('fileCount', fileCount, 'file', inputEl.files);
    // console.debug('formData', formData);
    return formData;
  }

  upload() {
    this.uploadFailed = false;
    this.uploadSuccess = false;
    this.buiService.start(this.buiName, 'Uploading file...');

    let inputEl: HTMLInputElement = this.inputEl.nativeElement;
    let fileCount: number = inputEl.files.length;
    let formData = new FormData();

    if (fileCount > 0) { // a file was selected
      for (let i = 0; i < fileCount; i++) {
        console.debug('File size', inputEl.files.item(i).size);
        formData.append('file', inputEl.files.item(i), inputEl.files.item(i).name);
      }

      console.debug('fileCount', fileCount, 'file', inputEl.files);
      console.debug('formData', formData);

      let objectId: number;
      if(this.dish)
        objectId = this.dish.id;
      else
        objectId = this.user.id;

      this.attService.uploadFile(formData, this.type, objectId).subscribe(
        resp => {
          console.debug('File upload response', resp);
          this.onUploadFinished.emit(resp);
          this.buiService.stop(this.buiName);
          this.uploadSuccess=true;
          delete this.url;
        },
        error => {
          console.debug('File upload error', error);
          this.uploadFailed = true;
          this.buiService.stop(this.buiName);
        }
      )
    }
  }
}
