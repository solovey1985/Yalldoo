import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { Config } from "../../_configs/config";
import { Observable } from "rxjs";
import { User } from "app/_models/user/user.model";
@Injectable({ providedIn: "root" })
export class AuthService {
    private BASE_URL = Config.apiUrl;
    constructor(private http: HttpClient) {}

    getToken(): string{
        let user = JSON.parse(localStorage.getItem('user'));
        if (user) {
            return user.token;
        }
        else {
            return undefined;
        }
    }

    logIn(email: string, password: string): Observable<User> {
        const url = `${this.BASE_URL}/account/login`;
        return this.http.post<User>(url, { email, password });
    }

    signUp(email: string, password: string): Observable<User> {
        const url = `${this.BASE_URL}/register`;
        return this.http.post<User>(url, { email, password });
    }

    logout() {
        localStorage.removeItem("user");
    }
}
