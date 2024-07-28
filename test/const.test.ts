import { pkgName, pkgVersion } from '../src';

it('pkg', () => {
  expect(pkgName).toEqual(PKG_NAME);
  expect(pkgVersion).toEqual(PKG_VERSION);
});
