import { Component, Input, OnInit } from '@angular/core';
import { AttachmentService } from '../../shared/services/attachment.service';

@Component({
  selector: 'main-user-profile',
  templateUrl: './user-profile.component.html',
  styleUrls: ['./user-profile.component.css']
})
export class UserProfileComponent implements OnInit {

  @Input() user: any;
  constructor(public attService: AttachmentService) { }

  ngOnInit() {

  }
}
