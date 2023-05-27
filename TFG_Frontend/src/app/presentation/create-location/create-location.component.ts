import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {LocationRepository} from "../../core/club/location/location.repository";
import {Location} from "../../core/club/location/location";
import {Location as AngularLocation} from "@angular/common";

@Component({
  selector: 'app-create-location',
  templateUrl: './create-location.component.html',
  styleUrls: ['./create-location.component.scss']
})
export class CreateLocationComponent implements OnInit {

  errorText: string = "S\'han d\'introduir valors correctes";
  errorMessage?: string;
  locationForm: FormGroup = new FormGroup<any>([]);

  constructor(private fb: FormBuilder,
              private locationRepo: LocationRepository,
              private angularLocation: AngularLocation) {
  }

  ngOnInit() {
    this.locationForm = this.fb.group({
      city: ['', Validators.required],
      postalCode: ['', [Validators.required, Validators.pattern(/^\d{5}$/)]],
      address: ['', Validators.required]
    });
  }

  onSubmit(): void {
    let city = this.locationForm.value.city;
    let address = this.locationForm.value.address;
    let postalCode = this.locationForm.value.postalCode;

    let location = new Location(0, address, postalCode, city);
    this.locationRepo.create(location).subscribe({
      next: location => {
        this.angularLocation.back();
      },
      error: error => {
        this.errorMessage = this.errorText;
      }
    });
  }
}
