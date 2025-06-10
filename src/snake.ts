import { Direction } from "./direction";
import { Point } from "./point";

export class Snake {
  private corps: Point[];
  private direction: Direction;

  constructor(initialPosition: Point, initialLength: number, initialDirection: Direction) {
    this.corps = Array(initialLength).fill(initialPosition);
    this.direction = initialDirection;
  }

  get getBody() {
    return this.corps;
  }

  croissance() {
    const newHead = this.computeNextPosition();
    this.corps.unshift(newHead);
  }

  avancer() {
    this.corps.pop();
    this.croissance();
  }

  private computeNextPosition(): Point {
    const head = this.corps[0];
    let newX = head.x;
    let newY = head.y;

    switch (this.direction) {
      case Direction.UP:
        newY -= 1;
        break;
      case Direction.DOWN:
        newY += 1;
        break;
      case Direction.LEFT:
        newX -= 1;
        break;
      case Direction.RIGHT:
        newX += 1;
        break;
    }

    return new Point(newX, newY);
  }

  colisions(): boolean {
    const head = this.corps[0];
    return (
      head.x < 0 || head.x >= 10 || head.y < 0 || head.y >= 10 || 
      this.corps.slice(1).some(segment => segment.x === head.x && segment.y === head.y)
    );
  }

  changerDirection(newDirection: Direction) {
    if (this.isOppositeDirection(newDirection)) return;
    this.direction = newDirection;
  }

  private isOppositeDirection(newDirection: Direction): boolean {
    return (
      (this.direction === Direction.UP && newDirection === Direction.DOWN) ||
      (this.direction === Direction.DOWN && newDirection === Direction.UP) ||
      (this.direction === Direction.LEFT && newDirection === Direction.RIGHT) ||
      (this.direction === Direction.RIGHT && newDirection === Direction.LEFT)
    );
  }

  collidesWith(foodPosition: Point): boolean {
    return this.corps[0].x === foodPosition.x && this.corps[0].y === foodPosition.y;
  }

  move() {
    this.avancer();
  }

  eat(food: Point) {
    if (this.collidesWith(food)) {
      this.croissance();
      return true;
    }
    return false;
  }

  checkCollision(gridSize: number): boolean {
    const head = this.corps[0];
    if (
      head.x < 0 || head.x >= gridSize ||
      head.y < 0 || head.y >= gridSize
    ) {
      return true;
    }
    return this.corps.slice(1).some(segment => segment.x === head.x && segment.y === head.y);
  }

  changeDirection(direction: Direction) {
    this.changerDirection(direction);
  }

  get corpsSnake(): Point[] {
    return this.corps;
  }
}