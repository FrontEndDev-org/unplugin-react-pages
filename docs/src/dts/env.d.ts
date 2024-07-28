/**
 * env.d.ts
 * @ref https://nodejs.org/api/process.html#processenv
 */

namespace NodeJS {
  interface ProcessEnv {
    /**
     * @see https://nodejs.org/api/process.html#processenv
     */
    readonly NODE_ENV: 'development' | 'production' | 'test';

    /**
     * package name
     * defined in vite.config.mts
     */
    readonly PKG_NAME: string;

    /**
     * package version
     * defined in vite.config.mts
     */
    readonly PKG_VERSION: string;
  }
}
