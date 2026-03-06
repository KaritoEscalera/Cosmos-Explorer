import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClientModule, HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [CommonModule, HttpClientModule],
  templateUrl: './app.component.html',
  styleUrls: ['./app.css']
})
export class AppComponent implements OnInit {
  view: string = 'home';
  apod: any = null;
  marsPhotos: any[] = [];
  cargando: boolean = false;

  constructor(private http: HttpClient) {}

  ngOnInit() {

    this.http.get('https://api.nasa.gov/planetary/apod?api_key=DEMO_KEY')
      .subscribe(data => this.apod = data);
  }

  loadMars(rover: string) {
    this.view = 'gallery';
    this.cargando = true;
    this.marsPhotos = []; 
    

    const url = `https://api.nasa.gov/mars-photos/api/v1/rovers/${rover}/photos?sol=1000&api_key=DEMO_KEY`;
    
    this.http.get<any>(url).subscribe({
      next: (data) => {
        this.marsPhotos = data.photos;
        this.cargando = false;
        if(this.marsPhotos.length === 0) alert('No se encontraron fotos hoy.');
      },
      error: (err) => {
        this.cargando = false;
        alert('Error conectando con la NASA');
      }
    });
  }
}