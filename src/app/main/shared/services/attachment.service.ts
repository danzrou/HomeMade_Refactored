import { Injectable } from '@angular/core';
import { environment } from '../../../../environments/environment';
import { GenericServerService } from '../../../services/generic.service';
import { LocalStorageService } from '../../../services/local-storage.service';
import { Http } from '@angular/http';
import { HttpClient } from '@angular/common/http';

@Injectable()
export class AttachmentService extends GenericServerService {

  private attBasePath: string = 'attachments';
  private profileBasePath: string = 'profile';
  private dishBasePath: string = 'dish';
  private envUrl;
  uploadUrl: string = 'HomeMadeApi/api/upload';

  constructor(private http: HttpClient) {
    super();
    this.envUrl = environment.apiBaseUrl;
  }

  uploadFile(formData: FormData, type: string, objectId: number){
    let options = JSON.parse(JSON.stringify(this.defOptions));
    options.params = {
      id: objectId,
      type: type
    };

    return this.http.post(environment.apiBaseUrl+this.uploadUrl, formData, options);
  }

  public getProfileImgUrl(userId: number, profileImg: string){
    let profileDir = `${this.envUrl}${profileImg}`;
    return profileDir;
  }

  public getDishImgUrl(dishId: number, imgUrl: string){
    let dishImgUrl = `${this.envUrl}${imgUrl}`;
    return dishImgUrl;
  }
}
