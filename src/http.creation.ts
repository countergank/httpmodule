import { NestFactory } from "@nestjs/core";
import { SwaggerModule, DocumentBuilder } from "@nestjs/swagger";
// @ts-ignore
import boolParser = require("express-query-boolean");
import helmet from "helmet";
import path = require("path");
import { existsSync, mkdirSync, readFileSync, writeFileSync } from "fs";
import { configurationGet } from "./configuration.service";
import { JwtPayload } from "./authentication/services/model/jwt.model";
import { Response } from "express";
import {
  PathItemObject,
  PathsObject,
} from "@nestjs/swagger/dist/interfaces/open-api-spec.interface";

export interface TestInfoPath {
  name: string;
  method: string;
  url: string;
  variables: string;
  body: string;
}

export interface HttpRequest {
  [value: string]: any;
  user: JwtPayload;
}

export interface HttpResponse extends Response {
  others?: string;
}

export abstract class MainModule {
  static host: string;
  static port: number;
  static isDev: boolean;
  static URL: string;

  constructor() {
    MainModule.port = MainModule.normalizePort(configurationGet("PORT"));
    MainModule.host = configurationGet("HOST");

    try {
      MainModule.isDev =
        (process.env.NODE_ENV || "development") === "development";
    } catch (error) {
      MainModule.isDev = true;
    }

    MainModule.URL = MainModule.host;
    if (
      MainModule.port !== 80 &&
      MainModule.port !== 443 &&
      !MainModule.URL.startsWith("https")
    ) {
      MainModule.URL = MainModule.URL + ":" + MainModule.port;
    }
  }

  private static normalizePort(
    param: number | string,
    defPort?: number
  ): number {
    const portNumber: number =
      typeof param === "string" ? parseInt(param, 10) : param;
    if (!isNaN(portNumber) && portNumber >= 0) {
      return portNumber;
    }
    return defPort || 3000;
  }
}

export interface AppConfig {
  excludeTestFeatures?: boolean;
  excludeBearerToken?: boolean;
  debug?: boolean;
}

async function create(
  appModule: MainModule,
  appPath: string,
  config?: AppConfig
) {
  const app = await NestFactory.create(appModule);
  const hostDomain = MainModule.URL;
  const pathPackageJson = appPath ? path.join(appPath, "../package.json") : "";

  const info = () => {
    let resp: any;
    try {
      if (pathPackageJson) {
        resp = JSON.parse(readFileSync(pathPackageJson, "utf-8"));
      }
    } catch (error) {
      resp = null;
    }

    return resp || {};
  };

  const options = new DocumentBuilder()
    .setTitle(info().name || "")
    .setDescription(info().description || "")
    .setVersion(info().version || "")
    .setContact(info().author || "", info().homepage || "", info().email || "");

  if (!config?.excludeBearerToken) {
    options.addBearerAuth();
  }

  app.use(
    helmet({
      crossOriginEmbedderPolicy: false,
    })
  );
  app.use(helmet.referrerPolicy({ policy: "same-origin" }));

  const swaggerDoc = SwaggerModule.createDocument(app, options.build());
  app.use("/api/docs/swagger.json", (req: any, res: any) => {
    res.send(swaggerDoc);
  });

  SwaggerModule.setup("api/docs", app, swaggerDoc, {
    swaggerUrl: `${hostDomain}/api/docs/swagger.json`,
    explorer: true,
    swaggerOptions: {
      docExpansion: "list",
      filter: true,
      showRequestDuration: true,
    },
  });

  const testingPath = appPath ? path.join(appPath, "../test") : "";
  if (!config?.excludeTestFeatures && testingPath) {
    addfeatures(swaggerDoc.paths, testingPath, config?.debug);
  }

  app.use(boolParser());

  const bodyParser = require("body-parser");
  app.use(bodyParser.json({ limit: "100mb" }));
  app.use(
    bodyParser.urlencoded({
      limit: "100mb",
      extended: true,
      parameterLimit: 50000,
    })
  );

  app.enableCors();
  await app.listen(MainModule.port);
}

