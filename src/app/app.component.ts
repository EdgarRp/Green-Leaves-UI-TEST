import { Component, HostBinding } from '@angular/core';
import { AppInfoService } from './shared/services/appInfo.service';
import { AuthService, ScreenService} from './shared/services';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {

  //#region Vars
  title = 'greanleaves';
  versionApi : string;
  @HostBinding('class') get getClass() {
    return Object.keys(this.screen.sizes).filter(cl => this.screen.sizes[cl]).join(' ');
  } 
  //#endregion

  /**
   *
   */
  constructor(public appInfo : AppInfoService, private auth : AuthService, private screen: ScreenService) {
    this.appInfo.ApiVersion().subscribe( version => {
        this.versionApi = version;
    },error => {
      console.error('can not get API version', error)
    })
    
  }

  isAuth(){
    //Esto no es lo mas correcto, lo ideal seria tener un login, pero la app es sencilla
    //sin embargo lo incluyo por la autenticación
    return this.auth.isLoggedIn;
  }
}
