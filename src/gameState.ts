import { log } from "console";
import { Game } from "./game";

enum State {
  RUNNING = 'RUNNING',
  PAUSE = 'PAUSE',
  OVER = 'OVER',
}

export class GameState {
  private _game: Game;
  private _state: State;

  constructor(game: Game) {
    this._game = game;
    this._state = State.PAUSE;
  }

  gameOver() {
    this._state = State.OVER;
    log('Game Over !!!');
    process.exit(0);
  }
  isRunning() {
    return this._state == State.RUNNING;
  }
  running() {
    this._state = State.RUNNING;
  }
  
}
