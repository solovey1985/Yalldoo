import { Component, OnInit } from "@angular/core";
import { FormGroup, FormBuilder, Validators } from "@angular/forms";
import { NotifyService } from "app/services/notify-service/notify.service";
import { Router } from "@angular/router";
import { ThrowStmt } from "@angular/compiler";
import { timeout } from "rxjs/operators";
import { ValidationService } from "app/_services/validation/validation.service";
import { HttpClient } from "@angular/common/http";
import { Store } from "@ngrx/store";
import { AppState } from "app/_store/app.states";
import { LoginAction } from "app/_store/actions/user.actions";

@Component({
    selector: "app-login",
    templateUrl: "./login.component.html",
    styleUrls: ["./login.component.scss"]
})
export class LoginComponent implements OnInit {
    public form: FormGroup;
    validation_messages: any;

    constructor(
        private builder: FormBuilder,
        private notifyService: NotifyService,
        private store: Store<AppState>,
        private router: Router,
        private httpClient: HttpClient
    ) {}

    ngOnInit() {
        this.form = this.builder.group({
            email: ["", Validators.compose([Validators.required, ValidationService.emailPatternValidator])],
            password: ["", Validators.compose([Validators.required, Validators.minLength(6), Validators.maxLength(25)])]
        });
    }
    onSubmit() {
        const payload = { email: this.form.get("email").value, password: this.form.get("password").value };
        this.store.dispatch(new LoginAction(payload));
    }
    ngOnDestroy() {}
}
