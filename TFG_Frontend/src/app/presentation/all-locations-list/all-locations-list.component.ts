import {Component, OnInit} from '@angular/core';
import {MatTableDataSource} from "@angular/material/table";
import {LocationRepository} from "../../core/club/location/location.repository";
import {Location} from "../../core/club/location/location";

@Component({
  selector: 'app-all-locations-list',
  templateUrl: './all-locations-list.component.html',
  styleUrls: ['./all-locations-list.component.scss']
})
export class AllLocationsListComponent implements OnInit {

  locationsList: MatTableDataSource<Location> = new MatTableDataSource<Location>();
  displayedColumns: string[] = ['id', 'address', 'postal code', 'city', 'club name'];
  filterAddress = '';
  filterPostalCode = '';
  filterClubName = '';

  constructor(private locationRepo: LocationRepository) {
  }

  ngOnInit() {
    this.locationRepo.getList().subscribe((locations: Location[]) => {
      this.locationsList = new MatTableDataSource<Location>(locations);
    });
  }

  applyFilters() {
    this.locationsList.filterPredicate = (data: Location, _: string) => {
      const addressFilter = this.filterAddress ? data.address?.toLowerCase().includes(this.filterAddress.trim().toLowerCase()) || false : true;
      const postalCodeFilter = this.filterPostalCode ? data.postalCode?.toString().includes(this.filterPostalCode.toString()) || false : true;
      const clubNameFilter = this.filterClubName ? data.club?.name.toLowerCase().includes(this.filterClubName.trim().toLowerCase()) || false : true;
      return addressFilter && postalCodeFilter && clubNameFilter;
    };
    this.locationsList.filter = Math.random().toString();
  }
}
