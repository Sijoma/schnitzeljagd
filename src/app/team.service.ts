import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { firestore } from 'firebase';
import { cloneDeep } from 'lodash';
import { CookieService } from 'ngx-cookie-service';
import { Observable, Subject } from 'rxjs';

import { environment } from '../environments/environment';


export interface Team {
  teamname: string;
  schwierigkeitsgrad: string;
  zugangscode: string;
}

export interface Aufgabe {
  beschreibung: string;
  typ: string;
  name: string;
  frage?: string;
  ziel?: GeoPoint;
  gelöst: boolean;
  img: string;
  richtigeAntwort: string;
  falscheAntwort: string[];
}

export interface GeoPoint {
  latitude: number;
  longitude: number;
}

@Injectable({
  providedIn: 'root'
})
export class TeamService {

  private currentTeamSubject = new Subject<Team>();
  currentTeam: Team;
  currentAufgaben: string[];
  schnitzeljagd: string[];
  currentAufgabe: Aufgabe;
  gameOver = false;
  score = 0;
  schnitzeljagden = {
    queenoftheskies: ['T1', 'Anfang', 'A1', 'T2', 'T3', 'A3', 'T4', 'Ende'],
    a380: ['T1', 'Anfang', 'A6', 'T2', 'T3', 'A7', 'T4', 'Ende'],
    a320: ['T1', 'Anfang', 'A5', 'T2', 'T3', 'A4', 'T4', 'Ende'],
    triple7: ['T1', 'Anfang', 'A3', 'T2', 'T3', 'A8', 'T4', 'Ende'],
    crj900: ['T1', 'Anfang', 'A9', 'T2', 'T3', 'A6', 'T4', 'Ende']
  };


