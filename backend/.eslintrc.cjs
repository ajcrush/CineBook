module.exports = {
  parserOptions: {
    ecmaVersion: 2021,
    sourceType: "module",
  },
  extends: "airbnb-base",
  env: {
    node: true,
    es2021: true,
  },
  rules: {
    "no-console": "warn",
    "no-unused-vars": "warn",
  },
};
