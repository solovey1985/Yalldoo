import { Component, OnInit } from "@angular/core";

@Component({
  selector: "app-twitter",
  templateUrl: "./twitter.component.html",
  styleUrls: ["./twitter.component.scss"]
})
export class TwitterComponent implements OnInit {

    data: Date = new Date();

    constructor() { }

    ngOnInit() {
        const body = document.getElementsByTagName("body")[0];
        body.classList.add("twitter-redesign");
        const navbar = document.getElementsByTagName("nav")[0];
        navbar.classList.add("navbar-transparent");
        navbar.classList.add("bg-danger");
    }
    ngOnDestroy() {
        const body = document.getElementsByTagName("body")[0];
        body.classList.remove("twitter-redesign");
        const navbar = document.getElementsByTagName("nav")[0];
        navbar.classList.remove("navbar-transparent");
        navbar.classList.remove("bg-danger");
    }
}
