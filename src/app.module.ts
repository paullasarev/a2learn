import { BrowserModule } from '@angular/platform-browser';

import {
  NgModule,
  ApplicationRef
} from '@angular/core';

import { ROUTES } from './app.routes';

import { AppComponent } from './app.component';

import {
  RouterModule,
  PreloadAllModules
} from '@angular/router';

import { NoContentComponent } from './pages/no-content';

@NgModule({
  bootstrap: [AppComponent],
  declarations: [
    AppComponent,
    NoContentComponent
  ],
  imports: [ // import Angular's modules
    BrowserModule,
    RouterModule.forRoot(ROUTES, {useHash: true, preloadingStrategy: PreloadAllModules}),
    // HeaderModule,
    // FooterModule,
    // HomeModule,
  ],
  // providers: [ // expose our Services and Providers into Angular's dependency injection
  //   ENV_PROVIDERS,
  //   APP_PROVIDERS
  // ]
})

export class AppModule {

  constructor(public appRef: ApplicationRef) {
  }
}
