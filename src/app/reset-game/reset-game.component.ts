import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { Team, TeamService } from '../team.service';

@Component({
  selector: 'app-reset-game',
  templateUrl: './reset-game.component.html',
  styleUrls: ['./reset-game.component.css']
})
export class ResetGameComponent implements OnInit {
  team: Team;

  constructor(private teamService: TeamService,
    private router: Router) {
     }

  ngOnInit() {
    this.team = this.teamService.getCurrentTeamForReset();
    if (!this.team) {
      this.router.navigate(['jagd']);
    }
  }

  resetGame() {
    this.teamService.resetGame();
    this.router.navigate(['jagd']);
  }

}
