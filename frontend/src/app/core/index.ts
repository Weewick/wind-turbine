import { NgModule } from '@angular/core';
import { HTTP_INTERCEPTORS } from '@angular/common/http';
import { LoaderService } from './loader.service';
import { LoaderInterceptor } from './loader.interceptor';

@NgModule({
    providers: [
      LoaderService,
      { provide: HTTP_INTERCEPTORS,
        useClass: LoaderInterceptor,
        multi: true
      }
    ]
})
export class CoreModule {
}

export * from './loader.service';