export const addfeatures = (
  paths: PathsObject,
  testingPath?: string,
  debug?: boolean
) => {
  const resp: string[] = [];

  resp.push(`
import {[IMPORTS], FunctionTestApp}  from "@countergank/http-module";

export interface TestEndpoint {
  name: string,
  function: (done: any) => void,
}

export const features = (onApp: FunctionTestApp): TestEndpoint[] => {
  return [
`);

  const getParameters = (
    key: string,
    _value: PathItemObject
  ): TestInfoPath[] => {
    const info: TestInfoPath[] = [];

    const getData = (fkey: string, parameters: any[]) => {
      const body: string[] = [];
      const queries: string[] = [];
      const variables: string[] = [];
      parameters
        .filter((i) => ["path", "query"].indexOf(i.in) >= 0)
        .forEach((item) => {
          const type: string = item.type;
          const fvalue = `"+_f${item.name}+"`;
          if (item.in === "path") {
            fkey = fkey.replace(`{${item.name}}`, fvalue);
          } else if (item.in === "query") {
            queries.push(`${item.name}=${fvalue}`);
          }
          const value =
            type === "array"
              ? "[]"
              : type === "number"
              ? "0"
              : type === "boolean"
              ? "false"
              : `"none"`;
          variables.push(`const _f${item.name}: ${type} = ${value};
      `);
        });

      return {
        queries,
        variables,
        body,
        fkey,
      };
    };

    if (_value.post) {
      const data = getData(
        key,
        (_value.post.parameters || [])
          .filter((item: any) => item.name)
          .map((item: any) => ({
            type: item.schema?.type || "any",
            name: item.name,
            in: item.in,
          }))
      );

      info.push({
        name: "/POST",
        url:
          data.fkey +
          (data.queries.length > 0 ? "?" + data.queries.join("&") : ""),
        variables: data.variables.join(""),
        body: "{" + data.body.join("\r\n") + "}",
        method: "post",
      });
    }
    if (_value.put) {
      const data = getData(
        key,
        (_value.put.parameters || [])
          .filter((item: any) => item.name)
          .map((item: any) => ({
            type: item.schema?.type || "any",
            name: item.name,
            in: item.in,
          }))
      );

      info.push({
        name: "/PUT",
        url:
          data.fkey +
          (data.queries.length > 0 ? "?" + data.queries.join("&") : ""),
        variables: data.variables.join(""),
        body: "{" + data.body.join("\r\n") + "}",
        method: "put",
      });
    }
    if (_value.delete) {
      const data = getData(
        key,
        (_value.delete.parameters || [])
          .filter((item: any) => item.name)
          .map((item: any) => ({
            type: item.schema?.type || "any",
            name: item.name,
            in: item.in,
          }))
      );
      info.push({
        name: "/DELETE",
        url:
          data.fkey +
          (data.queries.length > 0 ? "?" + data.queries.join("&") : ""),
        variables: data.variables.join(""),
        body: "{" + data.body.join("\r\n") + "}",
        method: "delete",
      });
    }
    if (_value.get) {
      const data = getData(
        key,
        (_value.get.parameters || [])
          .filter((item: any) => item.name)
          .map((item: any) => ({
            type: item.schema?.type || "any",
            name: item.name,
            in: item.in,
          }))
      );
      info.push({
        name: "/GET",
        url:
          data.fkey +
          (data.queries.length > 0 ? "?" + data.queries.join("&") : ""),
        variables: data.variables.join(""),
        body: "{" + data.body.join("\r\n") + "}",
        method: "get",
      });
    }

    return info;
  };

  const functions: string[] = [];
  for (const [key, value] of Object.entries(paths)) {
    const params = getParameters(key, value);
    params.forEach((item) => {
      const funcName = `basic${item.method}`;
      if (functions.indexOf(funcName) < 0) {
        functions.push(funcName);
      }
      resp.push(`    {
        name: "${item.name} ${key}",
        function: (done) => {
          ${item.variables}
          ${funcName}(onApp, done, "${item.url}", ${item.body});
        }
      },`);
    });
  }

  resp.push(`
  ];
}
  `);
  const dir = testingPath || path.join(__dirname, "../test");
  if (!existsSync(dir)) {
    mkdirSync(dir);
  }
  writeFileSync(
    path.join(dir, "/features.ts"),
    resp.join("\r\n").replace("[IMPORTS]", functions.join(",")),
    "utf-8"
  );

  if (debug) {
    writeFileSync(
      path.join(dir, "/features.json"),
      JSON.stringify(paths),
      "utf-8"
    );
  }
};

export default create;
