import { Component, OnInit } from "@angular/core";
import { FormGroup, FormBuilder, Validators, ValidatorFn, AbstractControl } from "@angular/forms";
import { ComponentStore } from "@ngrx/component-store";
import { Store } from "@ngrx/store";
import { EventModel } from "app/_models/events/event.model";
import { ModalService } from "app/_services/modal/modal.service";
import { AppState, selectAllCategories, selectCurrentEvent, selectCurrentEventId } from "app/_store/app.states";
import { EventEditStore } from "app/_store/component-stores/event-edit.store";
import { Observable } from "rxjs";

@Component({
    selector: "app-event-edit",
    templateUrl: "./event-edit.component.html",
    styleUrls: ["./event-edit.component.scss"],
    providers: [EventEditStore]
})
export class EventEditComponent implements OnInit {
    eventId$: Observable<number>;
    eventId: number;
    event: EventModel;
    public form: FormGroup;
    event$ = this.eventEditStore.event$;
    constructor(
        private builder: FormBuilder,
        private modal: ModalService,
        private readonly eventEditStore: EventEditStore
    ) {
        this.event$ = this.eventEditStore.select((state) => state.event);
    }

    ngOnInit(): void {
        this.event$
            .filter((e) => e !== null) 
            .subscribe((e) => {
                this.event = e;
                this.initForm();
            });
    }

    initForm() {
        this.form = this.builder.group({
            title: [this.event.title],
            description: [this.event.description],
            category: [this.event.category]
        }, {updateOn: "change"});
    }
}
