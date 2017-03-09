import './polyfills';

import {platformBrowserDynamic} from '@angular/platform-browser-dynamic';

import { AppModule } from './app/modules/app/app.module';

platformBrowserDynamic().bootstrapModule(AppModule);
