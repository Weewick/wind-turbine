import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class AppServiceService {

  constructor(private http: HttpClient) { }

  // tslint:disable-next-line:typedef
  getById(id: string) {
    console.log('ID is: ', id)
    return this.http.get<any>('/api/getById?wkaId=' + id);
  }

  // tslint:disable-next-line:typedef
  getCoordinates(from: string, to: string, approved: string, inUse: string) {
    return this.http.get<any>('/api/coordinates' + this.getURL(from, to, approved, inUse));
  }

  // tslint:disable-next-line:typedef
  getTotalPower(from: string, to: string, approved: string, inUse: string) {
    return this.http.get<any>('/api/graph1' + this.getURL(from, to, approved, inUse));
  }

  // tslint:disable-next-line:typedef
  getHeightDiameter(from: string, to: string, approved: string, inUse: string) {
    return this.http.get<any>('/api/graph2' + this.getURL(from, to, approved, inUse));
  }

  // tslint:disable-next-line:typedef
  getTopTen(from: string, to: string, approved: string, inUse: string) {
    return this.http.get<any>('/api/graph3' + this.getURL(from, to, approved, inUse));
  }

  // tslint:disable-next-line:typedef
  getBoxPlot(from: string, to: string, inUse: string) {
    return this.http.get<any>('/api/graph4' + this.getURL(from, to, 'true', inUse));
  }

  // tslint:disable-next-line:typedef
  getBuildTime(from: string, to: string, inUse: string) {
    return this.http.get<any>('/api/graph5' + this.getURL(from, to, 'true', inUse));
  }

  getURL(from: string, to: string, approved: string, inUse: string): string {
    return '?from=' + encodeURIComponent(from) +
           '&to=' + encodeURIComponent(to) +
           '&approved=' + encodeURIComponent(approved) +
           '&inUse=' + encodeURIComponent(inUse);
  }
}
