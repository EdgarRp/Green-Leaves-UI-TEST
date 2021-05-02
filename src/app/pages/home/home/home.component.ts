import { Component, Injectable, OnInit } from '@angular/core';
import { FormControl, FormGroup, ValidationErrors, Validators } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { City } from 'src/app/shared/models/city';
import { User } from 'src/app/shared/models/user';
import { AccountService } from 'src/app/shared/services/account.service';
import { constants } from 'src/environments/constants';


@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

  //#region  Vars
  _formGroup : FormGroup;
  _model : User;
  _leyend_mail : string;
  _leyend_phone : string;
  _cities : City[];
  _minDate : Date;
  _maxDate : Date;
  _siteKey : string;
  _btnsend = false;
  //#endregion
  
  constructor(private account : AccountService, public dialog: MatDialog, private dataDialog : DataDialog, private _snackBar: MatSnackBar) { 
    this.InitCities();
    this._leyend_mail = "Campo requerido";
    this._leyend_phone = "Campo requerido";

    this._maxDate = new Date();
    this._minDate = new Date(this._maxDate.getFullYear() - 100, this._maxDate.getMonth(), this._maxDate.getDate());
  
    this._siteKey = "6Le95boaAAAAAGomOWDadfyxV6oTG0htVQrEwcdL";
  }

  ngOnInit(): void {
    this._formGroup = new FormGroup({
      name: new FormControl('', [Validators.required]),
      email: new FormControl('', [Validators.required, Validators.email]),
      phone: new FormControl('', [Validators.required, Validators.pattern('^[+]*[(]{0,1}[0-9]{1,4}[)]{0,1}[-\s\./0-9]*$')]),
      date: new FormControl('', [Validators.required]),
      city: new FormControl('', [Validators.required]),
      recaptcha: new FormControl(['', Validators.required])
    });
    
  }

  //#region LogEvent
  logEvent(action: string, event : any){
    switch (action) {
      case 'send':
        //console.log(event);
        break;
      case 'submit' : 
        this.Send(this._formGroup);
        break;
      case 'valid':
        return this.ValidateForm(event);
      case 'onCaptchaSuccess' :
        this._btnsend = !this._btnsend;
        break;
      case 'onCaptchaExpire' :
        this._btnsend = false;
        break;
    
      default:
        break;
    }
  }
  //#endregion

  //#region Aux methods
  ValidateForm(field:string){
    if(typeof(field) == "string"){
      let isValid = this._formGroup.get(field).hasError(constants.required);

      if(field == 'email' && !isValid){
        isValid = this._formGroup.get(field).hasError('email');
        this._leyend_mail = (isValid) ? "no valido" : "Campo requerido";
        
      }else if (field == 'phone' && !isValid){
        isValid = this._formGroup.get(field).hasError('pattern');
        this._leyend_phone = (isValid) ? "no valido" : "Campo requerido";
        
      }
      return isValid
    }
  }

  Send(form: FormGroup){
    if(form.valid && this._btnsend){
      this._model = this._formGroup.value;
      this.account.SendMail(this._model).subscribe(sendit => {
        if(sendit == true){
          this._snackBar.open(constants.success_send_mail, 'listo!');
        }
      }, error => {
        
        this._snackBar.open(constants.error_send_mail, null);
        console.error('email no enviado', error);
      })
    }else{
      this.setErrors();

      const dialogRef = this.dialog.open(DialogContent);
      dialogRef.afterClosed().subscribe(result => {
        console.log(`Dialog result: ${result}`);
      });
    }

  }

  InitCities(){
    this.account.GetCities().subscribe(cities => {
      if(null != cities){
        this._cities = cities;
      }
    }, error => {
      console.error('No se pudo consultar ciudades', error);
      
    })
  }

  setErrors() {
    let data : string[] = [];
    Object.keys(this._formGroup.controls).forEach(key => {
    const controlErrors: ValidationErrors = this._formGroup.get(key).errors;
    if (controlErrors != null) {
          Object.keys(controlErrors).forEach(keyError => {
            data.push(this.SwitchName(key) +" "+ ((keyError == "required") ? "es requerido" : "Email no valido"));
          });
        }
      });
      this.dataDialog.data = data;
    }

  SwitchName(name : string){
    switch (name) {
      case 'name':
        return "Nombre"
      case 'email':
        return "E-mail"
      case 'phone':
        return "Telefóno"
      case 'date':
        return "Fecha"
      case 'city':
        return "Ciudad"
      
      default:
        break;
    }

  }
    
  //#endregion
  
}


@Component({
  selector: 'dialog-content',
  templateUrl: 'dialog-content.html',
})
export class DialogContent {
  _listError : string[];
  /**
   *
   */
  constructor(private dialog : DataDialog) {
    this._listError = dialog.data;
  }
}

@Injectable()
export class DataDialog{

  data : any;
   /**
    *
    */
   constructor() {
     this.data = [];
   }
}

