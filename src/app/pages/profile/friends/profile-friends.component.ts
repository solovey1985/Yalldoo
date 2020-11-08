import { Component, OnInit } from "@angular/core";
import { getFriendsMock } from "./friendsMock";
import { Router } from "@angular/router";

@Component({
    selector: "app-profile-friends",
    templateUrl: "./profile-friends.component.html",
    styleUrls: ["./profile-friends.component.scss"]
})
export class ProfileFriendsComponent implements OnInit {
    public friends: any[] = [];

    constructor(private router: Router) { }

    ngOnInit() {
        this.friends = getFriendsMock();
    }

    onGoToAllFriends() {
        this.router.navigate(["friends"]);
    }
}
