import { Component, OnInit } from "@angular/core";
import { ModalService } from "app/_services/modal/modal.service";
import { NotifyService } from "app/services/notify-service/notify.service";
import { CategoryService } from "app/_services/category/category.service";
import LocationDto from "app/_models/location.dto";
import { Category } from "app/_models/category/category.model";
import { ThrowStmt } from "@angular/compiler";

@Component({
    selector: "app-settings",
    templateUrl: "./settings.component.html",
    styleUrls: ["./settings.component.scss"]
})
export class SettingsComponent implements OnInit {
    state_info = true;
    state_info1 = true;
    state_info2 = true;
    locations: LocationDto[];
    data: Date = new Date();
    categories: Category[];
    constructor(private modal: ModalService, private notify: NotifyService, private categoryService: CategoryService) {
        this.locations = new Array<LocationDto>();
    }

    ngOnInit() {
        var body = document.getElementsByTagName("body")[0];
        body.classList.add("settings-page");

        this.categories = this.categoryService.getChildCategories().filter(x => x.id.toLocaleString().endsWith('02'));
    }
    ngOnDestroy() {
        var body = document.getElementsByTagName("body")[0];
        body.classList.remove("settings-page");
    }

    onPlaceEditClick(location?: LocationDto) {
        this.modal.openLocationPicker(location);
    }

    onCategoriesEditClick() {
        this.modal.openCategoriesPrefernceEditor(this.categories).subscribe(result => {
            if (result) {
                this.categories = result;
           }
       });
    }

    onPlacesAddClick() {
        this.modal.openLocationPicker().subscribe((location: LocationDto) => {
            this.locations.push(location);
        });
    }

    onPlaceRemoveClick(location: LocationDto) {
        this.locations = this.locations.filter((x) => x.hereId !== location.hereId);
    }

    getIcon(title: string): string{
        return this.categoryService.getCategoryIcon(title);
    }
}
