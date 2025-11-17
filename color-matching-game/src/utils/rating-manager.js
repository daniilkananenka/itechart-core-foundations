import { RATING_CONFIG } from '../constants/rating-config';

class RatingManager {
  /**
   * Returns rating stored in local storage
   * @returns {number[]}
   */
  get() {
    const rating = JSON.parse(localStorage.getItem(RATING_CONFIG.STORAGE_KEY));

    if (!this.#checkIsValidRating(rating)) return [];

    return this.#transformRating(rating);
  }

  /**
   * Stores new result in local storage
   * @param {number} result
   * @returns {void}
   */
  update(result) {
    const rating = this.get();

    rating.push(result);

    localStorage.setItem(
      RATING_CONFIG.STORAGE_KEY,
      JSON.stringify(this.#transformRating(rating))
    );
  }

  /**
   * Сhecks whether the passed array is a valid rating.
   * @param {number[]} rating
   * @returns {boolean}
   */
  #checkIsValidRating(rating) {
    return (
      rating instanceof Array &&
      rating.reduce(
        (isArrayOfNumbers, currentValue) =>
          isArrayOfNumbers && typeof currentValue === 'number',
        true
      )
    );
  }

  /**
   * Sorts rating in descending order and returns its first `RATING_CONFIG.MAX_SIZE` elements.
   * @param {number[]} rating
   * @returns {number[]}
   */
  #transformRating(rating) {
    return rating.toSorted((a, b) => b - a).slice(0, RATING_CONFIG.MAX_SIZE);
  }
}

export { RatingManager };
