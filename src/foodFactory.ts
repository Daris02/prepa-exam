import { Point } from "./point";
import { Snake } from "./snake";

export class FoodFactory {
  private gridSize: number;

  constructor(gridSize: number) {
    this.gridSize = gridSize;
  }

  generateFood(snake: Snake): Point {
    let foodPosition: Point;
    do {
      foodPosition = new Point(
        Math.floor(Math.random() * this.gridSize),
        Math.floor(Math.random() * this.gridSize)
      );
    } while (
      snake.collidesWith(foodPosition) &&
      snake.getBody.some(
        (segment) =>
          segment.x === foodPosition.x && segment.y === foodPosition.y
      )
      // TODO: Add condition to generate food, more centering and not at edge
    );
    return foodPosition!;
  }
}
