import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {LocationRepository} from "../../core/club/location/location.repository";
import {Location} from "../../core/club/location/location";
import {Location as AngularLocation} from "@angular/common";
import {GroupRepository} from "../../core/league/group/group.repository";
import {Group} from "../../core/league/group/group";
import {LeagueRepository} from "../../core/league/league.repository";
import {League} from "../../core/league/league";

@Component({
  selector: 'app-create-group',
  templateUrl: './create-group.component.html',
  styleUrls: ['./create-group.component.scss']
})
export class CreateGroupComponent implements OnInit {

  errorText: string = "S\'han d\'introduir valors correctes";
  errorMessage?: string;
  locationForm: FormGroup = new FormGroup<any>([]);

  leaguesList?: League[];

  constructor(private fb: FormBuilder,
              private groupRepo: GroupRepository,
              private leagueRepo: LeagueRepository,
              private angularLocation: AngularLocation) {
  }

  ngOnInit() {
    this.locationForm = this.fb.group({
      league: ['', Validators.required]
    });
    this.leagueRepo.getList().subscribe(leagues => {
      this.leaguesList = leagues;
    });
  }

  onSubmit(): void {
    let league = this.locationForm!.value.league;

    let group = new Group(0, league);
    this.groupRepo.create(group).subscribe({
      next: group => {
        this.angularLocation.back();
      },
      error: error => {
        this.errorMessage = this.errorText;
      }
    });
  }
}
