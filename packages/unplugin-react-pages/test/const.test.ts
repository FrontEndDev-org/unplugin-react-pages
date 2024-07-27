import { pkgName, pkgVersion } from '../src';

it('pkg', () => {
  expect(pkgName).toEqual(process.env.PKG_NAME);
  expect(pkgVersion).toEqual(process.env.PKG_VERSION);
});
