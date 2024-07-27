import { pkgName, pkgVersion } from '../src';

test('pkg', () => {
    expect(pkgName).toEqual(process.env.PKG_NAME);
    expect(pkgVersion).toEqual(process.env.PKG_VERSION);
});
