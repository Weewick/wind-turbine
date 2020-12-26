import { ComponentFixture, TestBed } from '@angular/core/testing';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { of, throwError } from 'rxjs';

import { StatisticsComponent } from './statistics.component';
import { AppServiceService } from '../../app-service.service';
import { StatisticsFilterService } from './statistics-filter.service';

describe('StatisticsComponent', () => {
  let component: StatisticsComponent;
  let fixture: ComponentFixture<StatisticsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      providers: [ AppServiceService, StatisticsFilterService ],
      imports: [ HttpClientTestingModule ],
      declarations: [ StatisticsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(StatisticsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it("should have defined statisticsFilterService", () => {
    const statisticsFilterService = component["statisticsFilterService"];

    expect(statisticsFilterService.subsVar).toBeDefined();
  });

  it("should call API functions on invokeStatisticsComponentFunction", () => {
    const statisticsFilterService = component["statisticsFilterService"];

    expect(statisticsFilterService.subsVar).toBeDefined();
    
    const from = '2015-01-01';
    const to = '2020-01-01';
    const approved = 'true';
    const inUse = 'true';

    spyOn(statisticsFilterService.invokeStatisticsComponentFunction, 'emit').and.callThrough();
    spyOn(component as any, 'getPowerFromAPI');
    spyOn(component as any, 'getHeightDiameterFromAPI');
    spyOn(component as any, 'getTopTenFromAPI');
    spyOn(component as any, 'getBoxPlotFromAPI');
    spyOn(component as any, 'getBuildTimeFromAPI');
  
    statisticsFilterService.onStatisticsComponent(from, to, approved, inUse);
  
    fixture.detectChanges();
    
    expect(statisticsFilterService.invokeStatisticsComponentFunction.emit)
        .toHaveBeenCalledWith({ from, to, approved, inUse });
    expect((component as any).getPowerFromAPI).toHaveBeenCalledWith(from, to, approved, inUse);
    expect((component as any).getHeightDiameterFromAPI).toHaveBeenCalledWith(from, to, approved, inUse);
    expect((component as any).getTopTenFromAPI).toHaveBeenCalledWith(from, to, approved, inUse);
    expect((component as any).getBoxPlotFromAPI).toHaveBeenCalledWith(from, to, inUse);
    expect((component as any).getBuildTimeFromAPI).toHaveBeenCalledWith(from, to, inUse);
  });

  it("should call API functions on Init", () => {  
    spyOn(component as any, 'getPowerFromAPI');
    spyOn(component as any, 'getHeightDiameterFromAPI');
    spyOn(component as any, 'getTopTenFromAPI');
    spyOn(component as any, 'getBoxPlotFromAPI');
    spyOn(component as any, 'getBuildTimeFromAPI');

    component.ngOnInit()

    expect((component as any).getPowerFromAPI).toHaveBeenCalled();
    expect((component as any).getHeightDiameterFromAPI).toHaveBeenCalled();
    expect((component as any).getTopTenFromAPI).toHaveBeenCalled();
    expect((component as any).getBoxPlotFromAPI).toHaveBeenCalled();
    expect((component as any).getBuildTimeFromAPI).toHaveBeenCalled();
  });

  it("should call getTotalPower from Service on getPowerFromAPI", () => {
    const service = component["service"];
    const from = '2015-01-01';
    const to = '2020-01-01';
    const approved = 'true';
    const inUse = 'true';

    spyOn(component as any, 'getPowerFromAPI').and.callThrough();
    spyOn(service, 'getTotalPower').and.returnValue(of([]));
  
    (component as any).getPowerFromAPI(from, to, approved, inUse);
  
    fixture.detectChanges();

    expect((component as any).getPowerFromAPI).toHaveBeenCalledWith(from, to, approved, inUse);
    expect(service.getTotalPower).toHaveBeenCalledWith(from, to, approved, inUse);
    expect(component.dataList).toEqual([]);
    expect(component.listLength).toEqual(0);
  });

  it("should call getHeightDiameter from Service on getHeightDiameterFromAPI", () => {
    const service = component["service"];
    const from = '2015-01-01';
    const to = '2020-01-01';
    const approved = 'true';
    const inUse = 'true';

    spyOn(component as any, 'getHeightDiameterFromAPI').and.callThrough();
    spyOn(service, 'getHeightDiameter').and.returnValue(of([]));
  
    (component as any).getHeightDiameterFromAPI(from, to, approved, inUse);
  
    fixture.detectChanges();

    expect((component as any).getHeightDiameterFromAPI).toHaveBeenCalledWith(from, to, approved, inUse);
    expect(service.getHeightDiameter).toHaveBeenCalledWith(from, to, approved, inUse);
    expect(component.dataList2).toEqual([]);
    expect(component.listLength2).toEqual(0);
  });

  it("should call getTopTen from Service on getTopTenFromAPI", () => {
    const service = component["service"];
    const from = '2015-01-01';
    const to = '2020-01-01';
    const approved = 'true';
    const inUse = 'true';

    spyOn(component as any, 'getTopTenFromAPI').and.callThrough();
    spyOn(service, 'getTopTen').and.returnValue(of([]));
  
    (component as any).getTopTenFromAPI(from, to, approved, inUse);
  
    fixture.detectChanges();

    expect((component as any).getTopTenFromAPI).toHaveBeenCalledWith(from, to, approved, inUse);
    expect(service.getTopTen).toHaveBeenCalledWith(from, to, approved, inUse);
    expect(component.dataList3).toEqual([]);
    expect(component.listLength3).toEqual(0);
  });

  it("should call getBoxPlot from Service on getBoxPlotFromAPI", () => {
    const service = component["service"];
    const from = '2015-01-01';
    const to = '2020-01-01';
    const inUse = 'true';

    spyOn(component as any, 'getBoxPlotFromAPI').and.callThrough();
    spyOn(service, 'getBoxPlot').and.returnValue(of([]));
  
    (component as any).getBoxPlotFromAPI(from, to, inUse);
  
    fixture.detectChanges();

    expect((component as any).getBoxPlotFromAPI).toHaveBeenCalledWith(from, to, inUse);
    expect(service.getBoxPlot).toHaveBeenCalledWith(from, to, inUse);
    expect(component.boxPlotGraph).toEqual([]);
  });

  it("should call getBuildTime from Service on getBuildTimeFromAPI", () => {
    const service = component["service"];
    const from = '2015-01-01';
    const to = '2020-01-01';
    const inUse = 'true';

    spyOn(component as any, 'getBuildTimeFromAPI').and.callThrough();
    spyOn(service, 'getBuildTime').and.returnValue(of([]));
  
    (component as any).getBuildTimeFromAPI(from, to, inUse);
  
    fixture.detectChanges();

    expect((component as any).getBuildTimeFromAPI).toHaveBeenCalledWith(from, to, inUse);
    expect(service.getBuildTime).toHaveBeenCalledWith(from, to, inUse);
    expect(component.dataList4).toEqual([]);
    expect(component.listLength4).toEqual(0);
  });

  it("should call getTotalPower from Service on getPowerFromAPI and throw error", () => {
    const service = component["service"];
    const from = '2015-01-01';
    const to = '2020-01-01';
    const approved = 'true';
    const inUse = 'true';
    const error = {status: 404};

    spyOn(console, 'log')
    spyOn(component as any, 'getPowerFromAPI').and.callThrough();
    spyOn(service, 'getTotalPower').and.returnValue(throwError(error));
  
    (component as any).getPowerFromAPI(from, to, approved, inUse);
  
    fixture.detectChanges();

    expect((component as any).getPowerFromAPI).toHaveBeenCalledWith(from, to, approved, inUse);
    expect(service.getTotalPower).toHaveBeenCalledWith(from, to, approved, inUse);
    expect(console.log).toHaveBeenCalledWith('Error is ', error);
  });

  it("should call getHeightDiameter from Service on getHeightDiameterFromAPI and throw error", () => {
    const service = component["service"];
    const from = '2015-01-01';
    const to = '2020-01-01';
    const approved = 'true';
    const inUse = 'true';
    const error = {status: 404};

    spyOn(console, 'log')
    spyOn(component as any, 'getHeightDiameterFromAPI').and.callThrough();
    spyOn(service, 'getHeightDiameter').and.returnValue(throwError(error));
  
    (component as any).getHeightDiameterFromAPI(from, to, approved, inUse);
  
    fixture.detectChanges();

    expect((component as any).getHeightDiameterFromAPI).toHaveBeenCalledWith(from, to, approved, inUse);
    expect(service.getHeightDiameter).toHaveBeenCalledWith(from, to, approved, inUse);
    expect(console.log).toHaveBeenCalledWith('Error is ', error);
  });

  it("should call getTopTen from Service on getTopTenFromAPI and throw error", () => {
    const service = component["service"];
    const from = '2015-01-01';
    const to = '2020-01-01';
    const approved = 'true';
    const inUse = 'true';
    const error = {status: 404};

    spyOn(console, 'log')
    spyOn(component as any, 'getTopTenFromAPI').and.callThrough();
    spyOn(service, 'getTopTen').and.returnValue(throwError(error));
  
    (component as any).getTopTenFromAPI(from, to, approved, inUse);
  
    fixture.detectChanges();

    expect((component as any).getTopTenFromAPI).toHaveBeenCalledWith(from, to, approved, inUse);
    expect(service.getTopTen).toHaveBeenCalledWith(from, to, approved, inUse);
    expect(console.log).toHaveBeenCalledWith('Error is ', error);
  });

  it("should call getBoxPlot from Service on getBoxPlotFromAPI and throw error", () => {
    const service = component["service"];
    const from = '2015-01-01';
    const to = '2020-01-01';
    const inUse = 'true';
    const error = {status: 404};

    spyOn(console, 'log')
    spyOn(component as any, 'getBoxPlotFromAPI').and.callThrough();
    spyOn(service, 'getBoxPlot').and.returnValue(throwError(error));
  
    (component as any).getBoxPlotFromAPI(from, to, inUse);
  
    fixture.detectChanges();

    expect((component as any).getBoxPlotFromAPI).toHaveBeenCalledWith(from, to, inUse);
    expect(service.getBoxPlot).toHaveBeenCalledWith(from, to, inUse);
    expect(console.log).toHaveBeenCalledWith('Error is ', error);
  });

  it("should call getBuildTime from Service on getBuildTimeFromAPI and throw error", () => {
    const service = component["service"];
    const from = '2015-01-01';
    const to = '2020-01-01';
    const inUse = 'true';
    const error = {status: 404};

    spyOn(console, 'log')
    spyOn(component as any, 'getBuildTimeFromAPI').and.callThrough();
    spyOn(service, 'getBuildTime').and.returnValue(throwError(error));
  
    (component as any).getBuildTimeFromAPI(from, to, inUse);
  
    fixture.detectChanges();

    expect((component as any).getBuildTimeFromAPI).toHaveBeenCalledWith(from, to, inUse);
    expect(service.getBuildTime).toHaveBeenCalledWith(from, to, inUse);
    expect(console.log).toHaveBeenCalledWith('Error is ', error);
  });
});