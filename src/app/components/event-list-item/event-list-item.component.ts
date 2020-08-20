import { Component, OnInit, Input } from '@angular/core';
import { ConditionalExpr } from '@angular/compiler';
import { EventModel } from 'app/_models/events/event.model';

@Component({
    selector: 'app-event-list-item',
    templateUrl: 'event-list-item.component.html',
    styleUrls: ['event-list-item.component.scss']
})

export class EventListItem implements OnInit {
    @Input()
    event: EventModel;
    
    constructor() { }

    ngOnInit() {

    }
}