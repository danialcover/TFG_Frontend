import {Component} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {Location as AngularLocation} from "@angular/common";
import {TeamRepository} from "../../core/club/team/team.repository";
import {Team} from "../../core/club/team/team";
import {ClubRepository} from "../../core/club/club.repository";
import {Club} from "../../core/club/club";

@Component({
  selector: 'app-create-team',
  templateUrl: './create-club.component.html',
  styleUrls: ['./create-club.component.scss']
})
export class CreateClubComponent {

  errorText: string = "S\'han d\'introduir valors correctes";
  errorMessage?: string;
  form: FormGroup = new FormGroup<any>([]);

  constructor(private fb: FormBuilder,
              private clubRepo: ClubRepository,
              private angularLocation: AngularLocation) {
  }

  ngOnInit() {
    this.form = this.fb.group({
      name: ['', Validators.required]
    });
  }

  onSubmit(): void {
    let name = this.form!.value.name;
    let club = new Club(0, name);
    this.clubRepo.create(club).subscribe({
      next: club => {
        this.angularLocation.back();
      },
      error: error => {
        this.errorMessage = this.errorText;
      }
    });
  }
}
