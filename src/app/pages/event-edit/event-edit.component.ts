import { ChangeDetectionStrategy, Component, OnInit } from "@angular/core";
import { FormGroup, FormBuilder, Validators, ValidatorFn, AbstractControl } from "@angular/forms";
import { ComponentStore } from "@ngrx/component-store";
import { Store } from "@ngrx/store";
import { EventModel } from "app/_models/events/event.model";
import LocationDto from "app/_models/location.dto";
import { CategoryService } from "app/_services/category/category.service";
import { ModalService } from "app/_services/modal/modal.service";
import { AppState, selectAllCategories, selectCurrentEvent, selectCurrentEventId } from "app/_store/app.states";
import { EventEditStore } from "app/_store/component-stores/event-edit.store";
import { Observable } from "rxjs";

@Component({
    selector: "app-event-edit",
    templateUrl: "./event-edit.component.html",
    styleUrls: ["./event-edit.component.scss"],
    providers: [EventEditStore],
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class EventEditComponent implements OnInit {
    eventId$: Observable<number>;
    eventId: number;
    public event: EventModel;
    public form: FormGroup;
    event$ = this.eventEditStore.event$;
    isLoading$: Observable<boolean>;
    selectedPrivacy: string;
    isDateSelected: boolean;
    isLocationSelected = false; 
    currentLocation: LocationDto;


    isPrivacySelected = false;
    privacyList = ["Public", "Friends", "Private"];
    constructor(
        private builder: FormBuilder,
        private modal: ModalService,
        private eventEditStore: EventEditStore,
        private categoryService: CategoryService
    ) {}

    ngOnInit(): void {
        this.event$ = this.eventEditStore.select((state) => state.event);
        this.isLoading$ = this.eventEditStore.isLoading$;
        this.event$
            .filter((e) => e !== null)
            .subscribe((e) => {
                this.event = e;
                this.initForm();
            });
    }

    initForm() {
        this.currentLocation = LocationDto.fromEventLocation(this.event.location);
        this.form = this.builder.group(
            {
                title: [this.event.title, Validators.required],
                description: [this.event.description],
                category: [this.event.category],
                location: [this.event.location]
            },
            { updateOn: "change" }
        );
    }

    // Modals
    showDatetimepickerModal(): void {
        this.modal.openDateTimePicker(this.event.startDate).subscribe((result: string) => {
            if (result) {
                this.event.startDate = new Date(result);
                this.isDateSelected = true;
                this.form.get("dateTime").markAsTouched();
                this.form.get("dateTime").clearValidators();
                this.form.patchValue({ dateTime: this.event.startDate });
            } else {
                this.form.get("dateTime").markAsTouched();
                this.form.get("dateTime").setErrors({ required: true });
            }
        });
    }

    showLocationpickerModal(): void {
        this.modal.openLocationPicker(this.currentLocation).subscribe((result: LocationDto) => {
            if (result) {
                this.currentLocation = result;
                this.isLocationSelected = true;
                
                this.form.get("location").clearValidators();
                const loc = result.toEventLocation();
                
                this.form.get("location").setValue(loc);
            } else {
                this.form.get("location").markAsTouched();
                this.form.get("location").setErrors({ required: true });
            }
        });
    }

    getIcon(): string {
        return this.categoryService.getCategoryIcon(this.event.category);
    }

    setPrivacy($event: string) {
        this.selectedPrivacy = $event!!;
        this.form.get("privacy").clearValidators();
        this.form.get("privacy").setValue(this.selectedPrivacy);
        this.isPrivacySelected = true;
    }
}
