import { Component, OnInit, ChangeDetectionStrategy } from "@angular/core";
import { ModalService } from "app/_services/modal/modal.service";
import { NotifyService } from "app/services/notify-service/notify.service";
import { CategoryService } from "app/_services/category/category.service";
import LocationDto from "app/_models/location.dto";
import { Category } from "app/_models/category/category.model";
import { ThrowStmt } from "@angular/compiler";
import UserInformation from "app/_models/user/user-information.model";
import { FormBuilder, FormGroup, Validators, FormControl, AbstractControl } from "@angular/forms";
import { DomSanitizer } from "@angular/platform-browser";
import { ValidationService } from "app/_services/validation/validation.service";
import { User } from "app/_models/user/user.model";

@Component({
    templateUrl: "./profile-edit.component.html",
    styleUrls: ["./profile-edit.component.scss"]
})
export class EditProfileComponent implements OnInit {
    isDateSelected: boolean;
    locations: LocationDto[];
    data: Date = new Date();
    categories: Category[];
    user: User;
    userInfo: UserInformation;
    state: any = {};
    form: FormGroup;
    isRound: boolean = false;
    image: string;
    validation_messages: any;
    constructor(private modal: ModalService,
        private notify: NotifyService,
        private categoryService: CategoryService,
        private fb: FormBuilder,
        private sanitizer: DomSanitizer) {
        this.locations = new Array<LocationDto>();
        this.userInfo = new UserInformation();
        this.userInfo.birthDate = new Date();
        this.handleImageChange = this.handleImageChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
        this.handleClick = this.handleClick.bind(this);
        this.handleRemove = this.handleRemove.bind(this);
        this.state = {
            file: null,
            imagePreviewUrl: this.image !== undefined ? this.image:(this.isRound ? './assets/img/placeholder.jpg':'./assets/img/image_placeholder.jpg')
        }
    }

    ngOnInit() {
        this.userInfo.firstName = "";
        this.userInfo.lastName = "";
        this.userInfo.description = "";
        this.userInfo.email = "";
        this.userInfo.phone = "";
        
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
               ValidationService.namePatternValidator,
                Validators.required
            ])],
            lastName: [this.userInfo.lastName, Validators.compose([
                Validators.maxLength(25),
                Validators.minLength(2),
                ValidationService.namePatternValidator,
                Validators.required
            ])],
            email: [this.userInfo.email, ValidationService.emailPatternValidator],
            phone: [this.userInfo.phone, ValidationService.phonePatternValidator],
            facebook: [this.userInfo.facebook, Validators.compose([
                Validators.maxLength(1024)
            ])],
            website: [this.userInfo.website, Validators.compose([
                Validators.maxLength(1024)
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
    


    public get descriptionLength() : number {
        return this.form.get("description").value ? this.form.get("description").value.length : 0;
    }

    public get backgroundImage():any {
       return this.sanitizer.bypassSecurityTrustStyle(`url(${this.state.imagePreviewUrl})`)
    }

   
    
        handleImageChange(e){
        e.preventDefault();
        let reader = new FileReader();
        let file = e.target.files[0];
        reader.onloadend = () => {
            this.state.file = file;
            this.state.imagePreviewUrl = reader.result;
            // this.state.imagePreviewUrl1 = reader.result;
        }
        reader.readAsDataURL(file);
    }
    handleSubmit(e){
        e.preventDefault();
    }
    handleClick(){
        var input = document.createElement("input");
        input.type = "file";
        input.onchange = this.handleImageChange;
        input.click();
    }


    handleRemove(){
        this.state.file = null;
        this.state.imagePreviewUrl = this.image !== undefined ? this.image:(this.isRound ? './assets/img/placeholder.jpg':'./assets/img/image_placeholder.jpg');
    }
}
