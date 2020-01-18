import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Team, TeamService } from 'src/app/team.service';

@Component({
  selector: 'app-team-start',
  templateUrl: './team-start.component.html',
  styleUrls: ['./team-start.component.css']
})
export class TeamStartComponent implements OnInit {
  teamForm = this.fb.group({
    teamname: [null, Validators.required],
    schwierigkeitsgrad: ['leicht', Validators.required],
    zugangscode: [null, Validators.required],
  });
  errorText = '';

  constructor(
    private fb: FormBuilder,
    private teamService: TeamService,
    private router: Router) { }

  ngOnInit() {
  }

  onSubmit(teamForm) {
    if (teamForm.status === 'VALID') {
      const team: Team = teamForm.value;
      team.zugangscode = team.zugangscode.toLowerCase().split(' ').join('');
      // console.log('The team', team);
      const addedTeam = this.teamService.addTeam({
        ...team
      });
      if(addedTeam){
        this.router.navigate(['aufgabe']);
        this.errorText = '';
      } else {
        this.errorText = 'Zugangscode falsch';
      }
    }
  }
}
