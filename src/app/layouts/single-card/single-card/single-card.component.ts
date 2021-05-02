import { CommonModule } from '@angular/common';
import { Component, NgModule} from '@angular/core';

@Component({
  selector: 'app-single-card',
  templateUrl: './single-card.component.html',
  styleUrls: ['./single-card.component.scss']
})
export class SingleCardComponent {

  constructor() { }

}

@NgModule({
  imports : [CommonModule],
  exports : [SingleCardComponent],
  declarations : [SingleCardComponent]
})
export class SingleCardModule{}
