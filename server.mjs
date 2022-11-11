import express from "express";
import { config as loadEnvFile } from "dotenv";

loadEnvFile();

function panic() {
  process.exit(1);
}

function help(message) {
  console.error(`---> [HELP: ${message}] <---`);
}

function loadFromEnv(key, error) {
  const value = process.env[key];

  if (value) {
    return value;
  }

  error(new Error(`loadFromEnv (key = ${key}): Cannot find value for key.`));

  return 0;
}

function getAddressFromEnv() {
  return loadFromEnv("AMAZING-WEBSITE-SRV-BIND_ADDR", (error) => {
    console.error(error);
    help(
      "Probably due to missing configuration (.env file or environment variables)."
    );
    panic();
  });
}

function getPortFromEnv() {
  const value = loadFromEnv("AMAZING-WEBSITE-SRV-BIND_PORT", (error) => {
    console.error(error);
    help(
      "Probably due to missing configuration (.env file or environment variables)."
    );
    panic();
  });

  if (parseInt(value) == NaN) {
    console.error(
      new Error(
        `getPortFromEnv: Configured port number does not have a numerical value.`
      )
    );
    help(
      "Probably due to invalid setting for the TETRABIT-WWW-SRV-BIND_PORT environment variable."
    );
    panic();
    return -1;
  }

  return parseInt(value);
}

const BIND_ADDR = getAddressFromEnv();
const BIND_PORT = getPortFromEnv();

const app = express();

app.use(express.static("./public_html"));
app.use(express.static("./public_html", { index: false, extensions: ['html'] }));

app.listen(BIND_PORT, BIND_ADDR, (error) => {
  if (error) {
    console.error(error);
    process.exit(1);
    return;
  }

  console.info(`app.listen: Server live on ${BIND_ADDR}:${BIND_PORT}.`);
});