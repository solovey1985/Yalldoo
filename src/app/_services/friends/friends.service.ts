import { Injectable } from "@angular/core";
import { FirendListItem } from "app/_models/friends/friend-list-item.model";

const friends: Array<FirendListItem> = [
    new FirendListItem(1, "Ronald", "Calvert"),
    new FirendListItem(2, "Debra", "Frost"),
    new FirendListItem(3, "Donna", "Stewart"),
    new FirendListItem(4, "Randy", "Brown"),
    new FirendListItem(5, "Richard", "Gregory"),
    new FirendListItem(6, "Ian", "McKeen"),
    new FirendListItem(7, "Daniel", "Brown"),
    new FirendListItem(8, "Jani", "Bussey"),
    new FirendListItem(9, "Bridgette", "Barnes")
];

@Injectable({
    providedIn: "root"
})
export class FriendsService {
    selectedFriends: Array<FirendListItem>;
    constructor() {
        this.selectedFriends = new Array<FirendListItem>();
    }

    public getFriends() {
        return friends;
    }

    public addSelectedFriend(friend: FirendListItem) {
        if (this.selectedFriends.indexOf(friend) === -1) {
            this.selectedFriends.push(friend);
        }
    }
}
