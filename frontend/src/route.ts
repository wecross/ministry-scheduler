import { NextApiRequest, NextApiResponse } from "next";
import dbClient, { PrismaClient } from "./dbClient";

type RouteFn = (db: PrismaClient, req: NextApiRequest) => Promise<any>;
export default (fn: RouteFn) => {
  return async (req: NextApiRequest, res: NextApiResponse) => {
    res.statusCode = 200;
    res.setHeader("Content-Type", "application/json");

    const result = await fn(dbClient, req);

    res.end(JSON.stringify(result, null, 2));
  };
};
