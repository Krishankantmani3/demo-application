import { BrowserModule } from '@angular/platform-browser';
import {  NgModule } from '@angular/core';
import { AppComponent } from './app.component';
import { routes } from './app.routes';
import { RouterModule } from '@angular/router';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { AuthGuard } from './shared/guards/auth-guard.service';
import { HttpService } from './shared/service/http.service';
import { AppState } from './app.service';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { AppHttpInterceptor } from './app.http-inceptor';
import { ToastrModule } from 'ngx-toastr';

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    RouterModule.forRoot(routes, { relativeLinkResolution: 'legacy' }),
    BrowserAnimationsModule,
    ToastrModule.forRoot()
  ],
  providers: [
    AuthGuard, 
    HttpService,
    AppState,
    {
      provide: HTTP_INTERCEPTORS,
      useClass: AppHttpInterceptor,
      multi: true
    }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { 

  constructor(){

  }
}
