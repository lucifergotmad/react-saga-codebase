import fs from 'fs';
import path from 'path';
import yargs from 'yargs';
import { hideBin } from 'yargs/helpers';
import { fileURLToPath } from 'url';

// eslint-disable-next-line no-undef
const { argv } = yargs(hideBin(process.argv)).options({
  major: {
    type: 'number',
    demandOption: true,
    describe: 'Major version number',
  },
  minor: {
    type: 'number',
    demandOption: true,
    describe: 'Minor version number',
  },
  patch: { type: 'number', describe: 'Patch version number', default: 0 },
});

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const metadataPath = path.resolve(__dirname, '../src/build-version.json');

class UpdateVersion {
  main() {
    const buildProperties = this._readFileBuildProperties();
    const newVersion = this._assignVersion(buildProperties, argv);

    fs.writeFileSync(
      metadataPath,
      JSON.stringify({ buildVersion: newVersion }, null, 2),
      'utf-8',
    );
    this._logSuccess(newVersion);
  }

  _logSuccess(newVersion) {
    console.log(
      'New Version Generated:',
      `${newVersion.major}.${newVersion.minor}.${newVersion.patch}.${newVersion.revision}`,
    );
  }

  _readFileBuildProperties() {
    try {
      console.log(metadataPath);
      const buildPropertiesBytes = fs.readFileSync(metadataPath, 'utf-8');
      return JSON.parse(buildPropertiesBytes);
    } catch (e) {
      throw new Error('Terdapat kesalahan saat membaca file build properties.');
    }
  }

  _assignVersion(buildProperties, argv) {
    this._validateMajorAndMinorVersion(argv.major, argv.minor);

    const { major, minor, patch, revision } = buildProperties.buildVersion;

    const patchNumber = this._generatePatchNumber(patch, argv);

    const isPatchNumberChanged = patchNumber !== patch;
    const serverNumber = this._generateRevisionNumber(
      revision,
      isPatchNumberChanged,
    );

    return {
      major: String(argv.major || major),
      minor: String(argv.minor || minor),
      patch: String(patchNumber),
      revision: serverNumber,
    };
  }

  _validateMajorAndMinorVersion(major, minor) {
    if (typeof major !== 'number' || typeof minor !== 'number')
      throw new Error(
        'Please provide minor and major version! do not leave it empty!',
      );
  }

  _generateDateVersion() {
    return new Date().toISOString().split('T')[0].replace(/-/g, '').slice(2);
  }

  _generatePatchNumber(patch, argv) {
    return argv.major || argv.minor ? 0 : argv.patch ? +argv.patch : +patch + 1;
  }

  _generateRevisionNumber(revision, isPatchNumberChanged) {
    const propertiesDate = revision
      ? revision.slice(0, -2)
      : this._generateDateVersion();
    const propertiesCounter = revision ? parseInt(revision.slice(-2), 10) : 0;
    const currentServerDate = this._generateDateVersion();
    const newServerCounter =
      propertiesDate === currentServerDate ? propertiesCounter + 1 : 1;

    return isPatchNumberChanged
      ? currentServerDate + '01'
      : currentServerDate + String(newServerCounter).padStart(2, '0');
  }
}

try {
  new UpdateVersion().main();
} catch (err) {
  console.error(err.message);
}
