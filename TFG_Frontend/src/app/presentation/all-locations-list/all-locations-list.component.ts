import {Component, OnInit} from '@angular/core';
import {MatTableDataSource} from "@angular/material/table";
import {LocationRepository} from "../../core/club/location/location.repository";
import {Location} from "../../core/club/location/location";
import {Utils} from "../../core/main/utils";

@Component({
  selector: 'app-all-locations-list',
  templateUrl: './all-locations-list.component.html',
  styleUrls: ['./all-locations-list.component.scss']
})
export class AllLocationsListComponent implements OnInit {

  locationsList: MatTableDataSource<Location> = new MatTableDataSource<Location>();
  displayedColumns: string[] = ['id', 'address', 'postal code', 'city', 'buttons'];
  filterAddress = '';
  filterPostalCode = '';
  filterCity = '';

  constructor(private locationRepo: LocationRepository) {
  }

  ngOnInit() {
    this.loadData();
  }

  loadData() {
    this.locationRepo.getList().subscribe((locations: Location[]) => {
      this.locationsList = new MatTableDataSource<Location>(locations);
    });
  }

  applyFilters() {
    this.locationsList.filterPredicate = (data: Location, _: string) => {
      const addressFilter = this.filterAddress ? data.address?.toLowerCase().includes(this.filterAddress.trim().toLowerCase()) || false : true;
      const postalCodeFilter = this.filterPostalCode ? data.postalCode?.toString().includes(this.filterPostalCode.toString()) || false : true;
      const cityFilter = this.filterCity ? data.city.toLowerCase().includes(this.filterCity.trim().toLowerCase()) || false : true;
      return addressFilter && postalCodeFilter && cityFilter;
    };
    this.locationsList.filter = Math.random().toString();
  }

  deleteLocation(id: number) {
    this.locationRepo.delete(id).subscribe({
      next: data => {
        this.loadData();
      }
    });
  }

  protected readonly Utils = Utils;
}
