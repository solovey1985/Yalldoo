import { Component, OnInit } from "@angular/core";
import { FormGroup, FormBuilder, Validators } from "@angular/forms";
import { NotifyService } from "app/services/notify-service/notify.service";
import { Router } from "@angular/router";
import { ThrowStmt } from "@angular/compiler";
import { timeout } from "rxjs/operators";

@Component({
    selector: "app-login",
    templateUrl: "./login.component.html",
    styleUrls: ["./login.component.scss"]
})
export class LoginComponent implements OnInit {
    public form: FormGroup;
    validation_messages: any;
    constructor(private builder: FormBuilder, private notifyService: NotifyService, private router: Router) {}

    ngOnInit() {
        this.form = this.builder.group({
            email: ["", Validators.compose([Validators.required, Validators.pattern(/[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+\.[a-zA-Z]{2,}$/)])],
            password: ["", Validators.compose([Validators.required, Validators.minLength(6), Validators.maxLength(25)])]
        });
        this.initValidationMessages();
    }
    onSubmit() {
        this.notifyService.success("Login successful. Redirecting to your feed. Please, wait...", { autoClose: true, keepAfterRouteChange: true })
        setTimeout(() => { this.router.navigate(['/feed'], { skipLocationChange: true }); }, 1500);
    }
    ngOnDestroy() {}

    initValidationMessages() {
        this.validation_messages = {
            email: [
                { type: "required", message: "Email is required" },
                { type: "pattern", message: "Enter a valid email" }
            ],
            password: [
                { type: "required", message: "Password is required" },
                { type: "minlength", message: "Password must be at least 6 characters long" }
            ],
            terms: [{ type: "pattern", message: "You must accept terms and conditions" }]
        };
    }
}
