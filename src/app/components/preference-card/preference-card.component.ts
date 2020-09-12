import { Component, OnInit, ChangeDetectionStrategy, Input, Output, EventEmitter } from "@angular/core";
import { Router } from "@angular/router";
import { NotifyService } from "app/services/notify-service/notify.service";
import { ThrowStmt } from "@angular/compiler";

@Component({
    selector: "app-preference-card",
    templateUrl: "./preference-card.component.html",
    styleUrls: ["./preference-card.component.scss"]
})
export class PreferenceCardComponent implements OnInit {
    @Input()
    id: number;
    @Input()
    title: string;
    @Input()
    description: string;
    @Input()
    backgroundUrl: string;
    @Input()
    icon: string;
    @Input()
    selected: boolean;

    @Input("size")
    size: string;

    @Output()
    onCardSelected: EventEmitter<any> = new EventEmitter<number>();

    public sizeClass: string;

    constructor() {}

    ngOnInit(): void {
        this.sizeClass = this.size === "sm" ? "yld-card-sm" : "";
    }

    onCardClick(): void {}

    onSelectClick() {
        this.onCardSelected.emit(this.id);
    }
}
