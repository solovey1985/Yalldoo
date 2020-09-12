import { Injectable, Injector } from "@angular/core";
import {
  HttpEvent, HttpInterceptor, HttpHandler, HttpRequest, HttpErrorResponse
} from "@angular/common/http";
import { Observable, throwError } from "rxjs";

import { AuthService } from "../../_services/auth/auth.service";
import { Router } from "@angular/router";

import { catchError } from "rxjs/operators";
import { AppState, selectAuthUser } from "app/_store/app.states";
import { Store } from "@ngrx/store";
import { User } from "app/_models/user/user.model";
import { LogoutAction } from "app/_store/actions/user.actions";


@Injectable()
export class TokenInterceptor implements HttpInterceptor {
  private authService: AuthService;
  constructor(private injector: Injector) {}
  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    this.authService = this.injector.get(AuthService);
    const token: string = this.authService.getToken();
    request = request.clone({
      setHeaders: {
        "Authorization": `Bearer ${token}`,
        "Content-Type": "application/json"
      }
    });
    return next.handle(request);
  }
}

@Injectable()
export class ErrorInterceptor implements HttpInterceptor {
    user: User;
    constructor(private store: Store<AppState>) {
        this.store.select(selectAuthUser).subscribe(u => this.user = u);
    }

    intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        return next.handle(request).pipe(catchError(err => {
            if ([401, 403].includes(err.status) && this.user) {
                this.store.dispatch(new LogoutAction());
            }
          return throwError(err.error);
        }))
    }
}
