namespace NodeJS {
  interface ProcessEnv {
    /**
     * package name
     * defined in vite.config.mts
     */
    PKG_NAME: string;

    /**
     * package version
     * defined in vite.config.mts
     */
    PKG_VERSION: string;

    /**
     * vite 应用基础路径
     * Github deploy action
     */
    VITE_APP_BASENAME?: string;

  }
}
