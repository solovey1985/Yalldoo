import { Component, OnInit, ChangeDetectionStrategy } from "@angular/core";
import { ModalService } from "app/_services/modal/modal.service";
import { NotifyService } from "app/services/notify-service/notify.service";
import { CategoryService } from "app/_services/category/category.service";
import LocationDto from "app/_models/location.dto";
import { Category } from "app/_models/category/category.model";
import { ThrowStmt } from "@angular/compiler";
import { User } from "app/_models";
import UserInformation from "app/_models/user/userinfo.model";
import { FormBuilder, FormGroup, Validators, FormControl, AbstractControl } from "@angular/forms";
import { link } from "fs";

@Component({
    selector: "app-settings",
    templateUrl: "./settings.component.html",
    styleUrls: ["./settings.component.scss"]
})
export class SettingsComponent implements OnInit {
    isDateSelected: boolean;
    locations: LocationDto[];
    data: Date = new Date();
    categories: Category[];
    user: User;
    userInfo: UserInformation;
    form: FormGroup;
    validation_messages: any;
    constructor(private modal: ModalService,
        private notify: NotifyService,
        private categoryService: CategoryService,
        private fb: FormBuilder) {
        this.locations = new Array<LocationDto>();
        this.userInfo = new UserInformation();
        this.userInfo.birthDate = new Date();
        this.initValidationMessages();
    }

    ngOnInit() {

        //TODO: Remove 
        var body = document.getElementsByTagName("body")[0];
        body.classList.add("settings-page");

        this.categories = this.categoryService.getChildCategories().filter(x => x.id.toLocaleString().endsWith('02'));
        this.buildForm();
    }
    ngOnDestroy() {
        //TODO: Remove 
        var body = document.getElementsByTagName("body")[0];
        body.classList.remove("settings-page");
    }

    onPlaceEditClick(location?: LocationDto) {
        this.modal.openLocationPicker(location).subscribe(result => {
            if (result) {
                this.locations.splice(this.locations.indexOf(location), 1, result);
            }
        });
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
   
    showDatetimepickerModal(): void {
        this.modal.openDateTimePicker(this.userInfo.birthDate, true, "Select Birthday Date").subscribe((result: string) => {
            if (result) {
                this.userInfo.birthDate = new Date(result);
                this.isDateSelected = true;
                this.form.get("birthDate").markAsTouched();
                this.form.get("birthDate").clearValidators();
                this.form.patchValue({ birthDate: this.userInfo.birthDate });
            } else {
                this.form.get("birthDate").markAsTouched();
                this.form.get("birthDate").setErrors({ required: true });
            }
        });
    }

    onPrivacySet($event) {
        console.log($event);
    }

    private buildForm(): void{
        this.form = this.fb.group({
            firstName: [this.userInfo.firstName, Validators.compose([
                Validators.maxLength(25),
                Validators.minLength(2),
                Validators.pattern(/^[a-zA-Zа-яА-Я0-9іІїЇєЄ\'\"]*(?:[\s.]*[a-zA-Zа-яА-Я0-9іІїЇєЄ\'\"]*)*$/),
                Validators.required
            ])],
            lastName: [this.userInfo.lastName, Validators.compose([
                Validators.maxLength(25),
                Validators.minLength(2),
                Validators.pattern(/^[a-zA-Zа-яА-Я0-9іІїЇєЄ\'\"]*(?:[\s.]*[a-zA-Zа-яА-Я0-9іІїЇєЄ\'\"]*)*$/),
                Validators.required
            ])],
            birthDate: [this.userInfo.birthDate],
            description: [this.userInfo.description, [Validators.maxLength(256)]],
            categories: [''],
            places: [''],
        }, {updateOn:"change"});
    }
        
    isInvalid(control: AbstractControl):boolean {
        return control.invalid && control.touched
    }
    
    public get messages() {
        return this.validation_messages;
    }

    public get descriptionLength() : number {
        return this.form.get("description").value ? this.form.get("description").value.length : 0;
    }

   private initValidationMessages() {
        this.validation_messages = {
            privacy: [{ type: "required", message: "Select event privacy" }],
            firstName: [
                { type: "required", message: "First Name is required" },
                { type: "minlength", message: "First Name must be at least 2 characters long" },
                { type: "maxlength", message: "First Name cannot be more than 25 characters long" },
                { type: "pattern", message: "This field must contain only numbers and letters" }
            ],
            lastName: [
                { type: "required", message: "Last Name is required" },
                { type: "minlength", message: "Last Name must be at least 2 characters long" },
                { type: "maxlength", message: "Last Name cannot be more than 25 characters long" },
                { type: "pattern", message: "This field must contain only numbers and letters" }
            ],
            birthDate: [{ type: "required", message: "Date is required" }],
            location: [{ type: "required", message: "Location is required" }],
            category: [{ type: "required", message: "Category is required" }],
            description: [{ type: "maxlength", message: "Description cannot be more than 1024 characters long" }]
        };
    }
}
