import express, { type Express, type Request, type Response } from "express";
import cors from "cors";
import pinoHttp from "pino-http";
import session from "express-session";
import path from "path";
import fs from "fs";
import { fileURLToPath } from "url";
import router from "./routes";
import { logger } from "./lib/logger";

const app: Express = express();

app.set("trust proxy", 1);

app.use(
  pinoHttp({
    logger,
    serializers: {
      req(req) {
        return {
          id: req.id,
          method: req.method,
          url: req.url?.split("?")[0],
        };
      },
      res(res) {
        return {
          statusCode: res.statusCode,
        };
      },
    },
  }),
);

app.use(cors({
  origin: true,
  credentials: true,
}));

app.use(express.json({ limit: "5mb" }));
app.use(express.urlencoded({ extended: true }));

const sessionSecret = process.env["SESSION_SECRET"] || "hacs-foundation-secret-2024";

app.use(session({
  secret: sessionSecret,
  resave: false,
  saveUninitialized: false,
  cookie: {
    secure: process.env["NODE_ENV"] === "production",
    httpOnly: true,
    maxAge: 24 * 60 * 60 * 1000,
    sameSite: "lax",
  },
}));

app.use("/api", router);

// Serve the built frontend (when deployed as a single service)
const __dirname = path.dirname(fileURLToPath(import.meta.url));
const candidatePaths = [
  path.resolve(__dirname, "../../hacs-foundation/dist/public"),
  path.resolve(__dirname, "../../../artifacts/hacs-foundation/dist/public"),
  path.resolve(process.cwd(), "artifacts/hacs-foundation/dist/public"),
];
const frontendDist = candidatePaths.find((p) => fs.existsSync(path.join(p, "index.html")));

if (frontendDist) {
  logger.info({ frontendDist }, "Serving static frontend");
  // Hashed assets in /assets are immutable; everything else (esp. index.html) must NEVER be cached
  // so users always pick up the latest deployed JS bundle.
  app.use(express.static(frontendDist, {
    setHeaders: (res, filePath) => {
      if (filePath.includes(`${path.sep}assets${path.sep}`)) {
        res.setHeader("Cache-Control", "public, max-age=31536000, immutable");
      } else {
        res.setHeader("Cache-Control", "no-store, no-cache, must-revalidate");
      }
    },
  }));
  app.get(/^\/(?!api).*/, (_req: Request, res: Response) => {
    res.setHeader("Cache-Control", "no-store, no-cache, must-revalidate");
    res.sendFile(path.join(frontendDist, "index.html"));
  });
} else {
  logger.warn({ candidatePaths }, "Frontend dist not found; API-only mode");
}

export default app;
