import { Component, OnDestroy, OnInit } from '@angular/core';
import { MenuService } from 'src/app/servicios/menu.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-inicio',
  templateUrl: './inicio.component.html',
  styleUrls: ['./inicio.component.css']
})
export class InicioComponent implements OnInit, OnDestroy{

constructor (
  private menuService: MenuService,
  private router: Router,){}

ngOnInit(): void {
  this.menuService.hide();
}

ngOnDestroy(): void {
  this,this.menuService.display();
}

  
}