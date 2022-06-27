import { Component, ViewChild } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { MovieModel } from '../movie-model';
import { MovieModule } from '../movie.module';

import { MovieListComponent } from './movie-list.component';

const movies: MovieModel[] = [
  {
    id: '414906',
    poster_path: '/74xTEgt7R36Fpooo50r9T25onhq.jpg',
    title: 'The Batman',
    vote_average: 7.9,
  },
  {
    id: '606402',
    poster_path: '/7MDgiFOPUCeG74nQsMKJuzTJrtc.jpg',
    title: 'Yaksha: Ruthless Operations',
    vote_average: 6.2,
  },
  {
    id: '799876',
    poster_path: '/lZa5EB6PVJBT5mxhgZS5ftqdAm6.jpg',
    title: 'The Outfit',
    vote_average: 7.1,
  },
  {
    id: '568124',
    poster_path: '/4j0PNHkMr5ax3IA8tjtxcmPU3QT.jpg',
    title: 'Encanto',
    vote_average: 7.7,
  },
  {
    id: '823625',
    poster_path: '/bv9dy8mnwftdY2j6gG39gCfSFpV.jpg',
    title: 'Blacklight',
    vote_average: 6.1,
  },
  {
    id: '696806',
    poster_path: '/wFjboE0aFZNbVOF05fzrka9Fqyx.jpg',
    title: 'The Adam Project',
    vote_average: 7,
  },
];

@Component({
  selector: 'movie-list-test',
  template: `<movie-list [movies]="movies"></movie-list>`,
})
export class MovieListTestComponent {
  @ViewChild(MovieListComponent) movieListComponent;

  movies = movies;
}

describe('MovieListComponent', () => {
  let component: MovieListComponent;
  let fixture: ComponentFixture<MovieListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [RouterTestingModule, MovieModule],
      declarations: [MovieListTestComponent],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(MovieListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should render movie-cards', () => {
    // arrange
    component.movies = movies;
    fixture.detectChanges();
    const movieChildren = Array.from(
      fixture.nativeElement.querySelectorAll('movie-card')
    );

    // act
    // no action required, the framework does it's work

    // assert
    expect(movieChildren.length).toEqual(movies.length);
  });

  it('should navigate on card click', () => {
    // arrange
    component.movies = movies;
    const navigateSpy = jest.spyOn(component, 'navToDetail');
    fixture.detectChanges();
    const movieChild: HTMLElement = fixture.nativeElement.querySelector(
      'movie-card .movie-card'
    ) as HTMLElement;

    // act
    movieChild.click();

    // assert
    expect(navigateSpy).toHaveBeenCalledTimes(1);
  });
});

describe('MovieListComponent integration', () => {
  let component: MovieListTestComponent;
  let fixture: ComponentFixture<MovieListTestComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [RouterTestingModule, MovieModule],
      declarations: [MovieListTestComponent],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(MovieListTestComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be accessible as ViewChild', () => {
    // assert
    expect(fixture.componentInstance).toBeTruthy();
  });

  it('should receive inputs from other components', () => {
    // assert
    expect(fixture.componentInstance.movies).toEqual(movies);
  });

  it('should render movie-cards', () => {
    // arrange
    const movieChildren = Array.from(
      fixture.nativeElement.querySelectorAll('movie-card')
    );

    // act
    // no action required, the framework does it's work

    // assert
    expect(movieChildren.length).toEqual(movies.length);
  });
});
