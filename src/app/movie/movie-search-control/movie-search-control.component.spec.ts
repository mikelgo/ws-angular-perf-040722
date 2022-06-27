import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MovieSearchControlComponent } from './movie-search-control.component';

describe('MovieSearchControlComponent', () => {
  let component: MovieSearchControlComponent;
  let fixture: ComponentFixture<MovieSearchControlComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MovieSearchControlComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(MovieSearchControlComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
