import { Component, OnInit } from "@angular/core";
import { ModalService } from "app/_services/modal/modal.service";

@Component({
  selector: "app-friends",
  templateUrl: "./friends.component.html",
  styleUrls: ["./friends.component.scss"]
})
export class FriendsComponent implements OnInit {

  constructor(
      private modal: ModalService
  ) {  }
  onImportFriendsFacebookClick(): void {
    this.modal.openFacebookFriendsImport();
  }
  ngOnInit(): void {
  }

}
