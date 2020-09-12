import { Component, OnInit } from "@angular/core";
import { ConditionalExpr } from "@angular/compiler";

@Component({
    selector: "app-quicksort-bar",
    templateUrl: "quicksort-bar.component.html",
    styleUrls: ["quicksort-bar.component.scss"]
})

export class QuicksortBarComponent implements OnInit {
    constructor() { }

    ngOnInit() {
        const tabContainer =  document.querySelector(".js-yld-tabs");
        const tabs = document.querySelectorAll(".js-yld-tab-item");
        tabContainer.addEventListener("click", function(event) {
            event.preventDefault();
            const clickedTab = event.target as HTMLLinkElement ;
            if (clickedTab.classList.contains("active")) {
                return;
            } else {
                tabs.forEach(function(item) {
                    item.classList.remove("active");
                })
                clickedTab.classList.add("active");
            }
        })
    }
}
