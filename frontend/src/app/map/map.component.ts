import { AfterViewInit, Component, OnInit } from '@angular/core';
import { formatDate } from '@angular/common';
import { AppServiceService } from '../app-service.service';
import { MapFilterService } from './map-filter.service';
import { MapService } from '../options/details/map.service';
import { ClickService } from '../options/click.service';
import { LoaderService } from '../core';
import * as L from 'leaflet';
import 'leaflet.markercluster';

@Component({
  selector: 'app-map',
  templateUrl: './map.component.html',
  styleUrls: ['./map.component.css']
})
export class MapComponent implements AfterViewInit, OnInit {
  private map;

  from = formatDate(new Date().setFullYear(new Date().getFullYear() - 5), 'yyyy-MM-dd', 'en');
  to = formatDate(new Date(), 'yyyy-MM-dd', 'en');

  longitude = 13.01582;
  latitude = 52.45905;

  marker = [];
  coordinateList: { Anl_Bez: string,
                    Latitude: number,
                    Longitude: number,
                    PLZ: string,
                    Status: string,
                    Wka_ID: string }[] = [];

  model: { from: string, to: string, approved: string, inUse: string } = {from: this.from, to: this.to, approved: 'true', inUse: 'true'};

  listLength = 0;

  constructor(private service: AppServiceService,
              private mapFilterService: MapFilterService,
              private mapService: MapService,
              public loaderService: LoaderService,
              private clickService: ClickService) { }

  iconBlack = {
    icon: L.icon({
      iconUrl: 'assets/images/wka_black.png',
      iconAnchor: [16, 16],
      riseOnHover: true
    })
  };

  iconYellow = {
    icon: L.icon({
      iconUrl: 'assets/images/wka_yellow.png',
      iconAnchor: [16, 16],
      riseOnHover: true
    })
  };

  iconRed = {
    icon: L.icon({
      iconUrl: 'assets/images/wka_red.png',
      iconAnchor: [16, 16],
      riseOnHover: true
    })
  };

  markers = L.markerClusterGroup({
    spiderfyOnMaxZoom: true,
    showCoverageOnHover: true,
    zoomToBoundsOnClick: true
  });

  ngOnInit(): void {
    if (this.mapFilterService.subsVar === undefined) {
      this.mapFilterService.subsVar = this.mapFilterService.
      invokeMapComponentFunction.subscribe((data) => {
        this.model = data;
        this.getCoordinatesFromAPI(this.model.from, this.model.to, this.model.approved, this.model.inUse);
      });
    }

    this.getCoordinatesFromAPI(this.from, this.to, true, true);

    console.log('5 years back: ', this.from);
    console.log('Now: ', this.to);
  }

  ngAfterViewInit(): void {
    this.initMap();

    const tiles = L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
      minZoom: 8,
      attribution: '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>'
    });
    tiles.addTo(this.map);
  }

  drawMarkers(): void {
    this.markers.clearLayers();
    let color;

    for (let i = 0; i < this.listLength; i++) {
      if (this.coordinateList[i].Status === 'in Betrieb') {
        color = this.iconBlack;
      }
      else if (this.coordinateList[i].Status === 'vor Inbetriebnahme') {
        color = this.iconYellow;
      }
      else {
        color = this.iconRed;
      }

      this.markers.addLayer(L.marker([ this.coordinateList[i].Latitude, this.coordinateList[i].Longitude ], color)
                             .bindTooltip(this.coordinateList[i].Anl_Bez + ', '
                              + this.coordinateList[i].PLZ + ', '
                              + this.coordinateList[i].Status, {permanent: false, direction: 'top'})
                             .on('click', () => {
                                console.log(String(this.coordinateList[i].Wka_ID));
                                this.mapService.onDetailComponent(String(this.coordinateList[i].Wka_ID));
                                this.clickService.onOptionsComponent();
                             }));
    }

    this.map.addLayer(this.markers);
  }

  private initMap(): void {
    const southWest = L.latLng(50.6, 9.5);
    const northEast = L.latLng(54.3, 16.5);

    const b = L.latLngBounds(southWest, northEast);

    this.map = L.map('map', {
      center: [ this.latitude, this.longitude ],
      zoom: 8,
      maxBounds: b
    });
  }
  
  private getCoordinatesFromAPI(from, to, approved, inUse): void {
    this.service.getCoordinates(from, to, approved, inUse).subscribe((response) => {
      this.coordinateList = [];
      this.coordinateList = response;
      this.listLength = Object.keys(response).length;
      console.log('Response is ', this.coordinateList, this.listLength);
      this.drawMarkers();
    }, (error) => {
      console.log('Error is ', error);
    });
  }
}
