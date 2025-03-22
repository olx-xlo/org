import {
  TranslateModule,
  TranslateLoader,
  TranslateService,
} from '@ngx-translate/core';
import { TranslateHttpLoader } from '@ngx-translate/http-loader';
import { HttpClient, provideHttpClient } from '@angular/common/http';
import { applicationConfig, moduleMetadata } from '@storybook/angular';

// Translation loader factory
export function HttpLoaderFactory(http: HttpClient) {
  return new TranslateHttpLoader(http, './assets/i18n/', '.json');
}

export const decorators = [
  applicationConfig({
    providers: [
      provideHttpClient(),
      {
        provide: TranslateLoader,
        useFactory: HttpLoaderFactory,
        deps: [HttpClient],
      },
      TranslateService,
    ],
  }),
  moduleMetadata({
    imports: [TranslateModule.forRoot()],
  }),
];
