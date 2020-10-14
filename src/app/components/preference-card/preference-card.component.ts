import { Component, OnInit, ChangeDetectionStrategy, Input, Output, EventEmitter } from "@angular/core";
import { Router } from "@angular/router";
import { NotifyService } from "app/services/notify-service/notify.service";
import { ThrowStmt } from "@angular/compiler";
import { CategoryDto } from "../../pages/preferences/models/categoryDto";
import { DeviceDetectorService } from "ngx-device-detector";

@Component({
    selector: "app-preference-card",
    templateUrl: "./preference-card.component.html",
    styleUrls: ["./preference-card.component.scss"]
})
export class PreferenceCardComponent implements OnInit {
    @Input() preference: CategoryDto;

    @Input("size")
    size: string;

    @Output()
    onCardSelected: EventEmitter<any> = new EventEmitter<number>();

    public sizeClass: string;

    constructor(private deviceService: DeviceDetectorService) {}

    get isMobile(): boolean {
        return this.deviceService.isMobile();
    }

    ngOnInit(): void {
        this.sizeClass = this.size === "sm" ? "yld-card-sm" : "";
    }

    onCardClick(): void {}

    onSelectClick() {
        this.onCardSelected.emit(this.preference.id);
    }
}
