import { Component, OnInit, Input, Output, EventEmitter } from "@angular/core";
import { FriendsService } from "app/_services/friends/friends.service";
import { FirendListItem } from "app/_models/friends/friend-list-item.model";
import { MultiselectItem } from "app/_models/multiselect/multiselect.model";
import { Subject } from "rxjs";
import { debounceTime, distinctUntilChanged } from "rxjs/operators";

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

    friends: Array<FirendListItem>;
    selectedFriends = new Array<FirendListItem>();
    searchTerm: string;
    searchTermUpdates = new Subject<string>();
    constructor(private friendsService: FriendsService) {
        
        this.friends = this.friendsService.getFriends();
        this.searchTermUpdates.pipe(
            debounceTime(500),
            distinctUntilChanged()
        ).subscribe(value => {
            if (value.length > 0) {
                this.friends = this.friendsService.getFriends().filter(x => x.fullName.indexOf(value) > -1);
            }
            else {
                this.friends = this.friendsService.getFriends();
            }
        });
    }

    ngOnInit(): void {
        
    }

    onInviteClick(item: FirendListItem) {
        let index = this.selectedFriends.indexOf(item);
        if (index > -1) {
            this.selectedFriends.splice(index, 1);
        }
        else {
            this.selectedFriends.push(item);
        }
    }

    isSelected(id: number) {
        return this.selectedFriends.find(x => x.id === id) !== undefined;
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
  
}
