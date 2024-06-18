import { provideHttpClient, withInterceptors, withInterceptorsFromDi } from "@angular/common/http";
import { ApplicationConfig, importProvidersFrom } from "@angular/core";
import { provideRouter, withComponentInputBinding } from "@angular/router";
import { EffectsModule } from "@ngrx/effects";
import { StoreModule } from "@ngrx/store";
import { APP_ROUTES } from "./app.routes";
import { routerFeature } from "./shared/logic-router-state";
import { SharedModule } from "./shared/shared.module";
import { UiCoreModule } from "./shared/ui-core/ui-core.module";
import { provideConfigState } from "./shared/util-config";
import { authInterceptor } from "./shared/logic-communication/http-interceptors/auth.interceptor";


export const applicationConfig: ApplicationConfig = {
  providers: [
    provideRouter(APP_ROUTES,
      withComponentInputBinding()
    ),
    provideHttpClient(
      withInterceptors([
        authInterceptor
      ]),
      withInterceptorsFromDi()
    ),
    provideConfigState('./assets/config.state.json'),
    importProvidersFrom(
      StoreModule.forRoot(),
      EffectsModule.forRoot(),
      StoreModule.forFeature(routerFeature),
      UiCoreModule,
      SharedModule
    )
  ]
};
