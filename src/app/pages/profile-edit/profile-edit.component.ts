import { Component, OnInit, ChangeDetectionStrategy } from "@angular/core";
import { ModalService } from "app/_services/modal/modal.service";
import { NotifyService } from "app/services/notify-service/notify.service";
import { CategoryService } from "app/_services/category/category.service";
import LocationDto from "app/_models/location.dto";
import { CategoryModel } from "app/_models/category/category.model";
import { ThrowStmt } from "@angular/compiler";
import UserInformation from "app/_models/user/user-information.model";
import { FormBuilder, FormGroup, Validators, FormControl, AbstractControl } from "@angular/forms";
import { DomSanitizer } from "@angular/platform-browser";
import { ValidationService } from "app/_services/validation/validation.service";
import { User } from "app/_models/user/user.model";
import { ProfileService } from "app/_services/profile/profile.service";
import { ActivatedRoute } from "@angular/router";

@Component({
    templateUrl: "./profile-edit.component.html",
    styleUrls: ["./profile-edit.component.scss"]
})
export class EditProfileComponent implements OnInit {
    isDateSelected: boolean;
    locations: LocationDto[];
    data: Date = new Date();
    categories: CategoryModel[];
    user: User;
    userInfo: UserInformation;
    state: any = {};
    form: FormGroup;
    isRound = false;
    image: string;
    validation_messages: any;
    constructor(
        private route: ActivatedRoute,
        private modal: ModalService,
        private notify: NotifyService,
        private service: ProfileService,
        private categoryService: CategoryService,
        private fb: FormBuilder,
        private sanitizer: DomSanitizer
    ) {
        this.locations = new Array<LocationDto>();
        this.handleImageChange = this.handleImageChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
        this.handleClick = this.handleClick.bind(this);
        this.handleRemove = this.handleRemove.bind(this);
        this.state = {
            file: null,
            imagePreviewUrl:
                this.image !== undefined
                    ? this.image
                    : this.isRound
                    ? "./assets/img/placeholder.jpg"
                    : "./assets/img/image_placeholder.jpg"
        };
        this.route.data.subscribe((data: { userProfile: UserInformation }) => {
            this.userInfo = data.userProfile;
            var locationModel = new LocationDto();
            locationModel.title = this.userInfo.location.address;
            locationModel.position = { lat: this.userInfo.location.latitude, lng: this.userInfo.location.longitude };

            this.locations.push(locationModel);
            this.buildForm();
        });
    }

    ngOnInit() {
        this.categories = this.categoryService.getCategories();
    }

    private buildForm(): void {
        console.log("Init Form");
        console.log(this.userInfo);
        this.form = this.fb.group(
            {
                firstName: [
                    this.userInfo.firstName,
                    Validators.compose([
                        Validators.maxLength(25),
                        Validators.minLength(2),
                        ValidationService.namePatternValidator,
                        Validators.required
                    ])
                ],
                lastName: [
                    this.userInfo.lastName,
                    Validators.compose([
                        Validators.maxLength(25),
                        Validators.minLength(2),
                        ValidationService.namePatternValidator,
                        Validators.required
                    ])
                ],
                email: [this.userInfo.email ?? "", ValidationService.emailPatternValidator],
                phone: [this.userInfo.phone ?? "", ValidationService.phonePatternValidator],
                facebook: [this.userInfo.facebook ?? "", Validators.compose([Validators.maxLength(1024)])],
                website: [this.userInfo.website ?? "", Validators.compose([Validators.maxLength(1024)])],
                birthDate: [this.userInfo.birthday ?? new Date()],
                description: [this.userInfo.description ?? "", [Validators.maxLength(256)]],
                categories: [this.userInfo.favoriteCategories ?? []],
                places: [[]]
            },
            { updateOn: "change" }
        );
    }

    ngOnDestroy() {}

    onPlaceEditClick(location?: LocationDto) {
        this.modal.openLocationPicker(location).subscribe((result) => {
            if (result) {
                this.locations.splice(this.locations.indexOf(location), 1, result);
            }
        });
    }

    onCategoriesEditClick() {
        this.modal.openCategoriesPrefernceEditor(this.categories).subscribe((result) => {
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

    getIcon(title: string): string {
        return this.categoryService.getCategoryIcon(title);
    }

    showDatetimepickerModal(): void {
        this.modal
            .openDateTimePicker(this.userInfo.birthday, true, "Select Birthday Date")
            .subscribe((result: string) => {
                if (result) {
                    this.userInfo.birthday = new Date(result);
                    this.isDateSelected = true;
                    this.form.get("birthDate").markAsTouched();
                    this.form.get("birthDate").clearValidators();
                    this.form.patchValue({ birthDate: this.userInfo.birthday });
                } else {
                    this.form.get("birthDate").markAsTouched();
                    this.form.get("birthDate").setErrors({ required: true });
                }
            });
    }

    onPrivacySet($event) {
        console.log($event);
    }

    public g(control: string) {
        if (this.form) {
            return this.form.get(control);
        }
        return null;
    }

    isInvalid(control: AbstractControl): boolean {
        // if (control) {
        //     return control.invalid && control.touched;
        // }
        return false;
    }

    public get descriptionLength(): number {
        if (this.form) {
            return this.form.get("description").value ? this.form.get("description").value.length : 0;
        }
        return 0;
    }

    public get backgroundImage(): any {
        return this.sanitizer.bypassSecurityTrustStyle(`url(${this.state.imagePreviewUrl})`);
    }

    handleImageChange(e) {
        e.preventDefault();
        const reader = new FileReader();
        const file = e.target.files[0];
        reader.onloadend = () => {
            this.state.file = file;
            this.state.imagePreviewUrl = reader.result;
            // this.state.imagePreviewUrl1 = reader.result;
        };
        reader.readAsDataURL(file);
    }
    handleSubmit(e) {
        e.preventDefault();
    }
    handleClick() {
        const input = document.createElement("input");
        input.type = "file";
        input.onchange = this.handleImageChange;
        input.click();
    }

    handleRemove() {
        this.state.file = null;
        this.state.imagePreviewUrl =
            this.image !== undefined
                ? this.image
                : this.isRound
                ? "./assets/img/placeholder.jpg"
                : "./assets/img/image_placeholder.jpg";
    }
}
