import { Component, OnInit, ElementRef, ChangeDetectionStrategy } from "@angular/core";
import { Location, LocationStrategy, PathLocationStrategy } from "@angular/common";
import { Observable } from "rxjs";
import { User } from "app/_models/user/user.model";
import { AppState, selectAuthUser } from "app/_store/app.states";
import { Store } from "@ngrx/store";
import { LogoutAction } from "app/_store/actions/user.actions";

@Component({
    selector: "app-app-navbar",
    templateUrl: "./app-navbar.component.html",
    styleUrls: ["./app-navbar.component.scss"],
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class AppNavbarComponent implements OnInit {
    private toggleButton: any;
    private sidebarVisible: boolean;
    public user: User;
    user$: Observable<User>;
    constructor(public location: Location, private element: ElementRef, private store: Store<AppState>) {
        this.sidebarVisible = false;
        this.user$ = this.store.select(selectAuthUser);
    }

    ngOnInit() {
        const navbar: HTMLElement = this.element.nativeElement;
        this.toggleButton = navbar.getElementsByClassName("navbar-toggler")[0];
        this.user$.subscribe(usr => this.user = usr);
    }
    sidebarOpen() {
        const toggleButton = this.toggleButton;
        const html = document.getElementsByTagName("html")[0];
        setTimeout(function () {
            toggleButton.classList.add("toggled");
        }, 500);
        html.classList.add("nav-open");

        this.sidebarVisible = true;
    }
    sidebarClose() {
        const html = document.getElementsByTagName("html")[0];
        // console.log(html);
        this.toggleButton.classList.remove("toggled");
        this.sidebarVisible = false;
        html.classList.remove("nav-open");
    }
    sidebarToggle() {
        if (this.sidebarVisible === false) {
            this.sidebarOpen();
        } else {
            this.sidebarClose();
        }
    }
    isHome() {
        var titlee = this.location.prepareExternalUrl(this.location.path());

        if (titlee === "/home") {
            return true;
        } else {
            return false;
        }
    }

    onLogout() {
        debugger
        this.store.dispatch(new LogoutAction())
    }

    isDocumentation() {
        var titlee = this.location.prepareExternalUrl(this.location.path());
        if (titlee === "/documentation") {
            return true;
        } else {
            return false;
        }
    }
}
