import { Component, OnInit } from "@angular/core";
import { ModalService } from "app/_services/modal/modal.service";
import { NotifyService } from "app/services/notify-service/notify.service";
import { ActivatedRoute } from "@angular/router";
import { Store } from "@ngrx/store";
import { AppState, selectCurrentEvent } from "app/_store/app.states";
import { Observable } from "rxjs";
import { EventModel } from "app/_models/events/event.model";
import { LoadEventAction, ChangeEventIdAction } from "app/_store/actions/events.actions";
import { map } from "rxjs/operators";
import { CategoryService } from "app/_services/category/category.service";

@Component({
    templateUrl: "./event.component.html",
    styleUrls: ["./event.component.scss"]
})
export class EventComponent implements OnInit {
    date = new Date(2020, 8, 24, 12, 20, 0);
    selectedEvent$: Observable<EventModel>;
    event: EventModel;
    
    constructor(
        private modal: ModalService,
        private notify: NotifyService,
        private store: Store<AppState>,
        private categoryService: CategoryService
    ) {
        
        this.selectedEvent$ = this.store.select(selectCurrentEvent);
    }
    actionItems = ["Join", "Follow", "Invite"];
    ngOnInit(): void {
        this.selectedEvent$.subscribe(e => this.event = e);
    }

    onActionSelect(item: string) {
        switch (item.toLocaleLowerCase()) {
            case "invite": {
                this.modal.openFriendsPicker().subscribe((x) => {
                    this.notify.success("Friends was invited");
                });
                break;
            }
            case "join": {
                this.notify.success("Yoy have joined");
                break;
            }
            case "follow": {
                this.notify.success("You are following now");
                break;
            }
            default:
                break;
        }
    }

    getIcon() {
        return this.categoryService.getCategoryIcon(this.event.category);
    }
}
