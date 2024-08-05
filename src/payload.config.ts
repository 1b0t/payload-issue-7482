import path from "path";

import { payloadCloud } from "@payloadcms/plugin-cloud";
import { mongooseAdapter } from "@payloadcms/db-mongodb";
import { webpackBundler } from "@payloadcms/bundler-webpack";
import { slateEditor } from "@payloadcms/richtext-slate";
import { buildConfig } from "payload/config";

import Users from "./collections/Users";
import { Settings } from "./globals/Settings";
import { AdminConfig } from "./globals/AdminConfig";

import { Endpoint } from "payload/config";

export const transactionStatusEndpoint: Endpoint = {
  method: "get",
  path: "/status",
  handler: async (req, res) => {
    const transactionsEnabled = !!req.payload.db.beginTransaction;

    return res.send({
      mongo: { transactions: transactionsEnabled },
      uptime: process.uptime(),
    });
  },
  root: true,
};

export default buildConfig({
  admin: {
    user: Users.slug,
    bundler: webpackBundler(),
  },
  editor: slateEditor({}),
  collections: [Users],
  typescript: {
    outputFile: path.resolve(__dirname, "payload-types.ts"),
  },
  globals: [Settings, AdminConfig],
  graphQL: {
    schemaOutputFile: path.resolve(__dirname, "generated-schema.graphql"),
  },
  plugins: [payloadCloud()],
  db: mongooseAdapter({
    url: process.env.DATABASE_URI,
  }),
  endpoints: [transactionStatusEndpoint],
});
