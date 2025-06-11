import { Game } from "./game";
import { Direction } from "./direction";
import * as readline from "readline";

function launchGame() {
  const game = new Game();
  game.startGame();

  readline.emitKeypressEvents(process.stdin);
  process.stdin.setRawMode(true);

  process.stdin.on("keypress", (str, key) => {
    if (key.ctrl && key.name === "c") {
      process.exit();
    }
    switch (key.name) {
      case "w":
        game.changeDirection(Direction.UP);
        break;
      case "a":
        game.changeDirection(Direction.LEFT);
        break;
      case "s":
        game.changeDirection(Direction.DOWN);
        break;
      case "d":
        game.changeDirection(Direction.RIGHT);
        break;
    }
  });
}

launchGame();