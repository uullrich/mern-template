module.exports = {
  default: [
    "./test/integration/features/**/*.feature", // Specify feature files
    "--require-module ts-node/register", // Load TypeScript module
    "--require test/integration/step_definitions/**/*.ts", // Load step definitions
    "--format progress", // Load custom formatter
  ].join(" "),
};
