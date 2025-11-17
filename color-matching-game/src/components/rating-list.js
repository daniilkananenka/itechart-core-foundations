class RatingListComponent {
  #ui;
  #gameState;

  constructor({ gameState }) {
    this.#gameState = gameState;

    this.#ui = document.querySelector('#rating-list');
    this.#render();

    eventEmitter.addHandler(EVENTS.RATING_UPDATED, this.handleRatingUpdated);
  }

  handleRatingUpdated = createComponentHandler(() => {
    this.#render(this.#gameState.score);
  }, this);

  #render() {
    const rating = this.#gameState.rating;

    if (rating.length) {
      this.#ui.innerHTML = rating.reduce((html, currentValue, index) => {
        return (
          html +
          `<div class="rating-list-item-block"><div>#${
            index + 1
          }</div><div>${currentValue} points</div></div>`
        );
      }, '');
    } else {
      this.#ui.innerHTML = 'No results yet';
    }
  }
}
