import { ENVIRONMENT_INITIALIZER, importProvidersFrom, inject } from '@angular/core';
import { Router, Routes } from '@angular/router';
import { EffectsModule } from '@ngrx/effects';
import { StoreModule } from '@ngrx/store';
import { AuthService } from '../shared/logic-auth/auth-service/auth.service';
import { FlightBookingComponent, FlightEditComponent, FlightSearchComponent } from './feature-flight';
import { resolveFlight } from './logic-flight';
import { TicketEffects } from './logic-flight/+state/effects';
import { ticketFeature } from './logic-flight/+state/reducer';


export const BOOKING_ROUTES: Routes = [
  {
    path: '',
    providers: [
      importProvidersFrom(
        StoreModule.forFeature(ticketFeature),
        EffectsModule.forFeature([TicketEffects]),
      ),
      {
        provide: ENVIRONMENT_INITIALIZER,
        multi: true,
        useValue: () => {
          console.log('BOOKING INIT');
        }
      },
      /* provideHttpClient(
        withInterceptors([
          logInterceptor
        ]),
        withRequestsMadeViaParent()
      ), */
    ],
    component: FlightBookingComponent,
    canMatch: [
      () => inject(AuthService).isLoggedIn.value || inject(Router).createUrlTree(['/home'])
    ],
    children: [
      {
        path: '',
        redirectTo: 'flight',
        pathMatch: 'full'
      },
      {
        path: 'flight',
        children: [
          {
            path: '',
            redirectTo: 'search',
            pathMatch: 'full'
          },
          {
            path: 'search',
            component: FlightSearchComponent,
          },
          {
            path: 'edit/:id',
            component: FlightEditComponent,
            resolve: {
              flight: resolveFlight
            }
          }
        ]
      }
    ]
  }
];
