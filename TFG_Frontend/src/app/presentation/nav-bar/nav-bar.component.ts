import {Component} from '@angular/core';
import {Router} from "@angular/router";
import {Profile} from "../../core/profile/profile";
import {LocalStorageService} from "../../core/main/local-storage-service";
import {Utils} from "../../core/main/utils";

@Component({
  selector: 'app-nav-bar',
  templateUrl: './nav-bar.component.html',
  styleUrls: ['./nav-bar.component.scss']
})
export class NavBarComponent {

  constructor(private router: Router,
              private localStorageService: LocalStorageService) {
  }

  logout() {
    this.localStorageService.removeItem('token');
    this.localStorageService.removeItem('profile');
    this.router.navigate(['/']);
  }

  protected readonly Utils = Utils;
}
