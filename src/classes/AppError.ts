export class AppError extends Error {
  public statusCode?: number;
  public description?: string;

  constructor(message: string, statusCode?: number, description?: string) {
    super(message);

    this.statusCode = statusCode || 500;
    this.description = description || "An error occurred";
  }
}
