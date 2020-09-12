import { Component, OnInit, Input, Output, EventEmitter } from "@angular/core";
import { FriendsService } from "app/_services/friends/friends.service";
import { FirendListItem } from "app/_models/friends/friend-list-item.model";
import { MultiselectItem } from "app/_models/multiselect/multiselect.model";
import { Subject } from "rxjs";
import { debounceTime, distinctUntilChanged } from "rxjs/operators";

@Component({
    selector: "friends-import-facebook-modal",
    templateUrl: "./friends-import-facebook-modal.component.html",
    styleUrls: ["./friends-import-facebook-modal.component.scss"]
})
export class FriendsImportFacebookModalComponent implements OnInit {
    constructor() {
    }

    ngOnInit(): void {

    }
}
