import { Component, OnDestroy, OnInit } from '@angular/core';
import { MenuService } from 'src/app/servicios/menu.service';

@Component({
  selector: 'app-error',
  templateUrl: './error.component.html',
  styleUrls: ['./error.component.css']
})
export class ErrorComponent{

constructor(private menuService : MenuService){}

}
