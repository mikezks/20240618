import { Component, Injector, OnInit, inject, runInInjectionContext } from '@angular/core';
import { FormControl } from '@angular/forms';
import { Observable, catchError, debounceTime, distinctUntilChanged, filter, of, switchMap, tap } from 'rxjs';
import { Flight, FlightService } from '../../../booking/api-boarding';
import { injectApiUrl } from '../../../shared/util-config';


@Component({
  selector: 'app-departure',
  templateUrl: './departure.component.html'
})
export class DepatureComponent implements OnInit {
  private flightService = inject(FlightService);
  private injector = inject(Injector);

  control = new FormControl('', { nonNullable: true });
  flights$ = this.initFlightsStream();
  loading = false;

  ngOnInit(): void {
    runInInjectionContext(
      this.injector,
      () => inject(FlightService)
    );

    runInInjectionContext(
      this.injector,
      () => injectApiUrl()
    );
  }

  initFlightsStream(): Observable<Flight[]> {
    return this.control.valueChanges.pipe(
      filter(airport => airport.length > 2),
      debounceTime(300),
      distinctUntilChanged(),
      tap(() => this.loading = true),
      switchMap(airport => this.load(airport)),
      tap(() => this.loading = false)
    )
  }

  load(airport: string): Observable<Flight[]> {
    return this.flightService.find(airport, '').pipe(
      catchError(() => of([]))
    );
  }
}
