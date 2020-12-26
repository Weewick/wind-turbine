import { formatDate } from '@angular/common';
import { Component, OnInit } from '@angular/core';

import { AppServiceService } from '../../app-service.service';
import { StatisticsFilterService } from './statistics-filter.service';

@Component({
  selector: 'app-statistics',
  templateUrl: './statistics.component.html',
  styleUrls: ['./statistics.component.css']
})

export class StatisticsComponent implements OnInit {
  from = formatDate(new Date().setFullYear(new Date().getFullYear() - 5), 'yyyy-MM-dd', 'en');
  to = formatDate(new Date(), 'yyyy-MM-dd', 'en');

  dataList: { Datum: string,
              Leistung: number,
              Status: string }[] = [];

  dataList2: { Rotordurch: number,
               Nabenhoehe: number,
               Anzahl: number }[] = [];

  dataList3: { PLZ: string,
               Leistung: number,
               Anzahl: number }[] = [];

  dataList4: { Datum: string,
               Baudauer: number }[] = [];

  listLength = 0;
  listLength2 = 0;
  listLength3 = 0;
  listLength4 = 0;

  powerGraphs = [];
  heightDiameterGraph = [];
  topTenGraph = [];
  boxPlotGraph = [];
  buildTimeGraph = [];

  model: { from: string,
           to: string,
           approved: string,
           inUse: string } = {from: this.from, to: this.to, approved: 'true', inUse: 'true'};

  // options
  labels = ['Baudauer in Tagen'];
  legend = true;
  showLabels = true;
  barPadding = 0;
  animations = true;
  xAxis = true;
  yAxis = true;
  showYAxisLabel = true;
  showXAxisLabel = true;
  xAxisLabel = 'Datum';
  yAxisLabel = 'Gesamtleistung in MW';
  xAxisLabel2 = 'Rotordurchmesser in m';
  yAxisLabel2 = 'Nabenhöhe in m';
  xAxisLabel3 = 'Postleitzahl';
  yAxisLabel3 = 'Leistung in MW/ Anzahl';
  xAxisLabel4 = 'Inbetriebnahmedatum';
  yAxisLabel4 = 'Baudauer in Tagen';
  xScaleMin = 20;
  xScaleMax = 180;
  yScaleMin = 20;
  yScaleMax = 180;
  minRadius = 3;
  maxRadius = 7;
  timeline = true;
  domain = [0, 1500];
  palette = ['#C73C35'];
  lookAndFeel = {
    vMargin: 30,
    hMarginL: 15,
    hMarginR: 15,
    rowWidth: 130,
    rowGap: 0.2,

    transitionTime: 600,

    boxStrokeWidth: '2px',
    boxFillOpacity: 0.35,
    meanStrokeWidth: '2px',

    labelFont: '10px',
    labelFillOpacity: 0.35,
    backLabelOpacity: 0,

    backdropColor: 'white',
    backdropOpacity: 1,

    whiskerStrokeWidth: '2px',

    outliersStrokeWidth: '1px',
    outliersCircleRadius: 1,
    outliersFillOpacity: 0.4
  };
  legendTitle = 'Legende';

  colorScheme = {
    domain: ['#C73C35', '#296D98']
  };

  colorScheme2 = {
    domain: ['#99d9ea', '#b5e61d', '#e8dc00', '#f4bd00', '#ff7f27', '#ed1c24', '#400b29']
  };

  constructor( private service: AppServiceService, private statisticsFilterService: StatisticsFilterService ) {}

  ngOnInit(): void {
    if (this.statisticsFilterService.subsVar === undefined) {
      this.statisticsFilterService.subsVar = this.statisticsFilterService.
      invokeStatisticsComponentFunction.subscribe((data) => {
        this.model = data;
        this.getPowerFromAPI(this.model.from, this.model.to, this.model.approved, this.model.inUse);
        this.getHeightDiameterFromAPI(this.model.from, this.model.to, this.model.approved, this.model.inUse);
        this.getTopTenFromAPI(this.model.from, this.model.to, this.model.approved, this.model.inUse);
        this.getBoxPlotFromAPI(this.model.from, this.model.to, this.model.inUse);
        this.getBuildTimeFromAPI(this.model.from, this.model.to, this.model.inUse);
      });
    }

    this.getPowerFromAPI(this.from, this.to, true, true);
    this.getHeightDiameterFromAPI(this.from, this.to, true, true);
    this.getTopTenFromAPI(this.from, this.to, true, true);
    this.getBoxPlotFromAPI(this.from, this.to, true);
    this.getBuildTimeFromAPI(this.from, this.to, true);
  }

  private getPowerFromAPI(from, to, approved, inUse): void {
    this.service.getTotalPower(from, to, approved, inUse).subscribe((response) => {
      this.dataList = [];
      this.dataList = response;
      this.listLength = Object.keys(response).length;
      console.log('Response is ', this.dataList, this.listLength);

      this.makePowerArray();
      console.log('Power Structure is ', this.powerGraphs);
    }, (error) => {
      console.log('Error is ', error);
    });
  }

  private getHeightDiameterFromAPI(from, to, approved, inUse): void {
    this.service.getHeightDiameter(from, to, approved, inUse).subscribe((response) => {
      this.dataList2 = [];
      this.dataList2 = response;
      this.listLength2 = Object.keys(response).length;
      console.log('Response is ', this.dataList2, this.listLength2);

      this.makeHeightDiameterArray();
      console.log('HeightDiameter Structure is ', this.heightDiameterGraph);
    }, (error) => {
      console.log('Error is ', error);
    });
  }

