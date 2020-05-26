import { Component, OnInit, ViewChild, ElementRef } from "@angular/core";
import { FormBuilder, FormGroup, Validators, FormControl, AbstractControl } from "@angular/forms";
import { PasswordsValidator } from "app/core/form-validators/passwords.validator";
import { UsernameValidator } from "app/core/form-validators/username.validator";
import { NotifyService } from "app/services/notify-service/notify.service";
import { Router } from "@angular/router";
import { PreferencesComponent } from "../preferences/preferences.component";

@Component({
    selector: "app-register",
    templateUrl: "./register.component.html",
    styleUrls: ["./register.component.scss"]
})
export class RegisterComponent implements OnInit {
    public form: FormGroup;
    
    public validation_messages: any;
    constructor(private builder: FormBuilder, private notifyService: NotifyService, private router: Router) {}

    ngOnInit() {
        this.initValidationMessages();
        const matchingPasswordsGroup = new FormGroup(
            {
                password: new FormControl(
                    "",
                    Validators.compose([
                        Validators.required,
                        Validators.minLength(6),
                        Validators.maxLength(25),
                        Validators.pattern("^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])[a-zA-Z0-9!@#$%^&*()]+$")
                    ])
                ),
                confirmPassword: new FormControl("", [Validators.required])
            },
            (formGroup: FormGroup) => {
                return PasswordsValidator.areEqual(formGroup);
            }
        );

        this.form = this.builder.group(
            {
                name: ["", Validators.compose([
                    UsernameValidator.validUsername,
                    Validators.maxLength(25),
                    Validators.minLength(2),
                    Validators.pattern(/^[a-zA-Zа-яА-Я0-9іІїЇєЄ\'\"]*(?:[\s.]*[a-zA-Zа-яА-Я0-9іІїЇєЄ\'\"]*)*$/),
                    Validators.required
                ])],
                email: ["",  Validators.compose([
                    Validators.required,
                    Validators.pattern(/[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+\.[a-zA-Z]{2,}$/)
                ])],
                matchingPasswordsGroup: matchingPasswordsGroup,
                acceptAgreement: [false, Validators.requiredTrue]
            },
            { updateOn: "change" }
        );
    }

    formSubmit(event): void {
       event.preventDefault();
        this.notifyService.success("Resgistration successful. Please check mail box to confirm your email", { autoClose: true, keepAfterRouteChange: false })
        setTimeout(() => { this.router.navigate(['/preferences'], { skipLocationChange: true }); }, 5000);
    }

    isInvalid(control: AbstractControl):boolean {
        return control.invalid && control.touched
    }
    public get messages() {
        return this.validation_messages;
    }
    initValidationMessages() {
        this.validation_messages = {
            name: [
                { type: "required", message: "Name is required" },
                { type: "minlength", message: "Name must be at least 2 characters long" },
                { type: "maxlength", message: "Name cannot be more than 25 characters long" },
                { type: "pattern", message: "Your name must contain only numbers and letters" },
                { type: "validName", message: "Your name has already been taken" }
            ],
            email: [
                { type: "required", message: "Email is required" },
                { type: "pattern", message: "Enter a valid email" }
            ],
            confirm_password: [
                { type: "required", message: "Confirm password is required" },
                { type: "areEqual", message: "Password mismatch" }
            ],
            password: [
                { type: "required", message: "Password is required" },
                { type: "minlength", message: "Password must be at least 6 characters long" },
                { type: "pattern", message: "Your password must contain at least one uppercase, one lowercase, and one number, only latin letters" }
            ],
            terms: [{ type: "pattern", message: "You must accept terms and conditions" }]
        };
    }
}
