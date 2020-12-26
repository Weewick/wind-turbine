// Http testing module and mocking controller
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';

import { AppServiceService } from './app-service.service';
import { TestBed } from '@angular/core/testing';

describe('AppService', () => {
  let service: AppServiceService;
  let httpMock: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [
        HttpClientTestingModule
      ]
        });
    service = TestBed.inject(AppServiceService);
    httpMock = TestBed.inject(HttpTestingController);
  });

  afterEach(() => {
    httpMock.verify();
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should return URL', () => {
    const from = '2015-01-01';
    const to = '2020-01-01';
    const approved = 'true';
    const inUse = 'true';

    const result = service.getURL(from, to, approved, inUse);
    expect(result).toBe('?from=2015-01-01&to=2020-01-01&approved=true&inUse=true');
  });

  it('should retrieve one Object from the API', () => {
    const id = '2';

    const dummyObject: any = [
      {
        Wka_Id: 2
      }
    ];

    service.getById(id).subscribe(data => {
      expect(data.length).toBe(1);
      expect(data).toEqual(dummyObject);
    });

    const request = httpMock.expectOne('/api/getById?wkaId=' + id);
    expect(request.request.method).toBe('GET');
    request.flush(dummyObject);
  });

  it('should retrieve Coordinates from the API', () => {
    const from = '2015-01-01';
    const to = '2020-01-01';
    const approved = 'true';
    const inUse = 'true';

    const dummyCoordinates: any = [
      {
        Latitude: 52.08686096,
        Longitude: 12.80132349
      },
      {
        Latitude: 52.0906041,
        Longitude: 12.79951897
      }
    ];

    service.getCoordinates(from, to, approved, inUse).subscribe(data => {
      expect(data.length).toBe(2);
      expect(data).toEqual(dummyCoordinates);
    });

    const request = httpMock.expectOne('/api/coordinates' + service.getURL(from, to, approved, inUse));
    expect(request.request.method).toBe('GET');
    request.flush(dummyCoordinates);
  });

  it('should retrieve TotalPower from the API', () => {
    const from = '2015-01-01';
    const to = '2020-01-01';
    const approved = 'true';
    const inUse = 'true';

    const dummyPower: any = [
      {
        Datum: '20151204',
        Leistung: '5684.84',
        Status: 'in Betrieb'
      },
      {
        Datum: '20151207',
        Leistung: '5688.29',
        Status: 'in Betrieb'
      }
    ];

    service.getTotalPower(from, to, approved, inUse).subscribe(data => {
      expect(data.length).toBe(2);
      expect(data).toEqual(dummyPower);
    });

    const request = httpMock.expectOne('/api/graph1' + service.getURL(from, to, approved, inUse));
    expect(request.request.method).toBe('GET');
    request.flush(dummyPower);
  });
  
  it('should retrieve HeightDiameter from the API', () => {
    const from = '2015-01-01';
    const to = '2020-01-01';
    const approved = 'true';
    const inUse = 'true';

    const dummyHeightDiameter: any = [
      {
        Rotordurch: 82, 
        Nabenhoehe: 138, 
        Anzahl: 1
      },
      {
        Rotordurch: 82, 
        Nabenhoehe: 138.38, 
        Anzahl: 5
      },
      {
        Rotordurch: 82, 
        Nabenhoehe: 138.4, 
        Anzahl: 9
      }
    ];

    service.getHeightDiameter(from, to, approved, inUse).subscribe(data => {
      expect(data.length).toBe(3);
      expect(data).toEqual(dummyHeightDiameter);
    });

    const request = httpMock.expectOne('/api/graph2' + service.getURL(from, to, approved, inUse));
    expect(request.request.method).toBe('GET');
    request.flush(dummyHeightDiameter);
  });

  it('should retrieve TopTen from the API', () => {
    const from = '2015-01-01';
    const to = '2020-01-01';
    const approved = 'true';
    const inUse = 'true';

    const dummyTopTen: any = [
      {PLZ: "17291", Leistung: 385.78, Anzahl: 109},
      {PLZ: "14913", Leistung: 136.24, Anzahl: 48},
      {PLZ: "16928", Leistung: 114.2, Anzahl: 36},
      {PLZ: "15236/ 15926", Leistung: 85.65, Anzahl: 30},
      {PLZ: "17337/ 15236", Leistung: 83.25, Anzahl: 23},
      {PLZ: "16356/ 17337", Leistung: 82.9, Anzahl: 23},
      {PLZ: "14822/ 16356", Leistung: 74.9, Anzahl: 23},
      {PLZ: "15926/ 14822", Leistung: 70.35, Anzahl: 22},
      {PLZ: "04895/ 16321", Leistung: 66.08, Anzahl: 20},
      {PLZ: "16321/ 14929", Leistung: 65.63, Anzahl: 20}
    ];

    service.getTopTen(from, to, approved, inUse).subscribe(data => {
      expect(data.length).toBe(10);
      expect(data).toEqual(dummyTopTen);
    });

    const request = httpMock.expectOne('/api/graph3' + service.getURL(from, to, approved, inUse));
    expect(request.request.method).toBe('GET');
    request.flush(dummyTopTen);
  });

  it('should retrieve BoxPlot from the API', () => {
    const from = '2015-01-01';
    const to = '2020-01-01';
    const inUse = 'true';

    const dummyBoxPlot: any = [
      45,
      48,
      52,
      66,
      70
    ];

    service.getBoxPlot(from, to, inUse).subscribe(data => {
      expect(data.length).toBe(5);
      expect(data).toEqual(dummyBoxPlot);
    });

    const request = httpMock.expectOne('/api/graph4' + service.getURL(from, to, 'true', inUse));
    expect(request.request.method).toBe('GET');
    request.flush(dummyBoxPlot);
  });

  it('should retrieve BuildTime from the API', () => {
    const from = '2015-01-01';
    const to = '2020-01-01';
    const inUse = 'true';

    const dummyBuildTime: any = [
      {Datum: "20151223", Baudauer: 457},
      {Datum: "20151230", Baudauer: 539},
      {Datum: "20160105", Baudauer: 280},
      {Datum: "20160114", Baudauer: 434},
      {Datum: "20160129", Baudauer: 542},
      {Datum: "20160219", Baudauer: 744}
    ];

    service.getBuildTime(from, to, inUse).subscribe(data => {
      expect(data.length).toBe(6);
      expect(data).toEqual(dummyBuildTime);
    });

    const request = httpMock.expectOne('/api/graph5' + service.getURL(from, to, 'true', inUse));
    expect(request.request.method).toBe('GET');
    request.flush(dummyBuildTime);
  });
});
