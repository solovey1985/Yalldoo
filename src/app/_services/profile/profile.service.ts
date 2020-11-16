import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import UserInformation from "app/_models/user/user-information.model";
import { Observable } from "rxjs";
import { Config } from "../../_configs/config";
@Injectable({
    providedIn: "root"
})
export class ProfileService {
    constructor(private http: HttpClient) {}

    public loadCurrentProfile(): Observable<UserInformation> {
        const profileUrl = `${Config.apiUrl}/profile`;
        return this.http.get<any>(profileUrl).map((response) => {
            if (response && response.data) {
                return response.data as UserInformation;
            }
        });
    }

    private saveCurrentProfile() {}
}
