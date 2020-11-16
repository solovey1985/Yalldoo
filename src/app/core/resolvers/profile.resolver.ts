import { Injectable } from '@angular/core';
import { Resolve, ActivatedRouteSnapshot } from '@angular/router';
import UserInformation from 'app/_models/user/user-information.model';
import { Observable } from 'rxjs';
import { ProfileService } from '../../_services/profile/profile.service';

@Injectable({ providedIn: 'root' })
export class ProfileResolver implements Resolve<UserInformation> {
    
    constructor(private profileService: ProfileService) {
        
        
    }
    resolve(route: ActivatedRouteSnapshot,): Observable<UserInformation> {
        return this.profileService.loadCurrentProfile();
    }
}