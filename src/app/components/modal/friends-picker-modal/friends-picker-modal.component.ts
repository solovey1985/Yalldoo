import { Component, OnInit, Input, Output, EventEmitter } from "@angular/core";
import { FriendsService } from "app/_services/friends/friends.service";
import { FirendListItem } from "app/_models/friends/friend-list-item.model";
import { MultiselectItem } from "app/_models/multiselect/multiselect.model";

@Component({
    selector: "app-friends-picker-modal",
    templateUrl: "./friends-picker-modal.component.html",
    styleUrls: ["./friends-picker-modal.component.scss"]
})
export class FriendsPickerModalComponent implements OnInit {
    @Input()
    friendsList: Array<Object>;
    @Output()
    onSubmit: EventEmitter<Array<FirendListItem>> = new EventEmitter<Array<FirendListItem>>();
    @Output()
    onDismiss = new EventEmitter();

    friends: Array<MultiselectItem>;
    selectedFriends: [];
    dropdownSettings: {};

    constructor(private friendsService: FriendsService) {
        
        this.dropdownSettings = {
            text: "Friends",
            selectAllText: "Select All",
            unSelectAllText: "UnSelect All",
            classes: "",
            groupBy: "",
            enableSearchFilter: true,
        };
      this.friends = this.mapToMultiselectItems(this.friendsService.getFriends());
    }

    ngOnInit(): void {
        
    }

    onOkayClick() {
        this.onSubmit.emit(this.selectedFriends);
    }

    onCloseClick() {
        this.onDismiss.emit();
    }
    //---------Multiselect Methods
    onItemSelect(item: any) {
        console.log(item);
    }
    
    onItemDeSelect(item: any) {
        console.log(item);
    }
    
    onSelectAll(items: any) {
        console.log(items); 
    }

    onDeSelectAll(items: any) {
        console.log(items);
    }
  
    mapToMultiselectItems(items: FirendListItem[]): MultiselectItem[] {
        return items.map(x => {
            return {
                id: x.id,
                itemName: x.fullName,
                category: ''
            }
        });
    }
}
