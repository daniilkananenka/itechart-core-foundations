import { RATING_CONFIG } from '../constants/rating-config';

class RatingManager {
  get() {
    const rawRating = localStorage.getItem(RATING_CONFIG.STORAGE_KEY);

    if (!rawRating) return [];

    const rating = JSON.parse(rawRating);

    if (!this.checkIsValidRating(rating)) return [];

    return this.transformRating(rating);
  }

  update(result: number) {
    const rating = this.get();

    rating.push(result);

    localStorage.setItem(
      RATING_CONFIG.STORAGE_KEY,
      JSON.stringify(this.transformRating(rating))
    );
  }

  private checkIsValidRating(rating: number[]) {
    return (
      rating instanceof Array &&
      rating.reduce(
        (isArrayOfNumbers, currentValue) =>
          isArrayOfNumbers && typeof currentValue === 'number',
        true
      )
    );
  }

  private transformRating(rating: number[]) {
    return rating.toSorted((a, b) => b - a).slice(0, RATING_CONFIG.MAX_SIZE);
  }
}

export { RatingManager };
