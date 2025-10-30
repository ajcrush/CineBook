// Health check endpoint to be added to your backend index.js
// Add this to your Express app

export const healthCheckRouter = (app) => {
  // Basic health check
  app.get("/api/health", (req, res) => {
    res.status(200).json({
      status: "OK",
      timestamp: new Date().toISOString(),
      uptime: process.uptime(),
      environment: process.env.NODE_ENV || "development",
    });
  });

  // Detailed health check
  app.get("/api/health/detailed", async (req, res) => {
    const health = {
      status: "OK",
      timestamp: new Date().toISOString(),
      uptime: process.uptime(),
      environment: process.env.NODE_ENV || "development",
      services: {
        database: "unknown",
        cache: "unknown",
      },
    };

    try {
      // Check database connection if using MongoDB
      // Uncomment and implement based on your setup
      // const mongoStatus = await checkMongoConnection();
      // health.services.database = mongoStatus ? 'OK' : 'DOWN';

      health.services.database = "OK";
      res.status(200).json(health);
    } catch (error) {
      health.status = "PARTIAL";
      health.services.database = "DOWN";
      res.status(503).json(health);
    }
  });

  // Readiness check - use for load balancers
  app.get("/api/ready", (req, res) => {
    res.status(200).json({ ready: true });
  });

  // Liveness check - use for restart policies
  app.get("/api/live", (req, res) => {
    res.status(200).json({ alive: true });
  });
};
