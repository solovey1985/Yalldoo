import { Component, OnInit, ChangeDetectionStrategy, ElementRef } from "@angular/core";
import { FormGroup, FormBuilder, Validators } from "@angular/forms";
import { CategoryService } from "app/_services/category/category.service";
import { Category } from "app/_models/category/category.model";
import { ModalService } from "app/_services/modal/modal.service";
import { DateTimePickerComponent } from "app/components/date-time-picker/date-time-picker.component";
import { NgbDateTimeStruct } from "app/components/date-time-picker/date-time.model";
import LocationDto from "app/_models/location.dto";
import { FirendListItem } from "app/_models/friends/friend-list-item.model";
import { MultiselectItem } from "app/_models/multiselect/multiselect.model";

@Component({
    templateUrl: "./event-create.component.html",
    styleUrls: ["./event-create.component.scss"],
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class EventCreateComponent implements OnInit {
    categories = [];
    selectedItems = [];
    dropdownSettings = {};
    location: LocationDto;
    dateTime: Date;
    invitedFriends: Array<FirendListItem>;
    isDateSelected = false;
    isLocationSelected = false;
    isFriendsSelected = false;
    privacyList: string[];
    selectedPrivacy: string;

    public form: FormGroup;
    constructor(private builder: FormBuilder, private categoryService: CategoryService, private modal: ModalService) {}

    ngOnInit(): void {
        this.dateTime = new Date();
        this.form = this.builder.group({
            title: ["", Validators.required],
            description: [""],
            category: [[]]
        });
        this.categories = this.mapCategories(this.categoryService.getCategories());

        this.selectedItems = [];
        this.dropdownSettings = {
            singleSelection: true,
            text: "Category",
            selectAllText: "Select All",
            unSelectAllText: "UnSelect All",
            classes: "",
            enableSearchFilter: true,
        };

        this.privacyList = ["Public", "Friends", "Private"];
    }

    setPrivacy($event: string) {
        this.selectedPrivacy = $event!!;
    }

    onItemSelect(item: any) {
        console.log(item);
        console.log(this.selectedItems);
    }

    OnItemDeSelect(item: any) {
        console.log(item);
        console.log(this.selectedItems);
    }
    onSelectAll(items: any) {
        console.log(items);
    }
    onDeSelectAll(items: any) {
        console.log(items);
    }

    mapCategories(categories: Category[]): MultiselectItem[] {
        let items = new Array<MultiselectItem>();
        const parrents = categories.filter((p) => p.parrentId == null);
        parrents.map((p) => {
            const catsByParrent = categories.filter((x) => x.parrentId == p.id);
            catsByParrent.map((cat) => items.push(this.mapToMultiselectDropdownItem(cat, p)));
        });
        return items;
    }

    private mapToMultiselectDropdownItem(item: Category, parrent?: Category): MultiselectItem {
        return {
            id: item.id,
            itemName: item.title,
            category: parrent ? parrent.title : ""
        };
    }

    //------- Modals ---------------------
    showDatetimepickerModal(): void {
        this.modal.openDateTimePicker(this.dateTime).subscribe((result: string) => {
            this.dateTime = new Date(result);
            this.isDateSelected = true;
        });
    }

    showLocationpickerModal(): void {
        this.modal.openLocationPicker(this.location).subscribe((result: LocationDto) => {
            this.location = result;
            this.isLocationSelected = true;
        });
    }

    showFriendspickerModal(): void {
        this.modal.openFriendsPicker().subscribe((result: Array<FirendListItem>) => {
            if (result) {
                this.invitedFriends = result;
                this.isFriendsSelected = true;
            }
        });
    }
}
