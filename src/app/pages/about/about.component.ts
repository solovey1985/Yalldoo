import { Component, OnInit, OnDestroy } from "@angular/core";
import * as Rellax from "rellax";

@Component({
    selector: "app-about",
    templateUrl: "./about.component.html",
    styleUrls: ["./about.component.scss"]
})
export class AboutComponent implements OnInit, OnDestroy {
    data: Date = new Date();

    constructor() {}

    ngOnInit() {
        const rellaxHeader = new Rellax(".rellax-header");
        const body = document.getElementsByTagName("body")[0];
        body.classList.add("blog-post");
    }
    ngOnDestroy() {
        const body = document.getElementsByTagName("body")[0];
        body.classList.remove("blog-post");
    }
}
