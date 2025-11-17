const { EVENTS, eventEmitter } = require('../utils/event-emitter')

class ControlButtonComponent {
  #ui

  constructor() {
    this.#ui = document.getElementById('control-button')

    eventEmitter.addHandler(EVENTS.APP_INITIALIZED, this.handleInitialize)
    eventEmitter.addHandler(EVENTS.GAME_STARTED, this.handleStartGame)
    eventEmitter.addHandler(EVENTS.GAME_STOPED, this.handleStopGame)
  }

  handleInitialize() {
    this.#ui.addEventListener('click', () => {
      // Add condition of game state
      eventEmitter.emit(EVENTS.GAME_STARTED)

      eventEmitter.emit(EVENTS.GAME_STOPED)
    })
  }

  handleStartGame() {
    this.#setInnerText('Stop')
  }

  handleStopGame() {
    this.#setInnerText('Start')
  }

  #setInnerText(text) {
    this.#ui.innerText(text)
  }
}

module.exports = { ControlButtonComponent }
