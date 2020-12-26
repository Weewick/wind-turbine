import { formatDate } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { LoaderService } from 'src/app/core';
import { StatisticsFilterService } from '../statistics-filter.service';

@Component({
  selector: 'app-statistics-filter',
  templateUrl: './statistics-filter.component.html',
  styleUrls: ['./statistics-filter.component.css']
})
export class StatisticsFilterComponent implements OnInit {
  fromDate = formatDate(new Date().setFullYear(new Date().getFullYear() - 5), 'yyyy-MM-dd', 'en');
  toDate = formatDate(new Date(), 'yyyy-MM-dd', 'en');

  constructor(private statisticsFilterService: StatisticsFilterService, public loaderService: LoaderService) { }

  ngOnInit(): void {
  }

  submitFilter(form: NgForm): void {
    const from = formatDate(form.value.from._d, 'yyyy-MM-dd', 'en');
    const to = formatDate(form.value.to._d, 'yyyy-MM-dd', 'en');
    const approved = form.value.approved;
    const inUse = form.value.inUse;
    console.log('From: ', from);
    console.log('To: ', to);
    console.log('Approved: ', approved);
    console.log('InUse: ', inUse);
    this.statisticsFilterService.onStatisticsComponent(from, to, approved, inUse);
  }
}
