import { Component, OnInit, ViewChild, ElementRef } from "@angular/core";
import { FormBuilder, FormGroup, Validators, FormControl, AbstractControl } from "@angular/forms";
import { PasswordsValidator } from "app/core/form-validators/passwords.validator";
import { UsernameValidator } from "app/core/form-validators/username.validator";

@Component({
    selector: "app-register",
    templateUrl: "./register.component.html",
    styleUrls: ["./register.component.scss"]
})
export class RegisterComponent implements OnInit {
    public form: FormGroup;
    data: Date = new Date();
    public validation_messages: any;
    @ViewChild("registerForm")
    formElement: ElementRef;

    constructor(private builder: FormBuilder) {}

    ngOnInit() {
        this.initValidationMessages();
        const matchingPasswordsGroup = new FormGroup(
            {
                password: new FormControl(
                    "",
                    Validators.compose([
                        Validators.required,
                        Validators.minLength(6),
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
                    Validators.pattern('^(?=.*[a-zA-Z])[a-zA-Z0-9]+$'),
                    Validators.required
                ])],
                email: ["",  Validators.compose([
                    Validators.required,
                    Validators.pattern('^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+.[a-zA-Z0-9-.]+$')
                ])],
                matchingPasswordsGroup: matchingPasswordsGroup,
                acceptAgreement: [false, Validators.requiredTrue]
            },
            { updateOn: "change" }
        );
    }

    formSubmit($event): void {
       
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
                { type: "minlength", message: "Password must be at least 5 characters long" },
                { type: "pattern", message: "Your password must contain at least one uppercase, one lowercase, and one number" }
            ],
            terms: [{ type: "pattern", message: "You must accept terms and conditions" }]
        };
    }
}
