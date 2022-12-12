import * as config from "config";

export function configurationGet(name: string, def?: string): string {
  try {
    return (process.env[name] || config.get(name) || def || "").toString();
  } catch (error) {
    return def || "";
  }
}

export enum DBName {
  UserManager = "UserManager",
}
