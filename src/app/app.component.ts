import { Component } from '@angular/core';
import { MatIconRegistry } from '@angular/material/icon';
import { CookieService } from 'ngx-cookie-service';

import { SafePipe } from '../app/safe.pipe';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  cookieValue = 'UNKNOWN';

  constructor(
    private cookieService: CookieService,
    private matIconRegistry: MatIconRegistry,
    private safePipe: SafePipe) {
    this.matIconRegistry.addSvgIcon(
      `multistop-yellow`,
      safePipe.transform('assets/icons/lh-icon-multistop-yellow.svg', 'resourceUrl')
    );
    this.matIconRegistry.addSvgIcon(
      `multistop-blue`,
      safePipe.transform('assets/icons/lh-icon-multistop-blue.svg', 'resourceUrl')
    );
    this.matIconRegistry.addSvgIcon(
      `mountain-blue`,
      safePipe.transform('assets/icons/lh-icon-mountain.svg', 'resourceUrl')
    );
    this.matIconRegistry.addSvgIcon(
      `a-to-b-yellow`,
      safePipe.transform('assets/icons/lh-icon-a-to-b.svg', 'resourceUrl')
    );
    this.matIconRegistry.addSvgIcon(
      `navigation-yellow`,
      safePipe.transform('assets/icons/lh-icon-navigation.svg', 'resourceUrl')
    );
    this.matIconRegistry.addSvgIcon(
      `location-yellow`,
      safePipe.transform('assets/icons/lh-icon-location.svg', 'resourceUrl')
    );
  }
}
