import { Component, OnInit } from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { Movie, MovieService } from '../../services/movie-service.service';
import { Subject, takeUntil } from 'rxjs';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { Router } from '@angular/router';
import { IdSelectionService } from '../../services/id-selection.service';

@Component({
  selector: 'app-movie-list',
  standalone: true,
  imports: [MatFormFieldModule, MatInputModule, ReactiveFormsModule],
  templateUrl: './movie-list.component.html',
  styleUrl: './movie-list.component.scss',
  providers: [MovieService],
})
export class MovieListComponent implements OnInit {
  constructor(
    private movieService: MovieService,
    private router: Router,
    private formBuilder: FormBuilder,
    private idSelectionService: IdSelectionService
  ) {}

  private unsubscribe$ = new Subject<void>();

  movies: Movie[] = [];
  filteredMovies: Movie[] = [];
  moviesForm!: FormGroup;

  ngOnInit(): void {
    this.initForm();
    this.getMovieList();
  }

  initForm() {
    this.moviesForm = this.formBuilder.group({
      title: '',
      date: '',
    });
  }

  getMovieList() {
    this.movieService
      .getMovies()
      .pipe(takeUntil(this.unsubscribe$))
      .subscribe((movies) => {
        this.movies = movies;
        this.filteredMovies = movies;
      });
  }

  formatDuration(value: string) {
    const duration = parseInt(value);
    const hours = Math.floor(duration/60);
    const minutes = duration%60;
    return hours.toString()+'h '+minutes.toString()+'min';
  }

  filterMovie() {
    if (this.moviesForm.get('date')?.value) {
      this.filteredMovies = this.movies.filter(
        (movie) =>
          movie.title
            .toLowerCase()
            .includes(this.moviesForm.get('title')?.value.toLowerCase()) &&
          movie.release_date.includes(this.moviesForm.get('date')?.value)
      );
    } else {
      this.filteredMovies = this.movies.filter(
        (movie) =>
          movie.title.toLowerCase().includes(this.moviesForm.get('title')?.value.toLowerCase())
      );
    }
  }

  onButtonClicked(id: string) {
    this.idSelectionService.setIdSelection(id);
    this.router.navigate(['/movie-detail']);
  }

  ngOnDestroy() {
    this.unsubscribe$.next();
    this.unsubscribe$.complete();
  }
}