  aufgaben = {
    A1: {
      name: 'Das Kaufhaus',
      typ: 'LocationAufgabe',
      beschreibung: 'Stellt das angezeigte Bild nach und ladet ein Bild als Lösung hoch. Nutzt dafür die Möglichkeiten von Galeria Kaufhof zum lösen der Aufgabe.',
      ziel: { latitude: 53.5510190, longitude: 9.9988018 },
      gelöst: false,
      img: 'assets/img/galeriakaufhofkleidung.jpg',
      richtigeAntwort: 'JA'
    },
    Ende: {
      name: 'S-Bahn Challenge!',
      typ: 'LocationAufgabe',
      beschreibung: 'Singt und spendet! Nutzt die Chance zusammen mit eurer Gruppe ein Lied eurer Wahl (auf dem Weg zum „Weihnachtsessen“) in der Bahn zu singen! Sammelt dabei Geld um es an die HelpAlliance zu spenden und ladet ein kurzes Video davon hoch.',
      ziel: { latitude: 53.544772, longitude: 9.944327 },
      gelöst: false,
      img: 'assets/img/helpalliance.jpg',
      richtigeAntwort: 'JA'
    },
    A3: {
      name: 'Das ferne Land',
      typ: 'LocationAufgabe',
      beschreibung: 'Wusstet ihr, dass das Hofbräu Haus München bereits 1589 gegründet wurde und das Privileg hatte zu Zeiten fürstlicher Regenten den Hofstatt mit Bier zu versorgen? Eigentlich eine ganz schöne bayrische Tradition, aber was sucht diese bei uns im Norden? Also nichts wie hin zum HB (Speersort) und zeigt den Bazis mal was wir von ihrer Kultur halten: Trällert im Hofbräuhaus das Lied „Zieht den Bayern die Lederhosen aus“ und macht davon ein Video!',
      ziel: { latitude: 53.549680, longitude: 9.998352 },
      gelöst: false,
      img: 'assets/img/Bayern.jpg',
      richtigeAntwort: 'JA'
    },
    A4: {
      name: 'Astra Marketing Team',
      typ: 'LocationAufgabe',
      beschreibung: 'Stellt das angezeigte Bild nach und ladet ein Bild als Lösung hoch. Nutzt dafür die Möglichkeiten von Galeria Kaufhof zum lösen der Aufgabe.',
      ziel: { latitude: 53.5510190, longitude: 9.9988018 },
      gelöst: false,
      img: 'assets/img/astra.jpg',
      richtigeAntwort: 'JA'
    },
    A5: {
      name: 'The Catwalk',
      typ: 'LocationAufgabe',
      beschreibung: 'Geht zur Koordinate, dort findet ihr ein bekanntes Schuhhaus. Begebt euch in die Abteilung für Damenschuhe. Die Frauen aus dem Team suchen Pumps aus, die die Männer aus dem Team anziehen sollen. Ladet ein Foto als Lösung hoch.',
      ziel: { latitude: 53.551824, longitude: 10.002238 },
      gelöst: false,
      img: 'assets/img/Catwalk.jpg',
      richtigeAntwort: 'JA'
    },
    A6: {
      name: 'Cool Runnings',
      typ: 'LocationAufgabe',
      beschreibung: 'Geht zur Koordinate. Schnappt Euch dort einen Schlitten und Trikots. Macht dann ein Foto wie ihr auf dem Schlitten sitzt. Ladet das Foto hoch.',
      ziel: { latitude: 53.551076, longitude: 9.996266 },
      gelöst: false,
      img: 'assets/img/coolrunnings.jpg',
      richtigeAntwort: 'JA'
    },
    A7: {
      name: 'Der Brunnen',
      typ: 'LocationAufgabe',
      beschreibung: 'Findet die bekannte Hamburger Sehenswürdigkeit auf dem Foto und erstellt ein Gruppenfoto unter Einbeziehung aller Skulpturen. Ladet das Foto hoch.',
      ziel: { latitude: 53.551241, longitude: 10.000694 },
      gelöst: false,
      img: 'assets/img/brunnen.png',
      richtigeAntwort: 'JA'
    },
    A8: {
      name: 'Könige des Nordens',
      typ: 'LocationAufgabe',
      beschreibung: 'Auch die Zweite Liga ist toll! Deshalb nutzt die natürlichen Ressourcen in Eurer Umgebung und stellt eine Jubelszene der Dino-Mannschaft nach und ladet dieses hoch.',
      ziel: { latitude: 53.549848, longitude: 9.996096 },
      gelöst: false,
      img: 'assets/img/hsv.png',
      richtigeAntwort: 'JA'
    },
    A9: {
      name: 'All Hands',
      typ: 'LocationAufgabe',
      beschreibung: 'Begebt euch in den Lego Store und stellt dass All Hands Meeting nach. Erstellt dazu eine maximal 30 Sekunden lange Videoaufnahme. Ladet diese hoch.',
      ziel: { latitude: 53.552180, longitude: 10.002762 },
      gelöst: false,
      img: 'assets/img/hsv.png',
      richtigeAntwort: 'JA'
    },
    Anfang: {
      name: 'Durstlöscher für alle!',
      typ: 'LocationAufgabe',
      beschreibung: 'Begebt euch zu der Koordinate. Erstellt dann ein Bild mit einem Heißgetränk eurer Wahl. Ladet dieses hoch.',
      ziel: { latitude: 53.550419, longitude: 9.996866 },
      gelöst: false,
      img: 'assets/img/weihnachtsmarktstpetri.jpg',
      richtigeAntwort: 'JA'
    },
    T1: {
      name: 'Trivia: Flugzeuge',
      typ: 'TriviaAufgabe',
      frage: 'Der Codename Cossack steht für ....',
      gelöst: false,
      richtigeAntwort: 'Antonow An-225',
      img: 'assets/img/antonow.jpg',
      falscheAntwort: ['Airbus A380', 'Boeing 747-8', 'Bombardier CRJ900']
    },
    // T2: {
    //   name: 'Trivia: Mittelalter',
    //   typ: 'TriviaAufgabe',
    //   frage: 'Was war am 6.12.1534:',
    //   gelöst: false,
    //   richtigeAntwort: 'Nikolaus',
    //   img: 'assets/img/mittelalter.gif',
    //   falscheAntwort: ['Airbus A380', 'Boeing 747-8', 'Bombardier CRJ900']
    // },
    T2: {
      name: 'Trivia: Weihnachten',
      typ: 'TriviaAufgabe',
      frage: 'Wer gab 2018 am meisten Geld für Weihnachtsgeschenke aus:',
      gelöst: false,
      richtigeAntwort: 'Bayern',
      img: 'assets/img/Weihnachtsgeschenke.jpg',
      falscheAntwort: ['Hamburg', 'Hessen', 'Düsseldorf']
    },
    T3: {
      name: 'Trivia: Linienflug',
      typ: 'TriviaAufgabe',
      frage: 'Wie lange dauert der kürzeste Linienflug:',
      gelöst: false,
      richtigeAntwort: 'unter 1 min',
      img: 'assets/img/linienflug.jpg',
      falscheAntwort: ['10 min', '20 min', '5 min']
    },
    T4: {
      name: 'Trivia: Preisträger',
      typ: 'TriviaAufgabe',
      frage: 'Wer wurde mit dem diesjährigen Nobelpreis in der Kategorie Chemie geehrt?',
      gelöst: false,
      richtigeAntwort: 'Erfinder der Lithium Ionen Akkus',
      img: 'assets/img/einstein.jpg',
      falscheAntwort: ['Entwickler der Kryo-Elektronenmikroskopie', 'Erfinder der Genschere - CRISPR']
    }
  };

  constructor(
    private cookieService: CookieService,
    private db: AngularFirestore
  ) {
  }

  getTeamSubject(): Observable<Team> {
    return this.currentTeamSubject.asObservable();
  }

  checkCookieValue(cookieValue: string): boolean {
    return (cookieValue !== undefined && cookieValue.length !== 0);
  }

