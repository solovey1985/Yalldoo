import { Component, OnInit } from "@angular/core";
import { ModalService } from "app/_services/modal/modal.service";
import { NotifyService } from "app/services/notify-service/notify.service";
import { CategoryService } from "app/_services/category/category.service";

@Component({
    selector: "app-settings",
    templateUrl: "./settings.component.html",
    styleUrls: ["./settings.component.scss"]
})
export class SettingsComponent implements OnInit {
    state_info = true;
    state_info1 = true;
    state_info2 = true;

    data: Date = new Date();

    constructor(private modal: ModalService, private notify: NotifyService, private categoryService: CategoryService) {}

    ngOnInit() {
        var body = document.getElementsByTagName("body")[0];
        body.classList.add("settings-page");
        var navbar = document.getElementsByTagName("nav")[0];
        navbar.classList.add("navbar-transparent");
        navbar.classList.add("bg-danger");
    }
    ngOnDestroy() {
        var body = document.getElementsByTagName("body")[0];
        body.classList.remove("settings-page");
        var navbar = document.getElementsByTagName("nav")[0];
        navbar.classList.remove("navbar-transparent");
        navbar.classList.remove("bg-danger");
    }

    onPlaceEditClick() {
        this.notify.info("Editing place");
    }

    onCategoriesEditClick() {
        this.notify.info("Category Edit Click");
    }

    onPlacesAddClick() {
        this.notify.info("Place Edit Click");
    }
}
