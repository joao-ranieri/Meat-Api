import { Component, OnInit } from '@angular/core';
import { trigger, state, style, transition, animate } from '@angular/animations';
import { FormBuilder, FormControl, FormGroup } from '@angular/forms';

import {Observable} from 'rxjs/Observable';
import 'rxjs/add/operator/switchMap';
import 'rxjs/add/operator/do';
import 'rxjs/add/operator/debounceTime';
import 'rxjs/add/operator/distinctUntilChanged';
import 'rxjs/add/operator/catch';
import 'rxjs/add/observable/from';


import { Restaurant } from './restaurant/restaurant.model'
import { RestaurantsService } from './restaurants.service'

@Component({
  selector: 'mt-restaurants',
  templateUrl: './restaurants.component.html',
  animations: [
    trigger( 'toggleSearch', [
      state('hidden', style({
        opacity: 0,
        "max-height": '0px'
      })), //state hidden
      state('visible', style({
        opacity: 1,
        "max-height": '70px',
        "margin-top": "20px"
      })), //state visible
      transition('* => *', animate('250ms 0s ease-in-out'))
    ]) //trigger
  ] //animation
})
export class RestaurantsComponent implements OnInit {

  searchBarState: string = 'hidden'

  restaurants: Restaurant[]

  searchForm: FormGroup
  searchControl: FormControl

  constructor( private restaurantsServices: RestaurantsService,
               private formBuilder: FormBuilder) {
  }

  ngOnInit() {

    this.searchControl = this.formBuilder.control('')
    this.searchForm = this.formBuilder.group({
      searchControl: this.searchControl
    })

    this.searchControl.valueChanges
        .debounceTime(500)
        .distinctUntilChanged()
        .switchMap(searchTerm => this.restaurantsServices
                                 .resturants(searchTerm)
                                 .catch(error => Observable.from([])))
        .subscribe(restaurants => this.restaurants = restaurants)

    this.restaurantsServices.resturants().subscribe(restaurants => this.restaurants = restaurants)
  }

  toggleSearch(){
    this.searchBarState = this.searchBarState === 'hidden' ? 'visible' : 'hidden'
  }

}
