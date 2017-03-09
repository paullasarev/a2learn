import {
  NgModule,
  ApplicationRef
} from '@angular/core';

import {
  RouterModule,
  PreloadAllModules
} from '@angular/router';

import { BrowserModule } from '@angular/platform-browser';

import { CoursesModule } from '../courses/courses.module';
import { AppComponent } from './app.component';
import { NoContentComponent } from './no-content/no-content.component';
import { AppHeaderComponent } from './app-header/app-header.component';
import { AppFooterComponent } from './app-footer/app-footer.component';
import { AppCommonModule } from '../app-common/app-common.module';

import { ROUTES } from './app.routes';


@NgModule({
  bootstrap: [AppComponent],
  declarations: [
    AppComponent,
    AppHeaderComponent,
    AppFooterComponent,
    NoContentComponent
  ],
  imports: [ // import Angular's modules
    BrowserModule,
    RouterModule.forRoot(ROUTES, {useHash: true, preloadingStrategy: PreloadAllModules}),
    CoursesModule,
    AppCommonModule,
  ],
  providers: [ // expose our Services and Providers into Angular's dependency injection
  ]
})
export class AppModule {

  constructor(public appRef: ApplicationRef) {
  }
}