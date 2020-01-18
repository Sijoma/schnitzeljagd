import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { cloneDeep, shuffle } from 'lodash';
import { Aufgabe, Team, TeamService } from 'src/app/team.service';

@Component({
  selector: 'app-aufgabe',
  templateUrl: './aufgabe.component.html',
  styleUrls: ['./aufgabe.component.css']
})
export class AufgabeComponent implements OnInit {
  aufgabe: Aufgabe;
  errorText = '';
  selectedAnswer: string;
  moeglicheAntworten: string[];
  currentTeam: Team;
  successText =  '';
  geloest = false;


  constructor(private teamService: TeamService,
    private router: Router,
  ) { }

  ngOnInit() {
    const team = this.teamService.getCurrentTeam();
    this.currentTeam = team;
    const gameOver = this.teamService.getGameStatus();
    if (!team || gameOver === true) {
      this.router.navigate(['jagd'])
    }
    const aufgabe = this.teamService.nextAufgabe();
    // console.log('die aufgabe', aufgabe);
    if (aufgabe === 'DONE') {
      // console.log('CIRRECT')
      this.router.navigate(['erfolg']);
    } else {
      // console.log('aufgb', aufgabe);
      this.changeAufgabe(aufgabe);
    }
  }

  changeAufgabe(aufgabe: Aufgabe) {
    this.moeglicheAntworten = undefined;
    if (aufgabe.typ === 'TriviaAufgabe' && aufgabe.falscheAntwort) {
      const joinedArray = cloneDeep(aufgabe.falscheAntwort);
      joinedArray.push(aufgabe.richtigeAntwort);
      this.moeglicheAntworten = shuffle(joinedArray);
    }
    this.errorText = '';
    this.successText = '';
    this.aufgabe = aufgabe;
  }

  antworten(antwort: string) {
    const richtigBool = this.teamService.solveQuestion(antwort);
    this.geloest = true;
    console.log('gelöst?', this.geloest);
    if (richtigBool) {
      this.successText = 'Richtig!';
    } else {
      this.errorText = 'Leider falsch!';
    }
  }

  nextAufgabe(): void{
    const aufgabe = this.teamService.nextAufgabe();
    if (aufgabe === 'DONE') {
      this.router.navigate(['erfolg']);
    } else {
      this.changeAufgabe(aufgabe);
      this.geloest = false;
    }
  }

}
