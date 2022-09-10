let common = [
  'e2e/features/**/*.feature', // Specify our feature files
  '--require-module ts-node/register', // Load TypeScript module
  '--require e2e/steps/**/*.ts', // Load step definitions
  '--format progress-bar',
  '--publish-quiet'
].join(' ');

module.exports = {
  default: common
};
