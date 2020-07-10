import { Component, OnInit, ChangeDetectionStrategy, ElementRef } from "@angular/core";
import { FormGroup, FormBuilder, Validators, ValidatorFn, AbstractControl } from "@angular/forms";
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
    selectedCategory: Category;
    dropdownSettings = {};
    location: LocationDto;
    dateTime: Date;
    invitedFriends: Array<FirendListItem>;
    isDateSelected = false;
    isLocationSelected = false;
    isFriendsSelected = false;
    privacyList: string[];
    selectedPrivacy: string;

    public validation_messages: any;

    public form: FormGroup;
    constructor(private builder: FormBuilder, private categoryService: CategoryService, private modal: ModalService) {}

    ngOnInit(): void {
        this.initValidationMessages();
        this.dateTime = new Date();
        this.form = this.builder.group({
            privacy: [this.selectedPrivacy, [isControlSelected(this.selectedPrivacy === '')]],
            title: ["", Validators.compose([Validators.required, Validators.minLength(3), Validators.maxLength(50)])],
            category: [this.selectedCategory, [Validators.required]],
            dateTime: [this.dateTime, [isControlSelected(this.isDateSelected)]],
            invintations: [this.invitedFriends],
            description: ["", Validators.maxLength(255)],
            location: [this.location]
        });
        this.categories = this.mapCategories(this.categoryService.getCategories());

        this.dropdownSettings = {
            singleSelection: true,
            text: "Category",
            selectAllText: "Select All",
            unSelectAllText: "UnSelect All",
            classes: "",
            enableSearchFilter: true,
            lazyLoading: true
        };

        this.privacyList = ["Public", "Friends", "Private"];
    }

    setPrivacy($event: string) {
        this.selectedPrivacy = $event!!;
        this.form.get("privacy").setErrors({"isSelected": true});
    }

    onItemSelect(item: any) {
        if (item) {
            const category = this.categoryService.getCategories().find((x) => x.title === item);
            if (category) {
                this.selectedCategory = category;
            } else {
                this.selectedCategory = null;
            }
        }
    }

    OnItemDeSelect(item: any) {
        this.selectedCategory = null;
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
            if (result) {
                this.dateTime = new Date(result);
                this.isDateSelected = true;
                this.form.get("dateTime").setErrors({"isSelected": true});
            } else {
                this.form.get("dateTime").markAsDirty();
                this.form.get("dateTime").setErrors({"isSelected": false});
            }
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
    //------ END Modals ------------------------

    onCreateButtonClick() {
        this.form.markAllAsTouched();
        console.log(this.form.controls);
    }

    public isValid(): boolean {
        if (this.form.valid) {
            return true;
        }
        return false;
    }

    initValidationMessages() {
        this.validation_messages = {
            privacy: [{ type: "notSelected", message: "Select event privacy" }],
            title: [
                { type: "required", message: "Title is required" },
                { type: "minlength", message: "Title must be at least 3 characters long" },
                { type: "maxlength", message: "Title cannot be more than 50 characters long" }
            ],
            dateTime: [
                { type: "required", message: "Date and time is required" },
                { type: "notSelected", message: "Date and time is required" },
            ],
            category: [{ type: "required", message: "Category is required" }],
            description: [{ type: "maxlength", message: "Description cannot be more than 255 characters long" }],
        };
    }
}

function isControlSelected(isSelected: boolean): ValidatorFn{
    return (control: AbstractControl): { [key: string]:any } | null => {
        return !isSelected ? {'notSelected': {value: control.value}}:null;
    }
}