import {Injectable} from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';

const httpOptions = {
  headers: new HttpHeaders({'Content-Type': 'application/json'}),
};

@Injectable({
  providedIn: 'root'
})

export class DatabaseService {

  constructor(private http: HttpClient) {
  }

  result: any;

  getActors() {
    return this.http.get('/actors');
  }

  getActor(id: string) {
    const url = '/actors/' + id;
    return this.http.get(url);
  }

  createActor(data) {
    return this.http.post('/actors', data, httpOptions);
  }

  updateActor(id, data) {
    const url = '/actors/' + id;
    return this.http.put(url, data, httpOptions);
  }

  deleteActor(id) {
    const url = '/actors/' + id;
    return this.http.delete(url, httpOptions);
  }

  createMovie(data) {
    return this.http.post('/movies', data, httpOptions);
  }

  getMovies() {
    return this.http.get('/movies');
  }

  addActor(data) {
    return this.http.put('/actors/' + data._id + '/' + data.movies, httpOptions);
  }

  deleteMovie(id) {
    return this.http.delete('/movies/' + id, httpOptions);
  }

  deleteYear(year){
    const url = '/movie/actors/' + year;
    return this.http.delete(url, httpOptions);
  }
  

}
