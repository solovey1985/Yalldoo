import { Component, OnInit } from "@angular/core";
import { Observable } from "rxjs";
import { EventModel } from "app/_models/events/event.model";
import { Store } from "@ngrx/store";
import { AppState, selectAllEvents } from "app/_store/app.states";
import { LoadEventsAction } from "app/_store/actions/events.actions";

@Component({
    templateUrl: "./feed.component.html",
    styleUrls: ["./feed.component.scss"]
})
export class FeedComponent implements OnInit {
    events$: Observable<EventModel[]>;
    constructor(private store: Store<AppState>) {
        this.events$ = this.store.select(selectAllEvents);
    }

  ngOnInit(): void {
    this.store.dispatch(new LoadEventsAction());
    }
}
