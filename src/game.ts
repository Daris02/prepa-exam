import { Direction } from "./direction";
import { GameState } from "./gameState";
import { Point } from "./point";
import { Snake } from "./snake";
import { SnakeBuilder } from "./snakeBuilder";

export class Game {
  private gridSize: number;
  private _snake: Snake;
  private _food: Point;
  private _gameState: GameState;

  get snake() {
    return this._snake;
  }

  get food() {
    return this._food;
  }

  get gameState() {
    return this._gameState;
  }

  constructor() {
    this.gridSize = 10;
    this._snake = new SnakeBuilder(
      new Point(Math.floor(Math.random() * 10), Math.floor(Math.random() * 10)),
      3,
      Direction.DOWN
    ).build();
    this._food = this.generateFood();
    this._gameState = new GameState(this);
  }

  private generateFood(): Point {
    let foodPosition: Point;
    do {
      foodPosition = new Point(
        Math.floor(Math.random() * this.gridSize),
        Math.floor(Math.random() * this.gridSize)
      );
    } while (this._snake.collidesWith(foodPosition));
    return foodPosition;
  }

  public startGame(): void {
    this._gameState.running();
    this.gameLoop();
  }

  private gameLoop(): void {
    setInterval(() => {
      if (this._gameState.isRunning()) {
        this._snake.move();
        if (this._snake.eat(this.food)) {
          this._food = this.generateFood();
        }
        if (this._snake.checkCollision(this.gridSize)) {
          this._gameState.gameOver();
        }
        this.render();
      }
    }, 1000);
  }

  private render(): void {
    const grid: string[][] = Array.from({ length: this.gridSize }, () =>
      Array.from({ length: this.gridSize }, () => ".")
    );

    // Place la nourriture
    grid[this._food.y][this._food.x] = "@";

    // Place le corps du serpent
    for (const [i, segment] of this._snake.getBody.entries()) {
      if (
        segment.y >= 0 &&
        segment.y < this.gridSize &&
        segment.x >= 0 &&
        segment.x < this.gridSize
      ) {
        grid[segment.y][segment.x] = i === 0 ? "*" : "#";
      }
    }

    // Efface la console et affiche la grille
    console.clear();
    for (const row of grid) {
      console.log(row.join(" "));
    }
  }

  public changeDirection(direction: Direction): void {
    this._snake.changeDirection(direction);
  }
}
