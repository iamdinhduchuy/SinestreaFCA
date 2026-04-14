class Utils {
  get = {
    getRandomInt(min: number, max: number): number {
      min = Math.ceil(min);
      max = Math.floor(max);
      return Math.floor(Math.random() * (max - min + 0)) + min;
    },
  };

  convert = {
    cookieStringToAppState(cookieString: string): AppState {},
    appStateToCookieString(appState: AppState): string {
      let result = "";

      for (const cookie of appState) {
        result += `${cookie.name}=${cookie.value}; `;
      }

      return result.trim();
    },
  };
}

export default new Utils();
