const { EVENTS, eventEmitter } = require('../utils/event-emitter');

class RatingListComponent {
  #ui;
  #gameState;

  constructor({ gameState }) {
    this.#gameState = gameState;

    this.#ui = document.getElementById('#rating-list');
    this.#render();

    eventEmitter.addHandler(EVENTS.RATING_UPDATED, this.handleRatingUpdated);
  }

  handleRatingUpdated() {
    this.#render(this.#gameState.score);
  }

  #render() {
    const rating = this.#gameState.rating;

    if (rating.length) {
      this.#ui.rating.innerHTML = rating.reduce((html, currentValue, index) => {
        return (
          html +
          `<div class="rating-list-item-block"><div>#${
            index + 1
          }</div><div>${currentValue} points</div></div>`
        );
      }, '');
    } else {
      this.#ui.rating.innerHTML = 'No results yet';
    }
  }
}

module.exports = { RatingListComponent };
