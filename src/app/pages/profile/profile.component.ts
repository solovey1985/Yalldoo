import { Component, OnInit } from "@angular/core";

@Component({
  selector: "app-profile",
  templateUrl: "./profile.component.html",
  styleUrls: ["./profile.component.scss"]
})
export class ProfileComponent implements OnInit {

    data: Date = new Date();

    constructor() { }

    ngOnInit() {
        const body = document.getElementsByTagName("body")[0];
        body.classList.add("profile-page");
        const navbar = document.getElementsByTagName("nav")[0];
        navbar.classList.add("navbar-transparent");
        navbar.classList.add("bg-danger");
    }
    ngOnDestroy() {
        const body = document.getElementsByTagName("body")[0];
        body.classList.remove("profile-page");
        const navbar = document.getElementsByTagName("nav")[0];
        navbar.classList.remove("navbar-transparent");
        navbar.classList.remove("bg-danger");
    }

}
