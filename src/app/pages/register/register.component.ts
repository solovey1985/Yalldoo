import { Component, OnInit, ViewChild, ElementRef } from "@angular/core";
import { FormBuilder, FormGroup, Validators, FormControl, AbstractControl } from "@angular/forms";
import { PasswordsValidator } from "app/core/form-validators/passwords.validator";
import { UsernameValidator } from "app/core/form-validators/username.validator";
import { NotifyService } from "app/services/notify-service/notify.service";
import { Router } from "@angular/router";
import { PreferencesComponent } from "../preferences/preferences.component";
import { ValidationService } from "app/_services/validation/validation.service";

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
       event.preventDefault();
        this.notifyService.success("Resgistration successful. Please check mail box to confirm your email", { autoClose: true, keepAfterRouteChange: false })
        setTimeout(() => { this.router.navigate(['/preferences']); }, 5000);
    }

    isInvalid(control: AbstractControl):boolean {
        return control.invalid && control.touched
    }
    
    public get messages() {
        return this.validation_messages;
    }
    
}
