import { Component, OnInit, ChangeDetectionStrategy, ElementRef } from "@angular/core";
import { FormGroup, FormBuilder, Validators, ValidatorFn, AbstractControl } from "@angular/forms";
import { CategoryService } from "app/_services/category/category.service";
import { CategoryModel } from "app/_models/category/category.model";
import { ModalService } from "app/_services/modal/modal.service";
import { DateTimePickerComponent } from "app/components/date-time-picker/date-time-picker.component";
import { NgbDateTimeStruct } from "app/components/date-time-picker/date-time.model";
import LocationDto from "app/_models/location.dto";
import { FirendListItem } from "app/_models/friends/friend-list-item.model";
import { MultiselectItem } from "app/_models/multiselect/multiselect.model";
import { NotifyService } from "app/services/notify-service/notify.service";
import { CreateEventModel } from "app/_models/events/create-event.model";
import { CreateEventAction } from "app/_store/actions/events.actions";
import { Store } from "@ngrx/store";
import { AppState, selectAllCategories } from "app/_store/app.states";
import { Observable } from "rxjs";
import { CategoriesLoadAction } from "app/_store/actions/category.actions";
import { EventLocationModel, ELocationType } from "app/_models/location/event-create-location.model";

@Component({
    templateUrl: "./event-create.component.html",
    styleUrls: ["./event-create.component.scss"]
})
export class EventCreateComponent implements OnInit {
    categories = [];
    selectedCategory: CategoryModel;
    dropdownSettings = {};
    location: LocationDto;
    dateTime = new Date();
    invitedFriends: Array<FirendListItem>;
    isDateSelected = false;
    isLocationSelected = false;
    isFriendsSelected = false;
    isPrivacySelected = false;
    privacyList: string[];
    selectedPrivacy: string;
    categoryDtos: CategoryModel[];
    image: string;
    categories$: Observable<CategoryModel[]>;
    public validation_messages: any;

    public form: FormGroup;
    constructor(
        private builder: FormBuilder,
        private categoryService: CategoryService,
        private modal: ModalService,
        private notify: NotifyService,
        private store: Store<AppState>
    ) {
        this.categories$ = store.select(selectAllCategories);
    }

    ngOnInit(): void {
        this.initValidationMessages();
        this.dateTime = new Date();
        this.form = this.builder.group(
            {
                privacy: [this.selectedPrivacy, [isControlSelected(this.isPrivacySelected)]],
                title: [
                    "",
                    Validators.compose([Validators.required, Validators.minLength(3), Validators.maxLength(50)])
                ],
                category: [this.selectedCategory, [Validators.required]],
                dateTime: [this.dateTime, [isControlSelected(this.isDateSelected)]],
                invintations: [this.invitedFriends],
                description: ["", Validators.maxLength(1024)],
                location: [this.location, [isControlSelected(this.isLocationSelected)]]
            },
            { updateOn: "change" }
        );
        this.categories$.subscribe((cats) => {
            this.categoryDtos = cats;
            this.categories = this.mapCategories(cats);
        });

        this.store.dispatch(new CategoriesLoadAction());

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
        this.form.get("privacy").clearValidators();
        this.form.get("privacy").setValue(this.selectedPrivacy);
        this.isPrivacySelected = true;
    }

    onItemSelect(item: any) {
        if (item) {
            const category = this.categoryDtos.find((x) => x.title === item.itemName);
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

    mapCategories(categories: CategoryModel[]): MultiselectItem[] {
        const items = new Array<MultiselectItem>();
        const parrents = categories.filter((p) => p.parrentId == 0);
        parrents.map((p) => {
            const catsByParrent = categories.filter((x) => x.parrentId == p.id);
            catsByParrent.map((cat) => items.push(this.mapToMultiselectDropdownItem(cat, p)));
        });
        return items;
    }

    private mapToMultiselectDropdownItem(item: CategoryModel, parrent?: CategoryModel): MultiselectItem {
        return {
            id: item.id,
            itemName: item.title,
            category: parrent ? parrent.title : ""
        };
    }

    // ------- Modals ---------------------
    showDatetimepickerModal(): void {
        this.modal.openDateTimePicker(this.dateTime).subscribe((result: string) => {
            if (result) {
                this.dateTime = new Date(result);
                this.isDateSelected = true;
                this.form.get("dateTime").markAsTouched();
                this.form.get("dateTime").clearValidators();
                this.form.patchValue({ dateTime: this.dateTime });
            } else {
                this.form.get("dateTime").markAsTouched();
                this.form.get("dateTime").setErrors({ required: true });
            }
        });
    }

    showLocationpickerModal(): void {
        this.modal.openLocationPicker(this.location).subscribe((result: LocationDto) => {
            if (result) {
                this.location = result;
                this.isLocationSelected = true;
                this.form.get("location").clearValidators();
                this.form.get("location").setValue(this.location);
            } else {
                this.form.get("location").markAsTouched();
                this.form.get("location").setErrors({ required: true });
            }
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

    onImageSelected($event) {
        if ($event) {
            this.image = $event;
        }
    }
    // ------ END Modals ------------------------

    onCreateButtonClick(): void {
        this.form.markAllAsTouched();
        this.form.updateValueAndValidity();
        if (this.form.valid) {
            const event = this.mapFormToEvent();
            this.store.dispatch(new CreateEventAction(event));
        }
    }

    public isValid(): boolean {
        if (this.form.valid) {
            return true;
        }
        return false;
    }

    initValidationMessages() {
        this.validation_messages = {
            privacy: [{ type: "required", message: "Select event privacy" }],
            title: [
                { type: "required", message: "Title is required" },
                { type: "minlength", message: "Title must be at least 3 characters long" },
                { type: "maxlength", message: "Title cannot be more than 50 characters long" }
            ],
            dateTime: [{ type: "required", message: "Date and time is required" }],
            location: [{ type: "required", message: "Location is required" }],
            category: [{ type: "required", message: "Category is required" }],
            description: [{ type: "maxlength", message: "Description cannot be more than 1024 characters long" }]
        };
    }

    private mapFormToEvent(): CreateEventModel {
        const event = new CreateEventModel();
        event.title = this.getFormValue("title");
        event.description = this.getFormValue("description");
        event.privacy = this.getFormValue("privacy");
        event.startDate = this.getFormValue("dateTime");
        event.location = this.getFormValue("location");
        event.subCategoryId = this.selectedCategory.id;
        event.categoryId = this.selectedCategory.parrentId;
        event.image = this.image;
        event.location = new EventLocationModel(
            this.location.title,
            this.location.position.lat,
            this.location.position.lng,
            this.location.hereId,
            ELocationType.coordinates
        );
        return event;
    }

    private getFormValue(key: string): any {
        return this.form.get(key).value;
    }
}

function isControlSelected(isSelected: boolean): ValidatorFn {
    return (control: AbstractControl): { [key: string]: any } | null => {
        return isSelected ? null : { required: true };
    };
}
