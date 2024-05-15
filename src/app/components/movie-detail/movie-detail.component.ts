import { Component, OnInit } from '@angular/core';
import { Subject, takeUntil } from 'rxjs';
import {
  MovieDetail,
  MovieService,
} from '../../services/movie-service.service';
import { Router } from '@angular/router';
import { IdSelectionService } from '../../services/id-selection.service';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';

@Component({
  selector: 'app-movie-detail',
  standalone: true,
  imports: [MatProgressSpinnerModule],
  templateUrl: './movie-detail.component.html',
  styleUrl: './movie-detail.component.scss',
  providers: [MovieService],
})
export class MovieDetailComponent implements OnInit {
  constructor(
    private movieService: MovieService,
    private router: Router,
    private idSelectionService: IdSelectionService
  ) {}
  private unsubscribe$ = new Subject<void>();

  movie: MovieDetail = {
    id: '',
    title: '',
    duration: '',
    budget: '',
    release_date: '',
    box_office: '',
    cinematographers: [],
    poster: '',
    producers: [],
    summary: '',
  };

  showComponent: boolean = false;

  ngOnInit(): void {
    this.getMovie();
  }

  getMovie() {
    this.idSelectionService
      .getIdSelection()
      .pipe(takeUntil(this.unsubscribe$))
      .subscribe((id) => {
        this.movieService
          .getMovieById(id)
          .pipe(takeUntil(this.unsubscribe$))
          .subscribe((movie) => {
            this.movie = movie;
            this.showComponent = true;
          });
      });
  }

  formatDuration(value: string) {
    const duration = parseInt(value);
    const hours = Math.floor(duration / 60);
    const minutes = duration % 60;
    return hours.toString() + 'h ' + minutes.toString() + 'min';
  }

  onButtonClick() {
    this.router.navigate(['/movie-list']);
  }
}
