import { Component, OnInit } from '@angular/core';

import { GeoPoint, TeamService } from '../team.service';

@Component({
  selector: 'app-loesen',
  templateUrl: './loesen.component.html',
  styleUrls: ['./loesen.component.css']
})
export class LoesenComponent implements OnInit {
  score: number;
  constructor(private teamService: TeamService) { }
  ziel: GeoPoint;
  ngOnInit() {
    this.score = this.teamService.getScore();
    this.ziel = { latitude: 53.544772, longitude: 9.944327 };
  }

}
