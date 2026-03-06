import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class NasaService {
  private apiKey = 'quEG99WNGl4uakUGPfxzZJpILhJDnJwg1adiKEmc';

  constructor(private http: HttpClient) { }

  getApod(): Observable<any> {
    return this.http.get(`https://api.nasa.gov/planetary/apod?api_key=${this.apiKey}`);
  }

  getMarsPhotos(rover: string = 'curiosity', sol: number = 1000): Observable<any> {
    return this.http.get(`https://api.nasa.gov/mars-photos/api/v1/rovers/${rover}/photos?sol=${sol}&api_key=${this.apiKey}`);
  }

  saveFavorite(photo: any) {
    const favs = JSON.parse(localStorage.getItem('favs') || '[]');
    if (!favs.find((f: any) => f.id === photo.id)) {
      favs.push(photo);
      localStorage.setItem('favs', JSON.stringify(favs));
    }
  }

  getFavorites() {
    return JSON.parse(localStorage.getItem('favs') || '[]');
  }
}