  fetchTeamFromCookie(): any {
    const existingTeamCode = this.cookieService.get('TEAM_Zugangscode');
    const existingTeamName = this.cookieService.get('TEAM_Name');
    const existingSchwierigkeit = this.cookieService.get('Schwierigkeit');
    if (this.gameOver !== true) {
      const existingScore = this.cookieService.get('Score');
      // console.log('existing score', existingScore);
      this.score = parseInt(existingScore);
    };


    // console.log('team ', existingTeamCode, ' name', existingTeamName, ' schw', existingSchwierigkeit);

    if (this.checkCookieValue(existingTeamCode)
      && this.checkCookieValue(existingSchwierigkeit)
      && this.checkCookieValue(existingTeamCode)) {
      const team = {
        teamname: existingTeamName,
        schwierigkeitsgrad: existingSchwierigkeit,
        zugangscode: existingTeamCode,
      };
      return team;
    } else {
      return false;
    }
  }

  putTeamInCookie(team: Team): void {
    this.cookieService.set('TEAM_Zugangscode', team.zugangscode, 1, '', environment.production ? environment.firebase.authDomain : '', false, 'Strict');
    this.cookieService.set('TEAM_Name', team.teamname, 1, '', environment.production ? environment.firebase.authDomain : '', false, 'Strict');
    this.cookieService.set('Schwierigkeit', team.schwierigkeitsgrad, 1, '', environment.production ? environment.firebase.authDomain : '', false, 'Strict');
    this.cookieService.set('Score', this.score.toString(), 1, '', environment.production ? environment.firebase.authDomain : '', false, 'Strict');
  }

  getCurrentTeam(): Team {
    const existingTeam = this.fetchTeamFromCookie();
    if (existingTeam) {
      this.setCurrentTeam(existingTeam);
    }
    return this.currentTeam;
  }

  getGameStatus() {
    return this.gameOver;
  }

  getCurrentTeamForReset(): Team {
    return this.currentTeam;
  }

  setCurrentTeam(team: Team): void {
    this.currentTeam = team;
    const aufgaben = cloneDeep(this.schnitzeljagden[team.zugangscode]);
    if (aufgaben && aufgaben.length > 0) {
      this.setCurrentAufgaben(aufgaben);
      this.putTeamInCookie(team);
    }
  }

  addTeam(team: Team): boolean {
    this.score = 0;
    if (this.schnitzeljagden[team.zugangscode]) {
      this.db.collection('teams').doc(team.zugangscode).set(team);
      if (!this.currentTeam) {
        this.currentTeamSubject.next(team);
        this.setCurrentTeam(team);
      }
      this.gameOver = false;
      return true;
    } else {
      return false;
    }
  }

  addResponse(aufgabe: Aufgabe, antwort: string): void {
    const loesung = {
      id: aufgabe.name,
      richtig: aufgabe.richtigeAntwort,
      antwort
    };
    this.db.collection('teams').doc(this.currentTeam.zugangscode).update({
      aufgaben: firestore.FieldValue.arrayUnion(loesung),
      timestamp: firestore.FieldValue.serverTimestamp()
    });
  }

  setCurrentAufgaben(aufgaben: string[]): void {
    const spielFortschritt = this.cookieService.get('SpielFortschritt');
    if (spielFortschritt) {
      const index = aufgaben.findIndex(aufgabe => aufgabe === spielFortschritt);
      if (index > 0) {
        aufgaben.splice(0, index);
      }
    }
    this.currentAufgaben = aufgaben;
  }

  getAufgabe(id: string): any {
    return this.aufgaben[id];
  }

  setCurrentAufgabe(aufgabe: Aufgabe): any {
    this.currentAufgabe = aufgabe;
  }

  nextAufgabe(): any {
    if (this.gameOver === true) {
      return 'DONE';
    }
    if (this.currentTeam && typeof this.currentAufgabe === 'undefined' || this.currentAufgabe && this.currentAufgabe.gelöst) {
      // console.log('aktuelle aufgaben', this.currentAufgaben);
      const nextAufgabeKey = this.currentAufgaben.splice(0, 1);
      if (nextAufgabeKey.length === 0) {
        this.cookieService.set('SpielFortschritt', '', 1, '', environment.production ? environment.firebase.authDomain : '', false, 'Strict');
        this.gameOver = true;
        return 'DONE' // redirect?
      } else {
        // console.log('else teil?')
        this.setCurrentAufgabe(this.aufgaben[nextAufgabeKey[0]]);
        this.cookieService.set('SpielFortschritt', nextAufgabeKey[0], 1, '', environment.production ? environment.firebase.authDomain : '', false, 'Strict');
        return this.aufgaben[nextAufgabeKey[0]];
      }
    } else {
      return this.currentAufgabe;
    }
  }

  solveQuestion(antwort: string): boolean {
    this.currentAufgabe.gelöst = true;
    this.addResponse(this.currentAufgabe, antwort);
    if (this.currentAufgabe.richtigeAntwort === antwort) {
      this.incrementScore();
      return true;
    } else {
      return false;
    }
  }

  incrementScore(): void {
    this.score = this.score + 1;
    this.cookieService.set('Score', this.score.toString(), 1, '', environment.production ? environment.firebase.authDomain : '', false, 'Strict');
  }

  getScore(): number {
    return this.score;
  }

  resetGame() {
    this.cookieService.deleteAll('/', environment.production ? environment.firebase.authDomain : '');
    this.currentTeam = undefined;
    this.currentAufgabe = undefined;
    this.currentAufgaben = undefined;
  }

}
