/* eslint-disable no-restricted-syntax */
// All environment variables declared in .env.example are required
// to be present in process.env (or in .env). Other environment variables
// are optional.
require('dotenv-safe').config();

// Copy process.env environment variables into "env".
const env = {};
for (const key in process.env) {
  // eslint-disable-next-line no-prototype-builtins
  if (!process.env.hasOwnProperty(key)) {
    // eslint-disable-next-line no-continue
    continue;
  }
  const value = process.env[key];
  if (value != null) {
    env[key] = value;
  }
}

module.exports = env;
