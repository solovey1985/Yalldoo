import { Component, OnInit } from "@angular/core";
import { Observable } from "rxjs";
import { EventModel } from "app/_models/events/event.model";
import { Store } from "@ngrx/store";
import { AppState, selectAllEvents, selectCurrentPage, selectPaginationState } from "app/_store/app.states";
import { LoadEventsAction } from "app/_store/actions/events.actions";
import { Router } from "@angular/router";
import { PaginationModel } from "app/_models/pagination/pagination.model";
import { PaginationState } from "app/_store/reducers/pagination.reducers";

@Component({
    templateUrl: "./feed.component.html",
    styleUrls: ["./feed.component.scss"]
})
export class FeedComponent implements OnInit {
    events: EventModel[];
    events$: Observable<EventModel[]>;
    currentPage$: Observable<number>;
    pageSize = 10;
    currentPage = 1;
    constructor(private store: Store<AppState>, private router: Router) {
        this.events$ = this.store.select(selectAllEvents);
        this.currentPage$ = this.store.select(selectCurrentPage);
    }

    ngOnInit(): void {
        this.currentPage$.subscribe((page) => this.currentPage = page );
        this.events$.subscribe((e) => (this.events = e));
        if (this.events.length <= 1) {
            this.store.dispatch(new LoadEventsAction({ pageNumber: this.currentPage, pageSize: this.pageSize }));
        }
    }

    onEventAddClick($event) {
        this.router.navigate(["create"]);
    }

    onPageChange(page: number) {
        if (page && page > 0) {
            this.store.dispatch(new LoadEventsAction({ pageNumber: page, pageSize: this.pageSize }));
        }
    }
}
