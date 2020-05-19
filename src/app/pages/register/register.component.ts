import { Component, OnInit, ViewChild, ElementRef } from "@angular/core";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";

@Component({
    selector: "app-register",
    templateUrl: "./register.component.html",
    styleUrls: ["./register.component.scss"]
})
export class RegisterComponent implements OnInit {
    public form: FormGroup;
    data: Date = new Date();

    @ViewChild("registerForm")
    formElement: ElementRef;
    
    constructor(private builder: FormBuilder) {}

    ngOnInit() {
        this.form = this.builder.group({
            name: ["", [Validators.required, Validators.minLength(2)]],
            email: ["", [Validators.required, Validators.email]],
            password: ["", [Validators.required, Validators.minLength(6)]],
            confirmPassword: ["", [Validators.required, Validators.minLength(6)]],
            acceptAgreement: [false, Validators.requiredTrue]
        },{updateOn: "change"});
    }

    formSubmit($event): void {
        $event.preventDefault();
        this.formElement.nativeElement.addClass('was-validated');
    }
}
