import type { Request, Response } from "express";

import { getHealthStatus } from "../model/HealthModel.js";

export function getHealthController(_req: Request, res: Response): void {
  res.json(getHealthStatus());
}
