import { Injectable } from "@angular/core";
import { FormControl, FormGroup } from "@angular/forms";

@Injectable({
    providedIn: "root"
})
export class ValidationService {
    constructor() {}

    static getValidatorErrorMessage(validatorName: string, validatorValue?: any, controlName?: string) {
        let config = {
            required: " is required",
            pattern: "is not valid",
            invalidNamePattern: " must contain only numbers and letters",
            invalidCreditCard: " is invalid credit card number",
            invalidEmailAddress: " is not valid",
            invalidPhoneFormat: " is not valid",
            mask: "is not valid",
            invalidPassword: " must contain at least one uppercase, one lowercase, and one number, only latin letters",
            minlength: ` must be at least ${validatorValue.requiredLength} characters long`,
            maxlength: `cannot be more than  ${validatorValue.requiredLength} characters long`,
            passwordsInequal: "Passwords are not equal",
            requiredTrue: `${controlName} should be accepted`
        };
        const message = validatorName ? config[validatorName] : "Error in input";
        return message;
    }

    static creditCardValidator(control: FormControl) {
        if (
            control.value.match(
                /^(?:4[0-9]{12}(?:[0-9]{3})?|5[1-5][0-9]{14}|6(?:011|5[0-9][0-9])[0-9]{12}|3[47][0-9]{13}|3(?:0[0-5]|[68][0-9])[0-9]{11}|(?:2131|1800|35\d{3})\d{11})$/
            )
        ) {
            return null;
        } else {
            return { invalidCreditCard: true };
        }
    }

    static emailPatternValidator(control: FormControl) {
        if (
            control.value.match(
                /[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?/
            )
        ) {
            return null;
        } else {
            return { invalidEmailAddress: true };
        }
    }
    static phonePatternValidator(control: FormControl) {
        if (control.value.match(/^[+]*[(]{0,1}[0-9]{1,4}[)]{0,1}[-\s\./0-9]*$/)) {
            return null;
        } else {
            return { invalidPhoneFormat: true };
        }
    }

    static passwordPatternValidator(control:FormControl) {
        if (control.value.match(/^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])[a-zA-Z0-9!@#$%^&*()]+$/)) {
            return null;
        } else {
            return { invalidPassword: true };
        }
    }

    static namePatternValidator(control: FormControl) {
        if (control.value.match(/^[a-zA-Zа-яА-Я0-9іІїЇєЄ\'\"]*(?:[\s.]*[a-zA-Zа-яА-Я0-9іІїЇєЄ\'\"]*)*$/)) {
            return null;
        } else {
            return { invalidNamePattern: true };
        }
    }

    static checkRequired(control: FormControl) {
        if (control.value) {
            return null;
        } else {
            return {
                requiredTrue: true
            };
        }
    }

    static passwordsMatchValidator(formGroup: FormGroup) {
        let value;
        let valid = true;
        for (let key in formGroup.controls) {
            if (formGroup.controls.hasOwnProperty(key)) {
                let control: FormControl = <FormControl>formGroup.controls[key];
                if (value === undefined) {
                    value = control.value;
                } else {
                    if (value !== control.value) {
                        valid = false;
                        break;
                    }
                }
            }
        }
        if (valid) {
            return null;
        }

        return {
            passwordsInequal: true
        };
    }
}
