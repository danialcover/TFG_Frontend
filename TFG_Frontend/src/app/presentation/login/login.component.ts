import {Component} from '@angular/core';
import {ProfileRepository} from "../../core/profile/profile.repository";
import {Credentials} from "../../core/profile/credentials";
import {Router} from "@angular/router";
import {LocalStorageService} from "../../core/main/local-storage-service";
import {HttpErrorResponse} from "@angular/common/http";

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent {
  username?: string;
  password?: string;
  errorText: string = 'Les Credencials introduïdes són invàlides';
  errorMessage?: string;

  constructor(private profileRepo: ProfileRepository,
              private router: Router,
              private localStorageService: LocalStorageService) {
  }

  login() {
    this.errorMessage = undefined;
    console.log("boton login presionado");
    if (this.username && this.password) {
      let data: Credentials = new Credentials(this.username, this.password);
      this.profileRepo.login(data).subscribe((data: any) => {
          this.localStorageService.setItem('token', data.token);
          this.localStorageService.setItem('profile', JSON.stringify(data.profile));
          this.router.navigate(['/']);
        },
        (error: HttpErrorResponse) => {
          this.errorMessage = this.errorText;
        });
    }
  }
}
