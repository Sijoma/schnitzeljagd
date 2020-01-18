import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { TeamService } from '../team.service';

@Component({
  selector: 'app-jagd',
  templateUrl: './jagd.component.html',
  styleUrls: ['./jagd.component.css']
})
export class JagdComponent implements OnInit {
  
  constructor(private teamService: TeamService,
    private router: Router) { }


  ngOnInit() {
    const currTeam = this.teamService.getCurrentTeam();
    if (currTeam) {
      console.log('curr tema called?')
      this.router.navigate(['aufgabe']);
    }
  }

}
