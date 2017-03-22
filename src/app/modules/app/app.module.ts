import { NgModule, ApplicationRef } from '@angular/core';
import { RouterModule, PreloadAllModules } from '@angular/router';
import { BrowserModule } from '@angular/platform-browser';

import { CoursesModule } from '../courses/courses.module';
import { AppComponent } from './app.component';
import { NoContentComponent } from './no-content/no-content.component';
import { AppHeaderComponent } from './app-header/app-header.component';
import { AppFooterComponent } from './app-footer/app-footer.component';
import { BreadcrumbsComponent } from './app-header/breacrumbs/breadcrumbs.component';
import { LoadBlockComponent } from './load-block/load-block.component';
import { AppCommonModule } from '../app-common/app-common.module';
import { LoginModule } from '../login/login.module';

import { CoursesService } from '../../services/courses-service';
import { AuthService } from '../../services/auth-service';
import { StorageService } from '../../services/storage-service';
import { LoadBlockService } from '../../services/load-block';

import { ROUTES } from './app.routes';

@NgModule({
  bootstrap: [AppComponent],
  declarations: [
    AppComponent,
    AppHeaderComponent,
    BreadcrumbsComponent,
    AppFooterComponent,
    LoadBlockComponent,
    NoContentComponent
  ],
  imports: [
    BrowserModule,
    RouterModule.forRoot(ROUTES, {useHash: true, preloadingStrategy: PreloadAllModules}),
    CoursesModule,
    AppCommonModule,
    LoginModule
  ],
  providers: [
    CoursesService,
    AuthService,
    StorageService,
    LoadBlockService
  ]
})
export class AppModule {
  constructor(public appRef: ApplicationRef) {
  }
}
