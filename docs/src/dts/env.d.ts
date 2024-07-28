namespace NodeJS {
  interface ProcessEnv {
    /**
     * @see https://nodejs.org/api/process.html#processenv
     */
    NODE_ENV: 'development' | 'production' | 'test';

    /**
     * vite 应用基础路径
     * Github deploy action
     */
    VITE_APP_BASENAME?: string;
  }
}
