import { Component, OnInit } from '@angular/core';
import { formatDate } from '@angular/common';
import { NgForm } from '@angular/forms';
import { MapFilterService } from '../map-filter.service';
import { LoaderService } from 'src/app/core';

@Component({
  selector: 'app-map-filter',
  templateUrl: './map-filter.component.html',
  styleUrls: ['./map-filter.component.css']
})
export class MapFilterComponent implements OnInit {
  fromDate = formatDate(new Date().setFullYear(new Date().getFullYear() - 5), 'yyyy-MM-dd', 'en');
  toDate = formatDate(new Date(), 'yyyy-MM-dd', 'en');

  constructor(private mapFilterService: MapFilterService, public loaderService: LoaderService) { }

  ngOnInit(): void {}

  submitFilter(form: NgForm): void {
    const from = formatDate(form.value.from._d, 'yyyy-MM-dd', 'en');
    const to = formatDate(form.value.to._d, 'yyyy-MM-dd', 'en');
    const approved = form.value.approved;
    const inUse = form.value.inUse;
    console.log('From: ', form.value.from._d);
    console.log('To: ', form.value.to._d);
    console.log('Approved: ', approved);
    console.log('InUse: ', inUse);
    this.mapFilterService.onMapComponent(from, to, approved, inUse);
  }
}
