import {NgModule} from '@angular/core';
import {BrowserModule} from '@angular/platform-browser';

import {AppRoutingModule} from './app-routing.module';
import {AppComponent} from './app.component';
import {LeagueListComponent} from './presentation/league-list/league-list.component';
import {HttpClientModule} from "@angular/common/http";
import {AppProviders} from "./di/providers";
import {NavBarComponent} from './presentation/nav-bar/nav-bar.component';
import {RouterModule, Routes} from '@angular/router';
import {MainPageComponent} from './presentation/main-page/main-page.component';
import {BrowserAnimationsModule} from "@angular/platform-browser/animations";
import {MatListModule} from "@angular/material/list";
import {MatTableModule} from "@angular/material/table";
import {MatFormFieldModule} from "@angular/material/form-field";
import {MatInputModule} from "@angular/material/input";
import {FormsModule} from "@angular/forms";
import {MatSelectModule} from "@angular/material/select";
import {MatButtonModule} from "@angular/material/button";
import {MatIconModule} from "@angular/material/icon";
import {LeagueDetailComponent} from './presentation/league-detail/league-detail.component';
import {MatTabsModule} from "@angular/material/tabs";
import {AllTeamsListComponent} from './presentation/all-teams-list/all-teams-list.component';
import {AllGroupsListComponent} from "./presentation/all-groups-list/all-groups-list.component";
import {CdkTableModule} from "@angular/cdk/table";
import {MatExpansionModule} from "@angular/material/expansion";
import {AllLocationsListComponent} from './presentation/all-locations-list/all-locations-list.component';
import { LoginComponent } from './presentation/login/login.component';
import { TeamGroupsRankingComponent } from './presentation/team-groups-ranking/team-groups-ranking.component';

const appRoutes: Routes = [
  {path: '', component: MainPageComponent},
  {path: 'login', component: LoginComponent},
  {path: 'leagues-list', component: LeagueListComponent},
  {path: 'groups-list', component: AllGroupsListComponent},
  {path: 'locations-list', component: AllLocationsListComponent},
  {path: 'league-detail/:id', component: LeagueDetailComponent},
  {path: 'teams-list', component: AllTeamsListComponent},
];

@NgModule({
  declarations: [
    AppComponent,
    LeagueListComponent,
    NavBarComponent,
    MainPageComponent,
    LeagueDetailComponent,
    AllTeamsListComponent,
    AllGroupsListComponent,
    AllLocationsListComponent,
    LoginComponent,
    TeamGroupsRankingComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    RouterModule.forRoot(appRoutes),
    BrowserAnimationsModule,
    MatListModule,
    MatTableModule,
    MatFormFieldModule,
    MatInputModule,
    FormsModule,
    MatSelectModule,
    MatButtonModule,
    MatIconModule,
    MatTabsModule,
    CdkTableModule,
    MatExpansionModule
  ],
  providers: [AppProviders],
  bootstrap: [AppComponent],
  exports: [RouterModule]
})
export class AppModule {
}
