import { Component, OnInit, Input } from '@angular/core';
import { ConditionalExpr } from '@angular/compiler';
import { EventModel } from 'app/_models/events/event.model';

@Component({
    selector: 'app-event-list',
    templateUrl: 'event-list.component.html',
    styleUrls: ['event-list.component.scss']
})

export class EventList implements OnInit {

    @Input()
    events: EventModel[];
    
    constructor() { }

    ngOnInit() {

    }
}