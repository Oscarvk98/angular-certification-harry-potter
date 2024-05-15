import { Component, OnInit } from '@angular/core';
import { Subject, takeUntil } from 'rxjs';
import { MovieDetail, MovieService } from '../../services/movie-service.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-movie-detail',
  standalone: true,
  imports: [],
  templateUrl: './movie-detail.component.html',
  styleUrl: './movie-detail.component.scss',
  providers: [MovieService],
})
export class MovieDetailComponent implements OnInit {
  constructor(private movieService: MovieService, private router: Router) {}
  private unsubscribe$ = new Subject<void>();

  movie: MovieDetail = {
    id: 'e80d5a37-620e-4be2-92b9-fb1f5262494f',
    title: "Harry Potter and the Philosopher's Stone",
    duration: '152',
    budget: '125',
    release_date: '2001-11-04',
    box_office: '1.018',
    cinematographers: ['John Seale'],
    poster:
      'https://www.wizardingworld.com/images/products/films/rectangle-1.png',
    producers: ['Chris Columbus', 'David Heyman', 'Mark Radcliffe'],
    summary:
      'Harry Potter’s dull life is completely changed on his eleventh birthday when a mysterious letter addressed to him arrives in the mail. After finding out about his real parents and a whole hidden wizarding world, he goes on to Hogwarts, his new magical school. From battling a troll to flying on broomsticks to catch golden snitches, Harry’s new life promises to be full of joy and adventure, until he finds out about a certain Dark Lord who murdered his parents is trying to regain power. With his friends Hermione and Ron, Harry sets out to find the philosopher’s stone before Voldemort to prevent his return. After advancing through a particularly difficult set of traps designed by the school, Harry faces the Dark Lord and manages to keep the Philosopher’s Stone safe.',
  };

  ngOnInit(): void {
    this.getMovie();
  }

  getMovie() {}

  onButtonClick() {
    this.router.navigate(['/movie-list']);
  }
}
