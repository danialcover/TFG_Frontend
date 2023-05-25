import {Component} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {Location as AngularLocation} from "@angular/common";
import {LeagueRepository} from "../../core/league/league.repository";
import {League} from "../../core/league/league";

@Component({
  selector: 'app-create-league',
  templateUrl: './create-league.component.html',
  styleUrls: ['./create-league.component.scss']
})
export class CreateLeagueComponent {
errorText: string = "S\'han d\'introduir valors correctes";
  errorMessage?: string;
  locationForm: FormGroup = new FormGroup<any>([]);
  availableYears: number[] = Array.from({length: 5}, (_, i) => new Date().getFullYear() - i);

  constructor(private fb: FormBuilder,
              private leagueRepo: LeagueRepository,
              private angularLocation: AngularLocation) {
  }

  ngOnInit() {
    this.locationForm = this.fb.group({
      name: ['', Validators.required],
      year: ['', Validators.required]
    });
  }

  onSubmit(): void {
    let name = this.locationForm!.value.name;
    let year = this.locationForm!.value.year;

    let league = new League(0, name, year);
    this.leagueRepo.create(league).subscribe({
      next: league => {
        this.angularLocation.back();
      },
      error: error => {
        this.errorMessage = this.errorText;
      }
    });
  }
}
