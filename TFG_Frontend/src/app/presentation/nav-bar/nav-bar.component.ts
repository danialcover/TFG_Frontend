import {Component} from '@angular/core';
import {Router} from "@angular/router";
import {Profile} from "../../core/profile/profile";
import {LocalStorageService} from "../../core/main/local-storage-service";

@Component({
  selector: 'app-nav-bar',
  templateUrl: './nav-bar.component.html',
  styleUrls: ['./nav-bar.component.scss']
})
export class NavBarComponent {

  protected ADMIN_ROLE = 1;
  protected MANAGER_ROLE = 2;
  protected REFEREE_ROLE = 3;

  constructor(private router: Router,
              private localStorageService: LocalStorageService) {
  }

  logout() {
    this.localStorageService.removeItem('token');
    this.localStorageService.removeItem('profile');
    this.router.navigate(['/']);
  }

  getProfile() {
    let profile = this.localStorageService.getItem('profile');
    if (profile) {
      let parsedProfile = JSON.parse(profile);
      return new Profile(parsedProfile.id, parsedProfile.roles, parsedProfile.user.email, parsedProfile.user.first_name, parsedProfile.user.last_name);
    }
    return null;
  }

  getRole(role: number) {
    let profile = this.getProfile();
    if (profile) {
      return profile.roles?.includes(role);
    }
    return false;
  }
}
