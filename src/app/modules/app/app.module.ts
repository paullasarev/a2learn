import { NgModule, ApplicationRef } from '@angular/core';
import { RouterModule, PreloadAllModules } from '@angular/router';
import { BrowserModule } from '@angular/platform-browser';
import { HttpModule, RequestOptions, XHRBackend } from '@angular/http';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';

import { CoursesModule } from '../courses/courses.module';
import { AppComponent } from './app.component';
import { NoContentComponent } from './no-content/no-content.component';
import { AppHeaderComponent } from './app-header/app-header.component';
import { AppFooterComponent } from './app-footer/app-footer.component';
import { BreadcrumbsComponent } from './app-header/breacrumbs/breadcrumbs.component';
import { LoadBlockComponent } from './load-block/load-block.component';
import { CoreModule } from '../core/core.module';
import { LoginModule } from '../login/login.module';

import { CoursesService } from '../../services/courses-service';
import { AuthService } from '../../services/auth-service';
import { StorageService } from '../../services/storage-service';
import { LoadBlockService } from '../../services/load-block';
import { AuthGuard } from '../../services/auth-guard';
import { AuthorizedHttp } from '../../services/authorized-http';
import { AuthorsService } from '../../services/authors-service';

import { ROUTES } from './app.routes';

import { StoreModule } from '@ngrx/store';
import { StoreDevtoolsModule } from '@ngrx/store-devtools';
import { EffectsModule } from '@ngrx/effects';

import { Store } from '@ngrx/store';
import { reducer, AppState } from '../../store/store';
import { AuthEffects } from '../../store/effects/auth';

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
    FormsModule,
    ReactiveFormsModule,
    RouterModule.forRoot(ROUTES, {useHash: true, preloadingStrategy: PreloadAllModules}),
    StoreModule.provideStore(reducer),
    StoreDevtoolsModule.instrumentOnlyWithExtension({maxAge: 15}),
    EffectsModule.run(AuthEffects),
    HttpModule,
    CoursesModule,
    CoreModule,
    LoginModule
  ],
  providers: [
    CoursesService,
    AuthService,
    AuthorsService,
    AuthGuard,
    StorageService,
    LoadBlockService,
    {
      provide: AuthorizedHttp,
      useFactory: (store:Store<AppState>, backend: XHRBackend, options: RequestOptions) => {
        return new AuthorizedHttp(store, backend, options);
      },
      deps: [Store, XHRBackend, RequestOptions]
    }
  ]
})
export class AppModule {
  constructor(public appRef: ApplicationRef) {
  }
}
