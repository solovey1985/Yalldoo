import { Component, OnInit } from "@angular/core";
import { ModalService } from "app/_services/modal/modal.service";
import { NotifyService } from "app/services/notify-service/notify.service";

@Component({
    templateUrl: "./event.component.html",
    styleUrls: ["./event.component.scss"]
})
export class EventComponent implements OnInit {
    date = new Date(2020, 8, 24, 12, 20, 0);
    constructor(private modal: ModalService, private notify: NotifyService) {}
    actionItems = ["Join", "Follow", "Invite"];
    ngOnInit(): void {}

    onActionSelect(item: string) {
        switch (item.toLocaleLowerCase()) {
            case "invite": {
                this.modal.openFriendsPicker().subscribe((x) => {
                    this.notify.success("Friends was invited");
                });
                break;
            }
            case "join": {
                this.notify.success("Yoy have joined");
                break;
            }
          case "follow": {
              this.notify.success("You are following now");
                break;
            }
            default:
                break;
        }
    }
}
