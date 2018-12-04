import { Component, OnInit, Input, EventEmitter, Output } from '@angular/core';
import{ trigger, state, style, transition, animate } from '@angular/animations'

import { MenuItem } from './menu-item.model';

@Component({
  selector: 'mt-menu-item',
  templateUrl: './menu-item.component.html',
  animations: [
    trigger('menuItemAppeared',[
      state('ready', style({opacity: 1})),
      transition('void => ready', [
        style({opacity: 0, transform: 'translate(-20px)'}),
        animate('500ms 0s ease-in')
      ]) //transition
    ]) //trigger
  ] //animations
}) //component
export class MenuItemComponent implements OnInit {

  @Input() menuItem: MenuItem
  @Output() add = new EventEmitter()

  menuItemStade: string = 'ready'

  constructor() { }

  ngOnInit() {
  }

  emitAddEvent(){
    this.add.emit(this.menuItem)
  }

}
