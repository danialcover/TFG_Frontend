import {Component} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {Location as AngularLocation} from "@angular/common";
import {TeamRepository} from "../../core/club/team/team.repository";
import {Team} from "../../core/club/team/team";
import {ClubRepository} from "../../core/club/club.repository";
import {Club} from "../../core/club/club";

@Component({
  selector: 'app-create-team',
  templateUrl: './create-team.component.html',
  styleUrls: ['./create-team.component.scss']
})
export class CreateTeamComponent {

  errorText: string = "S\'han d\'introduir valors correctes";
  errorMessage?: string;
  form: FormGroup = new FormGroup<any>([]);

  clubList?: Club[];

  constructor(private fb: FormBuilder,
              private teamRepo: TeamRepository,
              private clubRepo: ClubRepository,
              private angularLocation: AngularLocation) {
  }

  ngOnInit() {
    this.form = this.fb.group({
      name: ['', Validators.required],
      club: ['', Validators.required]
    });
    this.clubRepo.getList().subscribe(clubs => {
      this.clubList = clubs;
    });
  }

  onSubmit(): void {
    let name = this.form.value.name;
    let club = this.form.value.club;

    let team = new Team(0, name, club);
    this.teamRepo.create(team).subscribe({
      next: team => {
        this.angularLocation.back();
      },
      error: error => {
        this.errorMessage = this.errorText;
      }
    });
  }
}
