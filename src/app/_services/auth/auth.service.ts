import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { Config } from "../../_configs/config";
import { Observable } from "rxjs";
import { User } from "app/_models/user/user.model";
import { UserRegisterModel } from "app/_models/user/user-register.model";
import { Router } from "@angular/router";
@Injectable({ providedIn: "root" })
export class AuthService {
    private BASE_URL = Config.apiUrl;
    constructor(private http: HttpClient, private router: Router) {}

    getToken(): string {
        const user = JSON.parse(localStorage.getItem("user"));
        if (user) {
            return user.token;
        } else {
            return undefined;
        }
    }

    logIn(email: string, password: string): Observable<User> {
        const url = `${this.BASE_URL}/account/login`;
        return this.http.post<User>(url, { email, password });
    }

    register(regiser: UserRegisterModel): Observable<User> {
        const payload = JSON.stringify(regiser)
        const url = `${this.BASE_URL}/account/register`;
        return this.http.post<User>(url, payload);
    }

    logout() {
        localStorage.removeItem("user");
        this.router.navigate(['/login']);
    }
}
