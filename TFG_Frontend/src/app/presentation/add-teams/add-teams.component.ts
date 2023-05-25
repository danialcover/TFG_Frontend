import {Component, OnInit} from '@angular/core';
import {GroupTeamRepository} from "../../core/league/group-team/group-team.repository";
import {ActivatedRoute} from "@angular/router";
import {GroupTeam} from "../../core/league/group-team/group-team";
import {TeamRepository} from "../../core/club/team/team.repository";
import {Team} from "../../core/club/team/team";
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {Location} from "@angular/common";

@Component({
  selector: 'app-add-teams',
  templateUrl: './add-teams.component.html',
  styleUrls: ['./add-teams.component.scss']
})
export class AddTeamsComponent implements OnInit {

  groupId?: number;

  groupTeamsGroupList?: GroupTeam[];

  teamsList?: Team[];
  uniqueTeams?: Team[];

  form: FormGroup = new FormGroup<any>([]);

  errorText: string = "S\'han d\'introduir valors correctes";
  errorMessage?: string;

  constructor(private groupTeamRepo: GroupTeamRepository,
              private route: ActivatedRoute,
              private teamRepo: TeamRepository,
              private fb: FormBuilder,
              private location: Location) {
  }

  ngOnInit() {
    this.form = this.fb.group({
      teams: [[], [Validators.required]]
    });

    this.groupId = Number(this.route.snapshot.paramMap.get('id'));
    this.groupTeamRepo.getList(this.groupId).subscribe(groupTeams => {
      this.groupTeamsGroupList = groupTeams;
      this.teamRepo.getList().subscribe(teams => {
        this.teamsList = teams;
        this.formShowList();
      });
    });
  }

  formShowList() {
    this.uniqueTeams = this.teamsList?.filter(team =>
      !this.groupTeamsGroupList?.some(groupTeam => groupTeam.team === team.id)
    );
  }

  onSubmit(): void {
    let teams: number[] = this.form.value.teams;

    teams.map(teamID => {
      let groupTeam = new GroupTeam(0, this.groupId!, teamID, 0,
        0, 0, 0, 0, 0, 0, [0, 0, 0, 0, 0]);
      this.groupTeamRepo.create(groupTeam).subscribe(groupTeam =>{
        this.location.back();
      });
    });
  }
}
