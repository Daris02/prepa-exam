import { Direction } from "./direction";
import { Point } from "./point";
import { Snake } from "./snake";

export class SnakeBuilder {
  private initialPosition: Point;
  private initialLength: number;
  private initialDirection: Direction;

  constructor(initialPosition: Point, initialLength: number, initialDirection: Direction) {
    this.initialPosition = initialPosition;
    this.initialLength = initialLength;
    this.initialDirection = initialDirection;
  }

  build(): Snake {
    const snake = new Snake(this.initialPosition, 3,this.initialDirection);
    for (let i = 1; i < this.initialLength; i++) {
      snake.croissance();
    }
    return snake;
  }
}