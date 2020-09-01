import { Component, OnInit, Input, Output, EventEmitter } from "@angular/core";
import { PaginationModel } from "app/_models/pagination/pagination.model";
import { EventModel } from "app/_models/events/event.model";

@Component({
    selector: "app-pagination",
    templateUrl: "./pagination.component.html",
    styleUrls: ["./pagination.component.scss"]
})
export class PaginationComponent implements OnInit {
    @Input()
    data: PaginationModel<EventModel>;
    @Output()
    onPageChanged = new EventEmitter<number>();
    currentPage = 1;
    totalPages: number[];
    constructor() {
        this.totalPages = new Array<number>();
    }

    ngOnInit(): void {
        for (let i = 1; i <= this.data.totalPages; i++) this.totalPages.push(i);
    }

    onPageChange(page: number) {
        console.log("Clicking on ", page);
        if (page && page <= this.data.totalPages && page > 0) {
            this.currentPage = page;
            this.onPageChanged.emit(page);
        }
    }

    goInDirection(val: number) {
        this.currentPage = this.currentPage + val;
    }

    canGoFroward(): boolean {
        return this.currentPage + 1 <= this.data.totalPages;
    }
    canGoBack(): boolean {
        return this.currentPage - 1 > 0;
    }
}