  private getTopTenFromAPI(from, to, approved, inUse): void {
    this.service.getTopTen(from, to, approved, inUse).subscribe((response) => {
      this.dataList3 = [];
      this.dataList3 = response;
      this.listLength3 = Object.keys(response).length;
      console.log('Response is ', this.dataList3, this.listLength3);

      this.makeTopTenArray();
      console.log('TopTen Structure is ', this.topTenGraph);
    }, (error) => {
      console.log('Error is ', error);
    });
  }

  private getBoxPlotFromAPI(from, to, inUse): void {
    this.service.getBoxPlot(from, to, inUse).subscribe((response) => {
      this.boxPlotGraph = [];
      this.boxPlotGraph = response;
      if (this.boxPlotGraph[0].length > 0) {
        this.domain = [ 0, this.boxPlotGraph[0][this.boxPlotGraph[0].length - 1] ];
      }
      console.log('BoxPlot is ', this.boxPlotGraph, this.boxPlotGraph.length);
    }, (error) => {
      console.log('Error is ', error);
    });
  }

  private getBuildTimeFromAPI(from, to, inUse): void {
    this.service.getBuildTime(from, to, inUse).subscribe((response) => {
      this.dataList4 = [];
      this.dataList4 = response;
      this.listLength4 = Object.keys(response).length;
      console.log('Response is ', this.dataList4, this.listLength4);

      this.makeBuildTimeArray();
      console.log('BuildTime Structure is ', this.buildTimeGraph);
    }, (error) => {
      console.log('Error is ', error);
    });
  }

  private makePowerArray(): void {
    this.powerGraphs = [];
    const powerListG = [];
    const powerListI = [];
    let lastG = 0;
    let lastI = 0;

    let year;
    let month;
    let day;

    for (let i = 0; i < this.listLength; i++) {
      year = this.dataList[i].Datum.substr(0, 4);
      month = this.dataList[i].Datum.substr(4, 2);
      day = this.dataList[i].Datum.substr(6, 2);

      if (this.dataList[i].Status === 'in Betrieb') {
        lastI = this.dataList[i].Leistung;
      }
      else {
        lastG = this.dataList[i].Leistung;
      }

      powerListI.push({ name: day + '.' + month + '.' + year, value: Number(lastI) });
      powerListG.push({ name: day + '.' + month + '.' + year, value: Number(lastG) });
    }

    this.powerGraphs.push({ name: 'Gebaute Anlagen', series: powerListI });
    this.powerGraphs.push({ name: 'Genehmigte Anlagen', series: powerListG });
  }

  private makeHeightDiameterArray(): void {
    this.heightDiameterGraph = [];
    const heightDiameterLists = [[], [], [], [], [], [], []];
    let choice;

    for (let i = 0; i < this.listLength2; i++) {
      if (this.dataList2[i].Anzahl < 10) {
        choice = 0;
      } else if (this.dataList2[i].Anzahl < 30) {
        choice = 1;
      } else if (this.dataList2[i].Anzahl < 60) {
        choice = 2;
      } else if (this.dataList2[i].Anzahl < 100) {
        choice = 3;
      } else if (this.dataList2[i].Anzahl < 150) {
        choice = 4;
      } else if (this.dataList2[i].Anzahl < 250) {
        choice = 5;
      } else {
        choice = 6;
      }

      heightDiameterLists[choice].push(this.passFormated(i));
    }

    this.heightDiameterGraph.push({ name: 'Anzahl<10', series: heightDiameterLists[0] });
    this.heightDiameterGraph.push({ name: 'Anzahl<30', series: heightDiameterLists[1] });
    this.heightDiameterGraph.push({ name: 'Anzahl<60', series: heightDiameterLists[2] });
    this.heightDiameterGraph.push({ name: 'Anzahl<100', series: heightDiameterLists[3] });
    this.heightDiameterGraph.push({ name: 'Anzahl<150', series: heightDiameterLists[4] });
    this.heightDiameterGraph.push({ name: 'Anzahl<250', series: heightDiameterLists[5] });
    this.heightDiameterGraph.push({ name: 'Anzahl>=250', series: heightDiameterLists[6] });
  }

  private makeTopTenArray(): void {
    this.topTenGraph = [];
    let topTenElem = [];

    for (let i = 0; i < this.listLength3; i++) {
      topTenElem = [ { name: 'Leistung der Anlagen', value: this.dataList3[i].Leistung },
                     { name: 'Anzahl der Anlagen', value: this.dataList3[i].Anzahl } ];

      this.topTenGraph.push({ name: this.dataList3[i].PLZ, series: topTenElem });
    }
  }

  private makeBuildTimeArray(): void {
    this.buildTimeGraph = [];
    const buildList = [];

    let year;
    let month;
    let day;

    for (let i = 0; i < this.listLength4; i++) {
      year = this.dataList4[i].Datum.substr(0, 4);
      month = this.dataList4[i].Datum.substr(4, 2);
      day = this.dataList4[i].Datum.substr(6, 2);

      buildList.push({ name: day + '.' + month + '.' + year, value: this.dataList4[i].Baudauer });
    }

    this.buildTimeGraph.push({ name: 'Gebaute Anlagen', series: buildList });
  }

  private passFormated(i: number): object {
    const heightDiameterElem = { name: this.dataList2[i].Anzahl,
                                 x: this.dataList2[i].Rotordurch,
                                 y: this.dataList2[i].Nabenhoehe,
                                 r: this.dataList2[i].Anzahl };

    return heightDiameterElem;
  }
}

