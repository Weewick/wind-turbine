import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { AppServiceService } from 'src/app/app-service.service';
import { MapService } from './map.service';

@Component({
  selector: 'app-details',
  templateUrl: './details.component.html',
  styleUrls: ['./details.component.css'],
  encapsulation: ViewEncapsulation.None
})
export class DetailsComponent implements OnInit {
  data: { Betreiber: string,
          Betriebsstättennummer: string,
          Betriebsbezeichnung: string,
          Ort: string,
          Ortsteil: string,
          Anlagennummer: string,
          Anlagebezeichnung: string,
          Kreis: string,
          Gemeindeschlüssel: string,
          Postleitzahl: string,
          Leistung: string,
          Status: string,
          Nabenhöhe: string,
          Rotordurchmesser: string,
          Genehmigungsdatum: string,
          Inbetriebnahmedatum: string
        }[];

  arrayOfKeys;

  constructor(private service: AppServiceService, private mapService: MapService) {}

  ngOnInit(): void {
    if (this.mapService.subsVar === undefined) {
      this.mapService.subsVar = this.mapService.
      invokeDetailComponentFunction.subscribe((wka) => {
        this.getByIdFromAPI(wka.wkaId);
      });
    }

    this.data = [
      {
        Betreiber: '/',
        Betriebsstättennummer: '/',
        Betriebsbezeichnung: '/',
        Ort: '/',
        Ortsteil: '/',
        Anlagennummer: '/',
        Anlagebezeichnung: '/',
        Kreis: '/',
        Gemeindeschlüssel: '/',
        Postleitzahl: '/',
        Leistung: '/',
        Status: '/',
        Nabenhöhe: '/',
        Rotordurchmesser: '/',
        Genehmigungsdatum: '/',
        Inbetriebnahmedatum: '/'
      }
    ];

    this.arrayOfKeys = Object.keys(this.data[0]);
    console.log(this.arrayOfKeys);
  }

  private getByIdFromAPI(wkaId): void {
    this.service.getById(wkaId).subscribe((response) => {
      this.data = [];
      this.data = response;
      console.log('Details are ', this.data);
    }, (error) => {
      console.log('Error is ', error);
    });
  }
}
