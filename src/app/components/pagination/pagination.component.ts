import { Component, OnInit, Input, Output, EventEmitter } from "@angular/core";
import { PaginationModel } from "app/_models/pagination/pagination.model";
import { EventModel } from "app/_models/events/event.model";
import { Store } from "@ngrx/store";
import { AppState, selectPaginationModel } from "app/_store/app.states";
import { PaginationState } from "app/_store/reducers/pagination.reducers";
import { PageChangedAction } from "app/_store/actions/pagination.actions";
import { Observable } from "rxjs";

@Component({
    selector: "app-pagination",
    templateUrl: "./pagination.component.html",
    styleUrls: ["./pagination.component.scss"]
})
export class PaginationComponent implements OnInit {
    @Output()
    onPageChanged = new EventEmitter<number>();
    pagination$: Observable<PaginationState>;
    currentPage = 1;
    totalPagesArray = new Array<number>(); ;
    data: PaginationState;
    constructor(private store: Store<AppState>) {
        this.totalPagesArray
        this.pagination$ = this.store.select(selectPaginationModel);
    }

    ngOnInit(): void {
        this.pagination$.subscribe((pagination) => {
            this.data = pagination;
            this.currentPage = pagination.pageNumber;
            this.totalPagesArray = new Array<number>();
            for (let i = 1; i <= this.data.totalPages; i++) {
                this.totalPagesArray.push(i);
            }
        });
    }

    onPageChange(page: number) {
        if (page && page <= this.data.totalPages && page > 0) {
            this.currentPage = page;
            this.store.dispatch(new PageChangedAction(this.currentPage));
            this.onPageChanged.emit(this.currentPage);
        }
    }

    goInDirection(val: number) {
        this.currentPage = this.currentPage + val;
        this.store.dispatch(new PageChangedAction(this.currentPage));
        this.onPageChanged.emit(this.currentPage);
    }

    canGoFroward(): boolean {
        return this.currentPage + 1 <= this.data.totalPages;
    }
    canGoBack(): boolean {
        return this.currentPage - 1 > 0;
    }
}
