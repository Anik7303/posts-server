import { Request, Response, NextFunction } from "express";

interface ErrorWithCode extends Error {
  statusCode?: number;
}

export function errorsMiddleware(
  error: ErrorWithCode,
  req: Request,
  res: Response,
  _next: NextFunction
): void {
  const { method, url } = req;
  const message = error.message || "An unexpected error occured";
  const statusCode = error.statusCode || 500;
  const data = { statusCode, message, method, url };

  res.status(statusCode).json(data);
}

export function error404Middleware(
  req: Request,
  res: Response,
  _next: NextFunction
): void {
  const { method, url } = req;
  const statusCode = 404;
  const message = `Http Method ${method} for route ${url} does not exist`;
  const data = { message, method, statusCode, url };

  res.status(statusCode).json(data);
}
