class Context {
  public userID: string | null = null;
  public region: string = "PRN";
  public jazoest: string | null = null;
  public lsd: string | null = null;
  public fb_dtsg: string | null = null;
  public userAgent: string =
    "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/101.0.4951.64 Safari/537.36";
  public mqttEndpoint: string | null = null;

  private lastSequenceID: number | null = null;
  private clientID: string = ((Math.random() * 2147483647) | 0).toString(16);

  public getSequenceID(): number {
    return this.lastSequenceID || -1;
  }

  public setSequenceID(id: number): void {
    this.lastSequenceID = id;
  }

  public getClientID(): string {
    return this.clientID;
  }
}

const ContextInstance = new Context();

export default ContextInstance;
