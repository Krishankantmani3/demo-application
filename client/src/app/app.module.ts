import { BrowserModule } from '@angular/platform-browser';
import { Inject, NgModule } from '@angular/core';
import { AppComponent } from './app.component';
import { routes } from './app.routes';
import { RouterModule } from '@angular/router';
import { HttpClientModule } from '@angular/common/http';
import { AuthGuard } from './shared/guards/auth-guard.service';
import { HttpService } from './shared/service/http.service';
import { AppState } from './app.service';
@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    RouterModule.forRoot(routes, { relativeLinkResolution: 'legacy' })
  ],
  providers: [
    AuthGuard, 
    HttpService,
    AppState
  ],
  bootstrap: [AppComponent]
})
export class AppModule { 

  constructor(){

  }
}
