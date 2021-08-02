import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-plataforma',
  templateUrl: './plataforma.component.html',
  styleUrls: ['./plataforma.component.css']
})
export class PlataformaComponent implements OnInit {

  constructor(private router:Router) { }

  ngOnInit(): void {
  }

  verDetalle(){
    this.router.navigate(['/detalle']);
  }

}
