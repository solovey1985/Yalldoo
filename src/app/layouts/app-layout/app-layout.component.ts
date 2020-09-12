import { Component, OnInit } from "@angular/core";
import { AuthService } from "app/_services/auth/auth.service";
import { Subject, Observable } from "rxjs";
import { User } from "app/_models/user/user.model";
import { AppState, selectAuthUser } from "app/_store/app.states";
import { Store } from "@ngrx/store";

@Component({
  selector: "app-app-layout",
  templateUrl: "./app-layout.component.html",
  styleUrls: ["./app-layout.component.scss"]
})
export class AppLayoutComponent implements OnInit {

  public user: User;
  user$: Observable<User>;
  constructor(private store: Store<AppState>) {
    this.user$ = this.store.select(selectAuthUser);
   }

  ngOnInit(): void {
    this.user$.subscribe(usr => this.user = usr);
  }

}
