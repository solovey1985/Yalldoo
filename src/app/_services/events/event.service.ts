import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { CreateEventModel } from "app/_models/events/create-event.model";
import { EventModel } from "app/_models/events/event.model";
import { Config } from "../../_configs/config";
import { Observable } from "rxjs";

@Injectable({
    providedIn: "root"
})
export class EventService {
    constructor(private http: HttpClient) {}

    public fetchEvents(filter?: any): Observable<EventModel[]> {
       
            const filterString = JSON.stringify(filter);
            const url = `${Config.apiUrl}/event`;
            return this.http.get<EventModel[]>(url);
    }

    public fetchEvent(eventId: number): Observable<EventModel> {
        const url = `${Config.apiUrl}/event/${eventId}`;
        return this.http.get<EventModel>(url);
    }

    public createEvent(event: CreateEventModel): Observable<EventModel> {
        const url = `${Config.apiUrl}/event`;
        return this.http.post<EventModel>(url, JSON.stringify(event));
    }

    public updateEvent(event: EventModel): Observable<EventModel> {
        const url = `${Config.apiUrl}/event`;
        return this.http.put<EventModel>(url, JSON.stringify(event));
    }

    public deleteEvent(eventId: number): Observable<boolean> {
        const url = `${Config.apiUrl}/event/${eventId}`;
        return this.http.delete<boolean>(url);
    }
}
