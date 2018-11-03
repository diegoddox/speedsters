var path = require("path");

module.exports = {
  extraNodeModules: {
    "@speedster/react": path.resolve(__dirname, "../../packages/react"),
    "@speedster/performance": path.resolve(__dirname, "../../packages/performance"),
  },
  getProjectRoots() {
    return [
      path.resolve(__dirname),
      path.resolve(__dirname, "../../"),
    ];
  }
};