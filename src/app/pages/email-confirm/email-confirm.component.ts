import { HttpClient } from "@angular/common/http";
import { AfterViewInit, ChangeDetectionStrategy, ChangeDetectorRef, Component, OnInit } from "@angular/core";
import { ActivatedRoute, ParamMap, Router } from "@angular/router";
import { Observable } from "rxjs";
import { combineLatest } from "rxjs/internal/observable/combineLatest";
import { combineAll, finalize, map, mergeAll, switchMap } from "rxjs/operators";
import { Config } from "../../_configs/config";
@Component({
    templateUrl: "./email-confirm.component.html",
    styleUrls: ["./email-confirm.component.scss"],
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class EmailConfirmComponent implements OnInit {
    private email: string;
    public error: string;
    public isloading: boolean = true;
    public isConfirmSuccess: boolean;
    public isResendSuccess: boolean;
    public isNotFound: boolean;
    public isTokenInvalid: boolean;
    constructor(
        private route: ActivatedRoute,
        private http: HttpClient,
        private cdRef: ChangeDetectorRef,
        private router: Router
    ) {}

    ngOnInit(): void {
        const token$: Observable<string> = this.route.queryParamMap.pipe(
            map((params: ParamMap) => params.get("token"))
        );
        const email$: Observable<string> = this.route.queryParamMap.pipe(
            map((params: ParamMap) => params.get("email"))
        );

        combineLatest([email$, token$])
            .pipe(
                switchMap(([email, token]) => {
                    const url = `${Config.apiUrl}/account/email/confirm`;
                    this.email = email;
                    return this.http.post(url, { email: email, token: token });
                })
            )
            .subscribe(
                (data: any) => {
                    this.isloading = false;
                    this.isConfirmSuccess = true;
                    this.cdRef.detectChanges();
                },
                (err) => {
                    this.error = err.error;
                    this.isloading = false;
                    this.isConfirmSuccess = false;
                    this.checkError(err.error);
                    this.cdRef.detectChanges();
                }
            );
    }

    goToApp() {
        this.router.navigate(["/redirect"]);
    }

    gotToSignUp() {
        this.router.navigate(["/register"]);        
    }

    resendEmail() {
        const url = `${Config.apiUrl}/account/email/resend`;
        this.isloading = true;
        this.http.post(url, { email: this.email }).subscribe(
            (data) => {
                this.isResendSuccess = true;
                this.resetErrors();
                this.isloading = false;
                this.cdRef.detectChanges();
            },
            (err) => {
                this.isloading = false;
                this.error = err.error;
                this.cdRef.detectChanges();
                this.checkError(err.error);
            },
            () => (this.isloading = false)
        );
    }

    private checkUser(error: string) {
        if (this.error.toLocaleLowerCase().indexOf("not found")) {
            this.isNotFound = true;
        }
    }

    private checkToken(error: string) {
        if (this.error.toLocaleLowerCase().indexOf("token invalid")) {
            this.isNotFound = true;
        }
    }
    private checkError(error: string) {
        if (error.toLocaleLowerCase().indexOf("invalid") > -1) {
            this.isTokenInvalid = true;
        }
        if (error.toLocaleLowerCase().indexOf("not found" ) > -1 || error.toLocaleLowerCase().indexOf("empty") > -1) {
            this.isNotFound = true;
        }
    }
    private resetErrors() {
        this.isNotFound = false;
        this.isTokenInvalid = false;
        this.isConfirmSuccess = false;
    }
}
