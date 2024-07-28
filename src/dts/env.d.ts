namespace NodeJS {
  interface ProcessEnv {
    /**
     * @see https://nodejs.org/api/process.html#processenv
     */
    NODE_ENV: 'development' | 'production' | 'test';
  }
}
