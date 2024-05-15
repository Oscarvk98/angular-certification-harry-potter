import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class MovieService {
  constructor(private http: HttpClient) {}

  getMovies() {
    return this.http.get<Movie[]>('/movies');
  }

  getMovieById(movieId: string) {
    return this.http.get<MovieDetail>(`/movies/${movieId}`);
  }
}

export interface Movie {
  id: string;
  title: string
  duration: string;
  budget: string;
  release_date: string;
}

export interface MovieDetail extends Movie {
  box_office: string;
  cinematographers: string[];
  poster: string;
  producers: string[];
  summary: string;
}
