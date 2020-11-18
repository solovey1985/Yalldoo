import { Component, OnDestroy, OnInit } from "@angular/core";
import { FormControl } from "@angular/forms";

@Component({
  selector: "app-profile",
  templateUrl: "./profile.component.html",
  styleUrls: ["./profile.component.scss"],
})
export class ProfileComponent implements OnInit, OnDestroy {
    data: Date = new Date();
    canEdit = true;
    entity = {status: "Some status"};
    control: FormControl = new FormControl(this.entity.status);

    get status(): string {
        return this.entity.status || "Click here to add status";
    }
    ngOnInit() {
        const body = document.getElementsByTagName("body")[0];
        body.classList.add("profile-page");
        const navbar = document.getElementsByTagName("nav")[0];
        navbar.classList.add("navbar-transparent");
        navbar.classList.add("bg-danger");
    }

    getStatusControl(): FormControl {
        return this.control;
    }

    updateField() {
        const control = this.getStatusControl();

        if (control.valid) {
            this.entity.status = control.value
        }
    }

    ngOnDestroy() {
        const body = document.getElementsByTagName("body")[0];
        body.classList.remove("profile-page");
        const navbar = document.getElementsByTagName("nav")[0];
        navbar.classList.remove("navbar-transparent");
        navbar.classList.remove("bg-danger");
    }
}
