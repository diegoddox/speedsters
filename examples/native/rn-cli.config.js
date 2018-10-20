var path = require("path");

module.exports = {
  extraNodeModules: {
    "@jsnp/react": path.resolve(__dirname, "../../packages/react"),
    "@jsnp/performance": path.resolve(__dirname, "../../packages/performance"),
  },
  getProjectRoots() {
    return [
      path.resolve(__dirname),
      path.resolve(__dirname, "../../"),
    ];
  }
};