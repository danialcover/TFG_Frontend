import {Profile} from "../profile/profile";
import {LocalStorageService} from "./local-storage-service";

export class Utils {
  private static localStorageService: LocalStorageService = new LocalStorageService();

  public static ADMIN_ROLE = 1;
  public static MANAGER_ROLE = 2;
  public static REFEREE_ROLE = 3;

  public static getProfile() {
    let profile = this.localStorageService.getItem('profile');
    if (profile) {
      let parsedProfile = JSON.parse(profile);
      return new Profile(parsedProfile.id, parsedProfile.roles, parsedProfile.email, parsedProfile.firstName, parsedProfile.lastName);
    }
    return null;
  }

  public static getRole(role: number) {
    let profile = this.getProfile();
    if (profile) {
      return profile.roles?.includes(role);
    }
    return false;
  }
}
