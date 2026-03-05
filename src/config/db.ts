import { PrismaPg } from "@prisma/adapter-pg";
import { PrismaClient } from "@prisma/client";
import "dotenv/config";

const connectionString = ` ${process.env.DATABASE_URL}`;
const adapter = new PrismaPg({ connectionString });
const prisma = new PrismaClient({ adapter });

export { prisma };

// import { Pool } from "pg";
// import dotenv from "dotenv";

// dotenv.config();

// export const pool = new Pool({
//   user: process.env.DB_USER,
//   host: process.env.DB_HOST,
//   port: parseInt(process.env.DB_PORT || "5432"),
//   database: process.env.DB_NAME,
//   password: process.env.DB_PASSWORD,
// });
