import { Component, OnInit } from "@angular/core";
import { ModalService } from "app/_services/modal/modal.service";
import { NotifyService } from "app/services/notify-service/notify.service";
import { ActivatedRoute } from "@angular/router";
import { Store } from "@ngrx/store";
import { AppState, selectCurrentEvent } from "app/_store/app.states";
import { Observable } from "rxjs";
import { EventModel } from "app/_models/events/event.model";
import { LoadEventAction } from "app/_store/actions/events.actions";
import { map } from "rxjs/operators";
import { CategoryService } from "app/_services/category/category.service";


@Component({
    templateUrl: "./event.component.html",
    styleUrls: ["./event.component.scss"]
})
export class EventComponent implements OnInit {
    date = new Date(2020, 8, 24, 12, 20, 0);
    selectedEvent$: Observable<EventModel>;
    selectedEvent: EventModel;
    id: number;
    constructor(
        private modal: ModalService,
        private notify: NotifyService,
        private store: Store<AppState>,
        private route: ActivatedRoute,
        private categoryService: CategoryService
    ) {

        
        route.params.pipe(map(p => p.id)).subscribe((data) => this.id = data);
        this.selectedEvent$ = this.store.select(selectCurrentEvent);
    }
    actionItems = ["Join", "Follow", "Invite"];
    ngOnInit(): void {
        this.selectedEvent$.subscribe((e: EventModel) => {
            this.selectedEvent = e; if (!this.selectedEvent) {
                this.store.dispatch(new LoadEventAction(this.id));
        } });
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
        return this.categoryService.getCategoryIcon(this.selectedEvent.category)
    }
}
