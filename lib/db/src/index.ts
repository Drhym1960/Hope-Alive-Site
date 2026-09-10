import { drizzle, type NodePgDatabase } from "drizzle-orm/node-postgres";
import pg from "pg";
import * as schema from "./schema";

const { Pool } = pg;

type AppDb = NodePgDatabase<typeof schema>;

let _pool: pg.Pool | undefined;
let _db: AppDb | undefined;

function requireDatabaseUrl(): string {
  const url = process.env.DATABASE_URL;
  if (!url) {
    throw new Error(
      "DATABASE_URL must be set. Did you forget to provision a database?",
    );
  }
  return url;
}

function getPool(): pg.Pool {
  if (!_pool) {
    _pool = new Pool({ connectionString: requireDatabaseUrl() });
  }
  return _pool;
}

function getDb(): AppDb {
  if (!_db) {
    _db = drizzle(getPool(), { schema });
  }
  return _db;
}

/** Lazy so /api/healthz can start even before a database is provisioned. */
export const pool = new Proxy({} as pg.Pool, {
  get(_target, prop) {
    const real = getPool();
    const value = Reflect.get(real, prop, real);
    return typeof value === "function" ? (value as Function).bind(real) : value;
  },
});

export const db = new Proxy({} as AppDb, {
  get(_target, prop) {
    const real = getDb();
    const value = Reflect.get(real, prop, real);
    return typeof value === "function" ? (value as Function).bind(real) : value;
  },
});

export * from "./schema";
