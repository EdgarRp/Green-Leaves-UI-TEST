import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';

import { AppComponent } from './app.component';
import { SingleCardModule } from './layouts/single-card/single-card/single-card.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HttpClientModule } from '@angular/common/http';
import { FooterModule } from './layouts/footer/footer.component';
import { ExpireTokenModule } from './pages/expire-token/expire-token.component';
import { AuthService, ScreenService} from './shared/services';

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    SingleCardModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    HttpClientModule,
    ExpireTokenModule,
    FooterModule
    
  ],
  providers: [AuthService, ScreenService],
  bootstrap: [AppComponent]
})
export class AppModule { }
