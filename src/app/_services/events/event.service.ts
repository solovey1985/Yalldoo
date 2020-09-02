import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { CreateEventModel } from "app/_models/events/create-event.model";
import { EventModel } from "app/_models/events/event.model";
import { Config } from "../../_configs/config";
import { Observable } from "rxjs";
import { PaginationModel } from "app/_models/pagination/pagination.model";

@Injectable({
    providedIn: "root"
})
export class EventService {
    constructor(private http: HttpClient) {}

    public fetchEvents(filter?: any): Observable<PaginationModel<EventModel>> {
        let url = "";
        if (filter) {
            url = `${Config.apiUrl}/event?pageNumber=${filter.pageNumber}&pageSize=${filter.pageSize}`;
        } else {
            url = `${Config.apiUrl}/event`;
        }

        return this.http.get<PaginationModel<EventModel>>(url);
    }

    public fetchEvent(eventId: number): Observable<EventModel> {
        const url = `${Config.apiUrl}/event/${eventId}`;
        return this.http.get<EventModel>(url);
    }

    public createEvent(event: CreateEventModel): Observable<EventModel> {
        const url = `${Config.apiUrl}/event`;
        return this.http.post<any>(url, JSON.stringify(event)).map((response) => response.data);
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
