import { Component, OnInit } from '@angular/core';
import { Movie, MovieService } from '../../services/movie-service.service';
import { Subject, takeUntil } from 'rxjs';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { Router } from '@angular/router';

@Component({
  selector: 'app-movie-list',
  standalone: true,
  imports: [MatFormFieldModule, MatInputModule],
  templateUrl: './movie-list.component.html',
  styleUrl: './movie-list.component.scss',
  providers: [MovieService],
})
export class MovieListComponent implements OnInit {
  constructor(private movieService: MovieService, private router: Router) {}

  private unsubscribe$ = new Subject<void>();

  movies: Movie[] = [];

  ngOnInit(): void {
    this.getMovieList();
  }

  getMovieList() {
    this.movieService
      .getMovies()
      .pipe(takeUntil(this.unsubscribe$))
      .subscribe((movies) => {
        this.movies = movies;
      });
  }

  onTitleChange(value: unknown) {
    console.log(value);
  }

  onDateChange(value: unknown) {
    console.log('Fecha cambiada');
  }

  onButtonClicked(id: string) {
    this.router.navigate(['/movie-detail']);
  }

  ngOnDestroy() {
    this.unsubscribe$.next();
    this.unsubscribe$.complete();
  }
}
