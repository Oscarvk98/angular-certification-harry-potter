import { Routes } from '@angular/router';
import { MovieListComponent } from './components/movie-list/movie-list.component';
import { MovieDetailComponent } from './components/movie-detail/movie-detail.component';

export const routes: Routes = [
  { path: 'movie-list', component: MovieListComponent },
  { path: 'movie-detail', component: MovieDetailComponent },
  { path: '', redirectTo: '/movie-list', pathMatch: 'full' },
];
