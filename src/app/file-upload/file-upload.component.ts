import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { AngularFireStorage } from '@angular/fire/storage';
import { Observable } from 'rxjs';
import { finalize } from 'rxjs/operators';
import { v4 as uuid } from 'uuid';

import { Aufgabe, Team } from '../team.service';

@Component({
  selector: 'app-file-upload',
  templateUrl: './file-upload.component.html',
  styleUrls: ['./file-upload.component.css']
})
export class FileUploadComponent implements OnInit {
  @Input() currentTeam: Team;
  @Input() currentAufgabe: Aufgabe;
  @Output() uploadSuccess = new EventEmitter();
  uploadPercent: Observable<number>;
  downloadURL: Observable<string>;
  file: any;
  uploadClicked = false;
  constructor(private storage: AngularFireStorage) { }

  ngOnInit() {
  }

  onSelectedFilesChanged(event){
    this.file = event[0];
    this.uploadClicked = false;
  }

  startUpload(event) {
    this.uploadClicked = true;
    const uniqueID = uuid();
    const filePath = `${this.currentTeam.teamname}/${this.currentTeam.zugangscode}/${this.currentAufgabe.name}${uniqueID}`;
    const task = this.storage.upload(filePath, this.file);

    // observe percentage changes
    this.uploadPercent = task.percentageChanges();
    // get notified when the download URL is available
    task.snapshotChanges().pipe(
        finalize(() => this.uploadSuccess.emit(true))
     ).subscribe();
  }


}
