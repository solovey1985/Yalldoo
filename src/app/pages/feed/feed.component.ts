import { Component, OnInit } from "@angular/core";
import { Observable } from "rxjs";
import { EventModel } from "app/_models/events/event.model";
import { Store } from "@ngrx/store";
import { AppState, selectAllEvents, selectPagination } from "app/_store/app.states";
import { LoadEventsAction } from "app/_store/actions/events.actions";
import { Router } from "@angular/router";
import { PaginationModel } from "app/_models/pagination/pagination.model";

@Component({
    templateUrl: "./feed.component.html",
    styleUrls: ["./feed.component.scss"]
})
export class FeedComponent implements OnInit {
  events$: Observable<EventModel[]>;
  pagination$: Observable<PaginationModel<EventModel>>;
  pagination: PaginationModel<EventModel>;
    constructor(private store: Store<AppState>, private router: Router) {
      this.events$ = this.store.select(selectAllEvents);
      this.pagination$ = this.store.select(selectPagination);
    }

  ngOnInit(): void {
    this.pagination$.subscribe(pg => {
      this.pagination = pg;
    });
    this.store.dispatch(new LoadEventsAction());
  }
    
    onEventAddClick($event) {
        this.router.navigate(['create']);
    }
}
