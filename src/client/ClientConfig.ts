import { existsSync, writeFileSync, readFileSync } from "fs";

interface ClientConfigObject {
  autoRefreshMQTT: {
    enabled: boolean;
    interval: number;
  };
  autoBypassWarning: true;
  usingAPINamespaces: boolean;
}

class ClientConfig {
  public JSONPath: string = process.cwd() + "sinestrea-fca-config.json";
  public config: ClientConfigObject = this.generateConfigObject();

  public init(): boolean {
    try {
      if (!existsSync(this.JSONPath)) {
        let configObject = this.generateConfigObject();

        writeFileSync(this.JSONPath, JSON.stringify(configObject, null, 2));
        this.config = configObject;
      } else {
        let configObject = this.loadConfig();
        this.config = configObject;
      }
      return true;
    } catch (error) {
      return false;
    }
  }

  public loadConfig(): ClientConfigObject {
    let configRaw = JSON.parse(readFileSync(this.JSONPath, "utf-8"));

    let configObject: ClientConfigObject = {
      autoRefreshMQTT: {
        enabled: configRaw?.autoRefreshMQTT?.enabled || true,
        interval: configRaw?.autoRefreshMQTT?.interval || 30000,
      },
      autoBypassWarning: configRaw.autoBypassWarning || true,
      usingAPINamespaces: configRaw.usingAPINamespaces || true,
    };

    return configObject;
  }

  public generateConfigObject(): ClientConfigObject {
    return {
      autoRefreshMQTT: {
        enabled: true,
        interval: 5000,
      },
      autoBypassWarning: true,
      usingAPINamespaces: true,
    };
  }
}

export default new ClientConfig();
