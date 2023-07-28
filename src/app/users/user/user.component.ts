import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute, Params } from '@angular/router';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.css']
})
export class UserComponent implements OnInit, OnDestroy {
  user: { id: number, name: string };
  paramsSubscription: Subscription;

  constructor(private route: ActivatedRoute) { }

  ngOnInit(): void {
    const { params } = this.route.snapshot;
    this.user = { id: params["id"], name: params["name"] };
    this.paramsSubscription = this.route.params.subscribe((params: Params) => { 
      this.user.id = params["id"]; 
      this.user.name = params["name"]; 
    }); // This observable allows to react to changes to the route parameters while being on this component.
  }

  ngOnDestroy(): void {
    this.paramsSubscription.unsubscribe(); // This is optional! Angular handles unsubscribing from routing related observables automatically.
  }
}
