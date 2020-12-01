import { Component, OnInit, ViewChild, ElementRef } from "@angular/core";
import { FormBuilder, FormGroup, Validators, FormControl, AbstractControl } from "@angular/forms";
import { PasswordsValidator } from "app/core/form-validators/passwords.validator";
import { UsernameValidator } from "app/core/form-validators/username.validator";
import { NotifyService } from "app/services/notify-service/notify.service";
import { Router } from "@angular/router";
import { CategoriesComponent } from "../preferences/categories/categories.component";
import { ValidationService } from "app/_services/validation/validation.service";
import { UserRegisterModel } from "app/_models/user/user-register.model";
import { RegisterAction } from "app/_store/actions/user.actions";
import { Store } from "@ngrx/store";
import { AppState } from "app/_store/app.states";
import LocationDto from "app/_models/location.dto";
import { LocationInDTO } from "app/_models/events/event.model";

@Component({
    selector: "app-register",
    templateUrl: "./register.component.html",
    styleUrls: ["./register.component.scss"]
})
export class RegisterComponent implements OnInit {
    public form: FormGroup;
    private city: LocationDto;
    public validation_messages: any;
    constructor(private builder: FormBuilder, private notifyService: NotifyService,
        private store: Store<AppState>,
        private router: Router) {

         }

    ngOnInit() {
       const matchingPasswordsGroup = new FormGroup(
            {
                password: new FormControl(
                    "",
                    Validators.compose([
                        Validators.required,
                        Validators.minLength(6),
                        Validators.maxLength(25),
                        ValidationService.passwordPatternValidator
                    ])
                ),
                confirmPassword: new FormControl("", [Validators.required])
            },
            (formGroup: FormGroup) => {
                return ValidationService.passwordsMatchValidator(formGroup);
            }
        );

        this.form = this.builder.group(
            {
                name: ["", Validators.compose([
                    Validators.maxLength(25),
                    Validators.minLength(2),
                    Validators.required
                ])],
                email: ["",  Validators.compose([
                    Validators.required,
                    ValidationService.emailPatternValidator
                ])],
                city:[this.city, Validators.required],
                matchingPasswordsGroup: matchingPasswordsGroup,
                acceptAgreement: [false, ValidationService.checkRequired]
            },
            { updateOn: "change" }
        );
    }


    formSubmit(event): void {
        const userRegisterModel = new UserRegisterModel();
        userRegisterModel.firstName = this.form.get("name").value;
        userRegisterModel.email = this.form.get("email").value;
        userRegisterModel.password = this.form.get("matchingPasswordsGroup").get("password").value;
        userRegisterModel.confirmPassword = this.form.get("matchingPasswordsGroup").get("confirmPassword").value;

        userRegisterModel.city = this.toLocationModel(this.form.get("city").value);
        this.store.dispatch(new RegisterAction(userRegisterModel));
    }

    isInvalid(control: AbstractControl): boolean {
        return control.invalid && control.touched
    }

    onSubmitClick() {
        console.log(this.form.get("city").value);
    }

    toLocationModel(location: LocationDto) {
        if (location) {
            return location.toEventLocation();
        }
        return new LocationInDTO();
    }

    public get messages() {
        return this.validation_messages;
    }

}
