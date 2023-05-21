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

  profile? : Profile;

  constructor(private router: Router,
              private localStorageService: LocalStorageService) {
  }

  logout() {
    delete this.profile;
    this.localStorageService.removeItem('token');
    this.localStorageService.removeItem('profile');
    this.router.navigate(['/']);
  }

  getProfile() {
    let profile = this.localStorageService.getItem('profile');
    if (profile) {
      let parsedProfile = JSON.parse(profile);
      this.profile = new Profile(parsedProfile.id, parsedProfile.roles, parsedProfile.email, parsedProfile.firstName, parsedProfile.lastName);
      return this.profile;
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
