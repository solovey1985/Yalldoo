import { ThrowStmt } from '@angular/compiler';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { AuthService } from 'app/_services/auth/auth.service';
import { ProfileService } from 'app/_services/profile/profile.service';
import { LoadingFinishedAction, LoadingStartedAction } from 'app/_store/actions/ui.actions';
import { LoginAction } from 'app/_store/actions/user.actions';
import { AppState } from 'app/_store/app.states';

@Component({
  selector: 'app-redirect',
  templateUrl: './redirect.component.html',
  styleUrls: ['./redirect.component.scss']
})
export class RedirectComponent implements OnInit {

  constructor(private authServie: AuthService, private router: Router, private store: Store<AppState>, private profileService: ProfileService) { }

  ngOnInit(): void {
    this.store.dispatch(new LoadingStartedAction());
    if (this.authServie.getToken() == undefined) {
      this.store.dispatch(new LoadingFinishedAction());
      this.authServie.logout();
    } else {
      this.profileService.loadCurrentProfile().subscribe(x => {
        if (x.favoriteCategories == null || x.favoriteCategories.length == 0) {
          this.store.dispatch(new LoadingFinishedAction());
          this.router.navigate(['/preferences'])
        }
        else {
          this.store.dispatch(new LoadingFinishedAction());
          this.router.navigate(['/feed']);
        }
      },
        err => {
          this.store.dispatch(new LoadingFinishedAction());
          this.router.navigate['/preferences']
        })
    }
  }
}
