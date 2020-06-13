import { Component, OnInit } from "@angular/core";
import { FormGroup, FormBuilder, Validators } from "@angular/forms";

@Component({
    templateUrl: "./event-create.component.html",
    styleUrls: ["./event-create.component.scss"]
})
export class EventCreateComponent implements OnInit {
    dropdownList = [];
    selectedItems = [];
    dropdownSettings = {};

    dropdownList1 = [];
    selectedItems1 = [];
    dropdownSettings1 = {};
    public form: FormGroup;
    constructor(private builder: FormBuilder) {}

    ngOnInit(): void {
        this.form = this.builder.group({
            title: [""],
            description: [""],
            category: [""]
        });
        this.dropdownList = [
            { id: 1, itemName: "Roman", category: "All" },
            { id: 2, itemName: "Paris", category: "All" },
            { id: 3, itemName: "Bucharest", category: "All" },
            { id: 4, itemName: "Rome", category: "All" },
            { id: 5, itemName: "New York", category: "All" },
            { id: 6, itemName: "Miami", category: "All" },
            { id: 7, itemName: "Piatra Neamt", category: "All" },
            { id: 8, itemName: "Paris", category: "All" },
            { id: 9, itemName: "Bucharest", category: "All" },
            { id: 10, itemName: "Rome", category: "All" },
            { id: 11, itemName: "New York", category: "All" },
            { id: 12, itemName: "Miami", category: "My" },
            { id: 13, itemName: "Piatra Neamt", category: "My" }
        ];
        this.selectedItems = [];
        this.dropdownSettings = {
            singleSelection: false,
            text: "Category",
            selectAllText: "Select All",
            unSelectAllText: "UnSelect All",
            enableSearchFilter: true,
            classes: "",
            groupBy: "category"
        };
    }

    onItemSelect(item: any) {
        console.log(item);
        console.log(this.selectedItems);
    }
    OnItemDeSelect(item: any) {
        console.log(item);
        console.log(this.selectedItems);
    }
    onSelectAll(items: any) {
        console.log(items);
    }
    onDeSelectAll(items: any) {
        console.log(items);
    }
}
