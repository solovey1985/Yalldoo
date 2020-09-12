import { Component, OnInit, ViewChild, ElementRef } from "@angular/core";
import { FormBuilder, FormGroup, Validators, FormControl, AbstractControl } from "@angular/forms";
import { PasswordsValidator } from "app/core/form-validators/passwords.validator";
import { UsernameValidator } from "app/core/form-validators/username.validator";
import { NotifyService } from "app/services/notify-service/notify.service";
import { Router } from "@angular/router";
import { PreferencesComponent } from "../preferences/preferences.component";
import { ValidationService } from "app/_services/validation/validation.service";
import { UserRegisterModel } from "app/_models/user/user-register.model";
import { RegisterAction } from "app/_store/actions/user.actions";
import { Store } from "@ngrx/store";
import { AppState } from "app/_store/app.states";

@Component({
    selector: "app-register",
    templateUrl: "./register.component.html",
    styleUrls: ["./register.component.scss"]
})
export class RegisterComponent implements OnInit {
    public form: FormGroup;

    public validation_messages: any;
    constructor(private builder: FormBuilder, private notifyService: NotifyService,
        private store: Store<AppState>,
        private router: Router) { }

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
                matchingPasswordsGroup: matchingPasswordsGroup,
                acceptAgreement: [false, ValidationService.checkRequired]
            },
            { updateOn: "change" }
        );
    }

    formSubmit(event): void {
        const userRegister = new UserRegisterModel();
        userRegister.firstName = this.form.get("name").value;
        userRegister.email = this.form.get("email").value;
        userRegister.password = this.form.get("matchingPasswordsGroup").get("password").value;
        userRegister.confirmPassword = this.form.get("matchingPasswordsGroup").get("confirmPassword").value;

        this.store.dispatch(new RegisterAction(userRegister));
    }

    isInvalid(control: AbstractControl): boolean {
        return control.invalid && control.touched
    }

    public get messages() {
        return this.validation_messages;
    }

}
