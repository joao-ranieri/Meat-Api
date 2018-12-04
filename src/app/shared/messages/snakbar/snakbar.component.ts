import { Component, OnInit } from '@angular/core';
import { trigger, state, style, transition, animate } from '@angular/animations';

import { Observable } from 'rxjs/Observable';
import 'rxjs/add/observable/timer'
import 'rxjs/add/operator/do'
import 'rxjs/add/operator/switchMap'

import { NotificationService } from '../notification.service';

@Component({
  selector: 'mt-snakbar',
  templateUrl: './snakbar.component.html',
  styleUrls: ['./snakbar.component.css'],
  animations: [
    trigger( 'snak-visibility', [
      state('hidden', style({
        opacity: 0,
        bottom: '0px'
      })), //state hidden
      state('visible', style({
        opacity: 1,
        bottom: '30px'
      })), //state visible
      transition('hidden => visible', animate('500ms 0s ease-in')),
      transition('visible => hidden', animate('500ms 0s ease-out'))
    ]) //trigger
  ] //animation
}) //component
export class SnakBarComponent implements OnInit {

  message: string = 'Hello there!'
  snakVisibility: string = 'hidden'

  constructor( private notificationService: NotificationService ) { }

  ngOnInit() {
    this.notificationService.notifier
    .do(message => {
        this.message = message
        this.snakVisibility = 'visible'
    }).switchMap(message => Observable.timer(3000))
      .subscribe(timer => this.snakVisibility = 'hidden')
  }

}
