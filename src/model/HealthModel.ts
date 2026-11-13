export type HealthStatus = {
  status: string;
  service: string;
};

export function getHealthStatus(): HealthStatus {
  return {
    status: "ok",
    service: "projeto-backend",
  };
}
