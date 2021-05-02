import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { DataDialog, DialogContent, HomeComponent } from "./pages/home/home/home.component";
import { BrowserAnimationsModule } from "@angular/platform-browser/animations";
import {MatInputModule} from '@angular/material/input';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {MatDatepickerModule} from '@angular/material/datepicker';
import { MatNativeDateModule, MAT_DATE_LOCALE } from "@angular/material/core";
import { AuthGuardService} from "./shared/services/auth.service";
import { AppInfoService } from "./shared/services/appInfo.service";
import { AccountService } from "./shared/services/account.service";
import { UserService } from "./shared/services/user.service";
import { ExpireTokenComponent } from "./pages/expire-token/expire-token.component";
import {MatProgressSpinnerModule} from '@angular/material/progress-spinner';
import {MatSnackBarModule, MAT_SNACK_BAR_DEFAULT_OPTIONS} from '@angular/material/snack-bar';
import {MatAutocompleteModule} from '@angular/material/autocomplete';
import {MatDialogModule} from '@angular/material/dialog';
import { NgxCaptchaModule } from "ngx-captcha";

const routes: Routes = [
    {
        path : 'home',
        component : HomeComponent,
        canActivate : [AuthGuardService]
        
    },
    {
        path : 'expire-token',
        component : ExpireTokenComponent,
        canActivate : [AuthGuardService]
    },
    {
        path : '**',
        redirectTo : '/home'
    }
];


@NgModule({
    imports : [
        RouterModule.forRoot(routes),
        BrowserAnimationsModule,
        MatInputModule,
        MatDatepickerModule,
        MatNativeDateModule,
        ReactiveFormsModule,
        MatProgressSpinnerModule,
        MatSnackBarModule,
        MatAutocompleteModule,
        MatDialogModule,
        FormsModule,
        NgxCaptchaModule

        
    ],
    providers : [
        { provide: MAT_DATE_LOCALE, useValue: 'en-GB' },
        {provide: MAT_SNACK_BAR_DEFAULT_OPTIONS, useValue: {duration: 3000}},
        AppInfoService,
        AccountService,
        UserService,
        AuthGuardService,
        DataDialog

    ],
    exports : [RouterModule],
    declarations : [
        HomeComponent,
        DialogContent
    ]
})
export class AppRoutingModule{}