import { HttpErrorResponse } from '@angular/common/http';
import {
  HttpClientTestingModule,
  HttpTestingController,
} from '@angular/common/http/testing';
import { Component } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { MovieModel } from './movie-model';

import { MovieService } from './movie.service';

const mockMovies: MovieModel[] = [
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

describe('MovieService', () => {
  let service: MovieService;
  let httpTestingController: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
    });
    service = TestBed.inject(MovieService);
    // Inject the test controller for each test
    httpTestingController = TestBed.inject(HttpTestingController);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should return movies by category', () => {
    // Arrange
    const expectedUrl = 'https://api.themoviedb.org/3/movie/popular';
    const expectedMethod = 'GET';
    const mockResult = {
      results: mockMovies,
    };

    // act: call the `getMovieList` method
    service.getMovieList('popular').subscribe({
      next: (movies) => {
        // assert that getMovieList will return the mocked movies
        // coming from the http service
        expect(movies).toEqual(mockMovies);
      },
    });

    // The following `expectOne()` will match the request's URL.
    // If no requests or multiple requests matched that URL
    // `expectOne()` would throw.
    const req = httpTestingController.expectOne(expectedUrl);

    // Assert request is GET
    expect(req.request.method).toEqual(expectedMethod);

    // Respond with mock data, causing the observable to resolve.
    req.flush(mockResult);

    // Finally, assert that there are no outstanding requests.
    httpTestingController.verify();
  });

  it('should throw an error', () => {
    // Arrange
    const expectedUrl = 'https://api.themoviedb.org/3/movie/popular';
    const expectedMethod = 'GET';
    // Create mock ProgressEvent with type `error`, raised when something goes wrong
    // at network level. e.g. Connection timeout, DNS error, offline, etc.
    const mockError = new ProgressEvent('error');

    // act: call the `getMovieList` method
    service.getMovieList('popular').subscribe({
      // assert that getMovieList will return the mocked movies
      // coming from the http service
      error: (error: HttpErrorResponse) => {
        expect(error.error).toBe(mockError);
      },
    });

    // The following `expectOne()` will match the request's URL.
    // If no requests or multiple requests matched that URL
    // `expectOne()` would throw.
    const req = httpTestingController.expectOne(expectedUrl);

    // Assert request is GET
    expect(req.request.method).toEqual(expectedMethod);

    // Throw error through http client, causing the observable to raise an error.
    req.error(mockError);

    // Finally, assert that there are no outstanding requests.
    httpTestingController.verify();
  });
});

const componentResponse = mockMovies[0];
const movieId = componentResponse.id;

@Component({
  selector: 'movie-service-test',
  template: `
    <div class="movie" *ngIf="movie$ | async as movie">{{ movie.title }}</div>
  `,
})
class MovieServiceTestComponent {
  movie$ = this.movieService.getMovieById(componentResponse.id);

  constructor(private movieService: MovieService) {}
}

describe('MovieService Integration', () => {
  let service: MovieService;
  let serviceSpy: jest.SpyInstance;
  let fixture: ComponentFixture<MovieServiceTestComponent>;
  let httpTestingController: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      declarations: [MovieServiceTestComponent],
    });
    // setup movieService and serviceSpy
    service = TestBed.inject(MovieService);
    serviceSpy = jest.spyOn(service, 'getMovieById');
    // Inject the http service and test controller for each test
    httpTestingController = TestBed.inject(HttpTestingController);
    // create `MovieServiceComponent`
    fixture = TestBed.createComponent(MovieServiceTestComponent);
    fixture.detectChanges();
  });

  it('can be used by a component', () => {
    // Arrange
    const expectedUrl = `https://api.themoviedb.org/3/movie/${movieId}`;
    const expectedResult = componentResponse;
    const expectedView = componentResponse.title;

    // The following `expectOne()` will match the request's URL.
    // If no requests or multiple requests matched that URL
    // `expectOne()` would throw.
    const req = httpTestingController.expectOne(expectedUrl);

    // Respond with mock data, causing the observable to resolve.
    req.flush(expectedResult);

    // let component render data coming from http
    fixture.detectChanges();

    // Assert that component renders the movies title
    expect(fixture.nativeElement.querySelector('.movie').textContent).toBe(
      expectedView
    );
    expect(serviceSpy).toHaveBeenCalledTimes(1);

    // Finally, assert that there are no outstanding requests.
    httpTestingController.verify();
  });
});
