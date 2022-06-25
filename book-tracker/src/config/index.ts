import * as dotenv from "dotenv";

dotenv.config();


export const server = {
    port: process.env.PORT,
    env: process.env.NODE_ENV,
  };

export const dbConnections = {
    mongo: {
        name: 'mongo',
        conn: process.env.DATABASE_MONGO_CONN,
    },
};