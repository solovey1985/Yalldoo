import { Component, OnInit, ChangeDetectionStrategy, Input, OnDestroy } from "@angular/core";
import { Alert, AlertType } from "app/services/notify-service/alert.model";
import { Subscription, Observable } from "rxjs";
import { NotifyService } from "app/services/notify-service/notify.service";
import { Router, NavigationStart } from "@angular/router";
import { Store } from "@ngrx/store";
import { AppState, selectIsLoading } from "app/_store/app.states";

@Component({
    selector: "app-notify",
    templateUrl: "./notify.component.html",
    styleUrls: ["./notify.component.scss"]
})
export class NotifyComponent implements OnInit, OnDestroy {
    @Input()
    id = "default-alert";
    @Input()
    fade = true;

    private _alerts: Alert[];
    alertSubscription: Subscription;
    routeSubscription: Subscription;
    isLoading: boolean;
    uiState$: Observable<boolean>
    constructor(private router: Router, private notifyservcie: NotifyService, private strore: Store<AppState>) {
        this._alerts = new Array<Alert>();
        this.uiState$ = this.strore.select(selectIsLoading);
    }

    public get alerts(): Alert[] {
        return this._alerts;
    }

    ngOnInit(): void {
        this.alertSubscription = this.notifyservcie.onAlert(this.id).subscribe((alert) => {
            if (!alert.message) {
                this._alerts = this._alerts.filter((x) => x.keepAfterRouteChange);
                this._alerts.forEach((x) => delete x.keepAfterRouteChange);
                return;
            }
            this._alerts.push(alert);
            if (alert.autoClose) {
                setTimeout(() => this.removeAlert(alert), 3000);
            }
        });

        this.routeSubscription = this.router.events.subscribe((event) => {
            if (event instanceof NavigationStart) {
                this.notifyservcie.clear(this.id);
            }
        });

        this.uiState$.subscribe((status: boolean) => {
            this.isLoading = status;
        })
    }

    ngOnDestroy() {
        this.alertSubscription.unsubscribe();
        this.routeSubscription.unsubscribe();
    }

    removeAlert(alert: Alert) {
        if (!this._alerts.includes(alert)) return;

        if (this.fade) {
            this._alerts.find((x) => x === alert).fade = true;
            setTimeout(() => {
                this._alerts = this._alerts.filter((x) => x !== alert);
            }, 250);
        } else {
            this._alerts = this._alerts.filter((x) => x !== alert);
        }
    }

    cssClass(alert: Alert) {
        if (!alert) return;

        const classes = ["alert", "alert-dismissable"];
        const alertTypeClass = {
            [AlertType.Success]: "alert alert-success",
            [AlertType.Error]: "alert alert-danger",
            [AlertType.Info]: "alert alert-info",
            [AlertType.Warning]: "alert alert-warning"
        };

        classes.push(alertTypeClass[alert.type]);
        if (alert.fade) {
            classes.push("fade");
        }
        return classes.join(" ");
    }

    close(alert: Alert) {
        this.removeAlert(alert);
    }

    reset() {}
}
