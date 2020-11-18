import { Component, OnInit } from "@angular/core";
import { FormGroup, FormBuilder, Validators, AbstractControl} from "@angular/forms";
import { NotifyService } from "app/services/notify-service/notify.service";
import { Router, ActivatedRoute } from "@angular/router";
import { ThrowStmt } from "@angular/compiler";
import { timeout } from "rxjs/operators";
import { ValidationService } from "app/_services/validation/validation.service";
import { HttpClient } from "@angular/common/http";
import { Store } from "@ngrx/store";
import { AppState } from "app/_store/app.states";
import { LoginAction } from "app/_store/actions/user.actions";
import { LoadingStartedAction } from "app/_store/actions/ui.actions";

@Component({
    selector: "app-login",
    templateUrl: "./login.component.html",
    styleUrls: ["./login.component.scss"]
})
export class LoginComponent implements OnInit {
    public form: FormGroup;
    validation_messages: any;
    returnUrl: string;
    constructor(
        private builder: FormBuilder,
        private notifyService: NotifyService,
        private store: Store<AppState>,
        private router: Router,
        private route: ActivatedRoute
    ) {}

    ngOnInit() {
        this.form = this.builder.group({
            email: ["", Validators.compose([Validators.required, ValidationService.emailPatternValidator])],
            password: ["", Validators.compose([Validators.required, Validators.minLength(6), Validators.maxLength(25)])]
        });
        this.returnUrl = this.route.snapshot.queryParams["returnUrl"] || "/feed";
    }
    onSubmit() {
        const payload = { email: this.form.get("email").value, password: this.form.get("password").value, returnUrl: this.returnUrl };
        this.store.dispatch(new LoginAction(payload));
    }
    isInvalid(control: AbstractControl): boolean {
        return control.invalid && control.touched
    }
    ngOnDestroy() {}
}
