import { AgmCoreModule } from '@agm/core';
import { LayoutModule } from '@angular/cdk/layout';
import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { AngularFireModule } from '@angular/fire';
import { AngularFirestoreModule } from '@angular/fire/firestore';
import { AngularFireStorageModule } from '@angular/fire/storage';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatListModule } from '@angular/material/list';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatRadioModule } from '@angular/material/radio';
import { MatSelectModule } from '@angular/material/select';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatToolbarModule } from '@angular/material/toolbar';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { RouterModule, Routes } from '@angular/router';
import { AgmDirectionModule } from 'agm-direction';
import { MatFileUploadModule } from 'mat-file-upload';
import { CookieService } from 'ngx-cookie-service';

import { environment } from '../environments/environment';
import { AppComponent } from './app.component';
import { ErrorComponent } from './error/error.component';
import { FileUploadComponent } from './file-upload/file-upload.component';
import { GeoLocationService } from './geo-location.service';
import { AufgabeComponent } from './jagd/aufgabe/aufgabe.component';
import { JagdComponent } from './jagd/jagd.component';
import { LocationAufgabeComponent } from './jagd/location-aufgabe/location-aufgabe.component';
import { TeamStartComponent } from './jagd/team-start/team-start.component';
import { LoesenComponent } from './loesen/loesen.component';
import { NavigationComponent } from './navigation/navigation.component';
import { ResetGameComponent } from './reset-game/reset-game.component';
import { SafePipe } from './safe.pipe';

const appRoutes: Routes = [
  { path: 'jagd', component: JagdComponent},
  { path: 'erfolg', component: LoesenComponent },
  {
    path: '',
    component: TeamStartComponent,
  },
  { path: 'upload',
    component: FileUploadComponent
  },
  {
    path: 'aufgabe',
    component: AufgabeComponent,
  },
  { path: 'reset', component: ResetGameComponent},
  { path: '**', component: TeamStartComponent }
];

@NgModule({
  declarations: [
    AppComponent,
    NavigationComponent,
    JagdComponent,
    LoesenComponent,
    TeamStartComponent,
    AufgabeComponent,
    ErrorComponent,
    SafePipe,
    LocationAufgabeComponent,
    ResetGameComponent,
    FileUploadComponent,
  ],
  imports: [    
    RouterModule.forRoot(
      appRoutes,
      { enableTracing: false } // <-- debugging purposes only
    ),
    BrowserModule,
    AngularFireModule.initializeApp(environment.firebase),
    AngularFirestoreModule, // imports firebase/firestore, only needed for database features
    AngularFireStorageModule, // imports firebase/storage only needed for storage features
    BrowserAnimationsModule,
    AgmCoreModule.forRoot({
      apiKey: 'AIzaSyBj_9I6OrUlwonpxO0KfbKlCn_ASp3fAq0'
    }),
    AgmDirectionModule,
    HttpClientModule,
    LayoutModule,
    MatToolbarModule,
    MatButtonModule,
    MatProgressSpinnerModule,
    MatSidenavModule,
    MatIconModule,
    MatListModule,
    MatInputModule,
    MatSelectModule,
    MatRadioModule,
    MatCardModule,
    MatFileUploadModule,
    MatProgressBarModule,
    ReactiveFormsModule,
    FormsModule,
  ],
  providers: [GeoLocationService, SafePipe, CookieService],
  bootstrap: [AppComponent]
})
export class AppModule { }
