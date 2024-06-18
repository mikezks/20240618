import { APP_INITIALIZER, EnvironmentProviders, InjectionToken, WritableSignal, inject, makeEnvironmentProviders, signal } from "@angular/core";
import { ConfigState, initialConfigState } from "./config.model";
import { HttpClient } from "@angular/common/http";
import { tap } from "rxjs";


export const CONFIG_STATE = new InjectionToken<WritableSignal<ConfigState>>(
  'CONFIG_STATE',
  { factory: () => signal(initialConfigState) }
);

export function provideConfigState(configUrl: string): EnvironmentProviders {
  return makeEnvironmentProviders([
    {
      provide: APP_INITIALIZER,
      multi: true,
      useFactory: (
        configState = inject(CONFIG_STATE),
        http = inject(HttpClient)
      ) => () =>
        http.get<ConfigState>(configUrl).pipe(
          tap(state => configState.set(state))
        )
    }
  ]);
}

export function injectApiUrl(): string {
  return inject(CONFIG_STATE)().apiUrl;
}
