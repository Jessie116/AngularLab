import {Component, OnInit} from '@angular/core';
import {DatabaseService} from '../database.service';

@Component({
  selector: 'app-actor',
  templateUrl: './actor.component.html',
  styleUrls: ['./actor.component.css']
})
export class ActorComponent implements OnInit {

  actorsDB: any[] = [];
  movieDB: any[] = [];
  section = 1;
  fullName = '';
  bYear = 0;
  actorId = '';
  movieId = '';
  movieTitle = '';
  movieYear = 0;
  year= 0;

  constructor(private dbService: DatabaseService) {
  }

  ngOnInit() {
    this.onGetActors();
    this.onGetMovies();
  }

  onAddMovie() {
    const obj = {title: this.movieTitle, year: this.movieYear};
    this.dbService.createMovie(obj).subscribe(result => {
      this.changeSection(1);
      this.onGetMovies();
    });
  }

  onGetMovies() {
    this.dbService.getMovies().subscribe((data: any[]) => {
      this.movieDB = data;
    });
  }

  onAddActor() {
    const obj = {_id: this.actorId, movies: this.movieId};
    this.dbService.addActor(obj).subscribe(result => {
      this.changeSection(1);
      this.onGetActors();
      this.onGetMovies();
    });
  }

  onDeleteMovie(id) {
    this.dbService.deleteMovie(id).subscribe(result => {
      this.onGetMovies();
      this.onGetActors();
    });
  }

  changeSection(sectionId) {
    this.section = sectionId;
    this.resetValues();
  }

  resetValues() {
    this.fullName = '';
    this.bYear = 0;
    this.actorId = '';
    this.movieTitle = '';
    this.movieYear = 0;
  }

  // Get all Actors
  onGetActors() {
    this.dbService.getActors().subscribe((data: any[]) => {
      this.actorsDB = data;
    });
  }

  // Create a new Actor, POST request
 
  onSaveActor() {
    let obj = { name: this.fullName, bYear: this.bYear };
    this.dbService.createActor(obj).subscribe(result => {
      this.onGetActors();
    });
  }

  // Update an Actor
  onSelectUpdate(item) {
    this.fullName = item.name;
    this.bYear = item.bYear;
    this.actorId = item._id;
  }

  onUpdateActor() {
    const obj = {name: this.fullName, bYear: this.bYear};
    this.dbService.updateActor(this.actorId, obj).subscribe(result => {
      this.onGetActors();
      this.onGetMovies();
    });
  }

  // Delete Actor
  onDeleteActor(item) {
    this.dbService.deleteActor(item._id).subscribe(result => {
      this.onGetActors();
      this.onGetMovies();
    });
  }


  //Delete All movies produced before year 
  onDeletemoviesByear(){
  this.dbService.deleteYear(this.year).subscribe(result => {
      this.onGetMovies();
      
      
    });

  }

  
}
