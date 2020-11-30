import { Component, OnInit, Input } from "@angular/core";
import { ConditionalExpr } from "@angular/compiler";
import { EventModel } from "app/_models/events/event.model";

@Component({
    selector: "app-event-list-item-other",
    templateUrl: "event-list-item-other.component.html",
    styleUrls: ["event-list-item-other.component.scss"]
})

export class EventListItemOther implements OnInit {
    @Input()
    event = {
            id: 1,
        image: '',
        title: 'Super event',
        description: 'This is the best event in the world ever',
        location: {
            address: 'Shevchenko street 13'
        },
        startDate: new Date()
    };

    constructor() { }

    ngOnInit() {

    }
}
