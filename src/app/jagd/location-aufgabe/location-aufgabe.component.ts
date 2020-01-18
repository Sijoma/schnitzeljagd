import { Component, Input, OnInit } from '@angular/core';
import { GeoLocationService } from 'src/app/geo-location.service';
import { GeoPoint } from 'src/app/team.service';

declare var google: any;

@Component({
  selector: 'app-location-aufgabe',
  templateUrl: './location-aufgabe.component.html',
  styleUrls: ['./location-aufgabe.component.css']
})
export class LocationAufgabeComponent implements OnInit {
  @Input() ziel: GeoPoint;
  currentLocation;
  locationErrorText = '';
  zoom = 14;
  line: any;
  directionsService: any;
  map: any;
  mapReady = false;
  public origin: any;
  public destination: any;
  travelMode = 'WALKING';
  iconWidth = 30;
  iconHeight = 30;
  youAreHereIcon = {
    url: 'assets/icons/lh-icon-navigation.svg',
    scaledSize: {
      width: this.iconWidth,
      height: this.iconHeight
    }
  };
  destinationIcon = {
    url: 'assets/icons/lh-icon-location.svg',
    scaledSize: {
      width: this.iconWidth,
      height: this.iconHeight
    }
  };

  public renderOptions = {
    suppressMarkers: true,
  };

  public routeMarkerOptions = {
    origin: {
      icon: this.youAreHereIcon,
    },
    destination: {
      icon: this.destinationIcon,
    },
  };

  constructor(private geoLocationService: GeoLocationService) { }

  ngOnInit() {
    this.origin = null;
    this.destination = null;
    this.mapReady = false;

    this.geoLocationService.getPosition().subscribe(
      (pos: Position) => {
        this.currentLocation = {
          latitude: +(pos.coords.latitude),
          longitude: +(pos.coords.longitude)
        };
        // console.log('currenLoco', this.currentLocation);
        if (this.map && this.currentLocation){
          this.map.panTo(new google.maps.LatLng(this.currentLocation.latitude, this.currentLocation.longitude));
        }
      });
  }

  getDirection() {
    if (this.currentLocation) {
      this.origin = {
        lat: this.currentLocation.latitude,
        lng: this.currentLocation.longitude
      };
      this.locationErrorText = '';
    } else {
      this.locationErrorText = 'Wir hatten ein Problem euren Standort zu bestimmen - ihr seid auf euch allein gestellt.';
    }

    this.destination = {
      lat: this.ziel.latitude,
      lng: this.ziel.longitude
    };

  }

  onMapReady(map: any) {
    this.map = map;
    this.mapReady = true;
  }



}
