import { AVAILABLE_COLORS, COLORS_CONFIG } from '../constants/color';
import { createComponentHandler } from '../utils/component';
import { eventEmitter, EVENTS } from '../utils/event-emitter';

class ColorButtonsComponent {
  #ui;
  #gameState;

  constructor({ gameState }) {
    this.#gameState = gameState;

    this.#ui = document.querySelectorAll('.color-selector-button');

    this.#setColors(AVAILABLE_COLORS);
    this.#disable();

    this.#ui.forEach((element, index) => {
      const color = AVAILABLE_COLORS[index];

      element.style.backgroundColor = COLORS_CONFIG[color].background;
      element.style.borderColor = COLORS_CONFIG[color].border;

      element.addEventListener('click', () => {
        if (!this.#gameState.isGameStarted) return;

        this.#gameState.checkAnswer(AVAILABLE_COLORS[index]);
      });
    });

    eventEmitter.addHandler(EVENTS.GAME_STARTED, this.handleGameStarted);
    eventEmitter.addHandler(EVENTS.GAME_STOPED, this.handleGameStoped);
  }

  handleGameStarted = createComponentHandler(() => {
    this.#enable();
  }, this);

  handleGameStoped = createComponentHandler(() => {
    this.#disable();
  }, this);

  #setColors(colors) {
    this.#ui.forEach((element, index) => {
      const color = colors[index];

      element.style.backgroundColor = COLORS_CONFIG[color].background;
      element.style.borderColor = COLORS_CONFIG[color].border;
    });
  }

  #disable() {
    this.#ui.forEach((element) => {
      element.disabled = true;
    });
  }

  #enable() {
    this.#ui.forEach((element) => {
      element.disabled = false;
    });
  }
}

export { ColorButtonsComponent };
