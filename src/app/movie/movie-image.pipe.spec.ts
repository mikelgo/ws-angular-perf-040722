import { MovieImagePipe } from './movie-image.pipe';

describe('MovieImagePipe', () => {
  it('should create an instance', () => {
    const pipe = new MovieImagePipe();
    expect(pipe).toBeTruthy();
  });

  it('should return an image path', () => {
    // arrange
    const pipe = new MovieImagePipe();
    const value = 'imagePath';
    const expectedResult = `https://image.tmdb.org/t/p/w300/${value}`;

    // act
    const imagePath = pipe.transform(value);

    // assert
    expect(imagePath).toBe(expectedResult);
  });

  it('should respect width parameter', () => {
    // arrange
    const pipe = new MovieImagePipe();

    const value = 'imagePath';
    const width = 250;

    const expectedResult = `https://image.tmdb.org/t/p/w${width}/${value}`;

    // act
    const imagePath = pipe.transform(value, width);

    // assert
    expect(imagePath).toBe(expectedResult);
  });

  it('should return a placeholder', () => {
    // arrange
    const pipe = new MovieImagePipe();
    const expectedResult = '/assets/images/no_poster_available.jpg';

    // act
    const imagePath = pipe.transform();

    // assert
    expect(imagePath).toBe(expectedResult);
  });
});
