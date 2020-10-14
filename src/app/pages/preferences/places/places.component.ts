import { Component, OnInit } from "@angular/core";
import { NotifyService } from "app/services/notify-service/notify.service";
import { Router } from "@angular/router";
import LocationDto from "app/_models/location.dto";
import { CategoryDto } from "../models/categoryDto";
import { getCategoriesMock } from "../models/categoriesMock";
// TODO: Delete if unused in final version
@Component({
    templateUrl: "./places.component.html",
    styleUrls: ["./places.component.scss"]
})
export class PlacesComponent implements OnInit {
    preferences: CategoryDto[] = new Array<CategoryDto>();
    locations: LocationDto[] = new Array<LocationDto>();

    constructor(private router: Router, private notify: NotifyService) {}

    ngOnInit(): void {
        this.setPreferredPlaces();
    }
    get preferencesCounter() {
        return this.preferences.filter((x) => x.isSelected).length;
    }

    onCardSelected(id: number) {
        const preference = this.preferences.find((x) => x.id == id);
        if (preference) {
            preference.isSelected = !preference.isSelected;
        }
    }

    onPreferencesConfirm(): void {
        this.notify.info("Preferences was saved");
        setTimeout(() => this.router.navigate(["/me"]), 2000);
    }

    addSelectedPlace(location: LocationDto) {
        if (location) {
            this.locations.push(location);
        }
    }
    onRemoveClick(location: LocationDto) {
        this.locations = this.locations.filter(x => x.hereId !== location.hereId);
    }

    canConfirm(): boolean {
        return this.preferences.filter((x) => x.isSelected).length > 0 && this.locations.length > 0;
    }

    private setPreferredPlaces(): void {
        this.preferences = getCategoriesMock();
    }
}
