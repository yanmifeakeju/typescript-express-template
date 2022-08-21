let common = [
  'specs/features/**/*.feature', // Specify our feature files
  '--require-module ts-node/register', // Load TypeScript module
  '--require specs/steps/**/*.ts', // Load step definitions
  '--format progress-bar',
  '--publish-quiet'
].join(' ');

module.exports = {
  default: common
};
