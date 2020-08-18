import { Injectable } from "@angular/core";
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree, Router } from "@angular/router";
import { Observable } from "rxjs";
import { AppState, selectAuthState } from "app/_store/app.states";
import { Store } from "@ngrx/store";
import { User } from "app/_models/user/user.model";
import { LogoutAction } from "app/_store/actions/user.actions";

@Injectable({
    providedIn: "root"
})
export class AuthGuard implements CanActivate {
  isLogedIn = false;
  constructor(
    private router: Router,
    private store: Store<AppState>) {
    this.store.select(selectAuthState).subscribe(state => this.isLogedIn = state.isAuthenticated);
  }
    canActivate(next: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean {
      if (this.isLogedIn) {
        return true;
      }
      else {
        this.store.dispatch(new LogoutAction());
        this.router.navigate(['/login'], { queryParams: { returnUrl: state.url } });
        return false;
      }
    }
}
