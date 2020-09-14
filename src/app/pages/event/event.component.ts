import { Component, OnInit, OnDestroy } from "@angular/core";
import { ModalService } from "app/_services/modal/modal.service";
import { NotifyService } from "app/services/notify-service/notify.service";
import { ActivatedRoute, Router } from "@angular/router";
import { Store } from "@ngrx/store";
import { AppState, selectCurrentEvent, selectCurrentEventId } from "app/_store/app.states";
import { Observable, Subscription } from "rxjs";
import { EventModel } from "app/_models/events/event.model";
import { LoadEventAction, ChangeEventIdAction } from "app/_store/actions/events.actions";
import { map, filter, take } from "rxjs/operators";
import { CategoryService } from "app/_services/category/category.service";

@Component({
    templateUrl: "./event.component.html",
    styleUrls: ["./event.component.scss"]
})
export class EventComponent implements OnInit, OnDestroy {
    date = new Date(2020, 8, 24, 12, 20, 0);
    selectedEvent$: Observable<EventModel>;
    event: EventModel;
    selectedEventId$: Observable<number>;
    id: number;
    selectIdSub$: Subscription;
    selectEventSub$: Subscription;
    actionItems = ["Join", "Follow", "Invite"];
    
    constructor(
        private modal: ModalService,
        private notify: NotifyService,
        private store: Store<AppState>,
        private categoryService: CategoryService,
        private router: Router
    ) {
        this.selectedEvent$ = this.store.select(selectCurrentEvent);
        this.selectedEventId$ = this.store.select(selectCurrentEventId);
    }
    ngOnDestroy(): void {
        this.selectEventSub$.unsubscribe();
        this.selectIdSub$.unsubscribe();
    }
    ngOnInit(): void {
        this.selectIdSub$ = this.selectedEventId$
            .pipe(
                filter((eventId) => {
                    return eventId != NaN && eventId > 0;
                })
            )
          .subscribe((eventId) => {
              this.id = eventId;
                this.store.dispatch(new ChangeEventIdAction(this.id));
            });

       this.selectEventSub$ = this.selectedEvent$.pipe(take(2)).subscribe((e) => {
            this.event = e;
            if (!this.event && this.id) {
                this.store.dispatch(new LoadEventAction(this.id));
            }
        });
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

    goBack() {
        this.router.navigate(["feed"]);
    }

    getIcon() {
        return this.categoryService.getCategoryIcon(this.event.category);
    }
}
