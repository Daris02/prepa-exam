class FoodFactory {
  private gridSize: number;

  constructor(gridSize: number) {
    this.gridSize = gridSize;
  }

  generateFood(snakeBody: Point[]): Point {
    let foodPosition: Point;
    let isValidPosition = false;

    while (!isValidPosition) {
      foodPosition = new Point(
        Math.floor(Math.random() * this.gridSize),
        Math.floor(Math.random() * this.gridSize)
      );

      isValidPosition = !this.isPositionOccupied(foodPosition, snakeBody);
    }

    return foodPosition;
  }

  private isPositionOccupied(position: Point, snakeBody: Point[]): boolean {
    return snakeBody.some(segment => segment.x === position.x && segment.y === position.y);
  }
}