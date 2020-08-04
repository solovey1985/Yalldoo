import { Component, OnInit } from "@angular/core";
import { FormGroup, FormBuilder, Validators, FormControl } from "@angular/forms";
import { ValidationService } from "app/_services/validation/validation.service";

@Component({
    selector: "app-settings",
    templateUrl: "./settings.component.html",
    styleUrls: ["./settings.component.scss"]
})
export class SettingsComponent implements OnInit {
    constructor(private fb: FormBuilder) {}
    passwordForm: FormGroup;
    phoneForm: FormGroup;
    emailForm: FormGroup;
    ngOnInit(): void {
        this.initPasswordForm();
        this.initEmailForm();
        this.initPhoneForm();
    }
  
    onPasswordSubmit() {
        console.log("On Password Submit");
    }
  
    onPhoneSubmit() {
        console.log(this.phoneForm.get("newPhone").value);
    }
  
    onEmailSubmit() {

        
    }

    private initPasswordForm(): void {
        const passwordsGroup = new FormGroup(
            {
                newPassword: new FormControl("", [
                    Validators.required,
                    Validators.minLength(6),
                    ValidationService.passwordPatternValidator
                ]),
                confirmPassword: new FormControl("", Validators.required)
            },
            (formGroup: FormGroup) => ValidationService.passwordsMatchValidator(formGroup)
        );
        this.passwordForm = this.fb.group({
            currentPassword: [
                "",
                [
                    Validators.required,
                    Validators.minLength(6),
                    ValidationService.passwordPatternValidator,
                    Validators.maxLength(25)
                ]
            ],
            passwordsGroup: passwordsGroup
        });
    }

    private initEmailForm(): void {
        this.emailForm = this.fb.group({
            currentEmail: ["", [Validators.required, ValidationService.emailPatternValidator]],
            newEmail: ["", [Validators.required, ValidationService.emailPatternValidator]]
        });
    }

    private initPhoneForm(): void {
        this.phoneForm = this.fb.group({
            currentPhone: ["", [Validators.required, ValidationService.phonePatternValidator]],
            newPhone: ["", [Validators.required, ValidationService.phonePatternValidator]]
        });
    }
}
