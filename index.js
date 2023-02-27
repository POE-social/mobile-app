/**
 * @format
 */

import "localstorage-polyfill"; // FIXME: Remove this after https://github.com/solana-labs/wallet-adapter/issues/465 is complete
import "react-native-get-random-values";
import "react-native-url-polyfill/auto";

import { AppRegistry } from "react-native";
import App from "./App";
import { name as appName } from "./app.json";

import { Buffer } from "buffer";
global.Buffer = Buffer;
const process = require("process");
global.process = process;
import "fast-text-encoding";

// Mock event listener functions to prevent them from fataling.
window.addEventListener = () => {};
window.removeEventListener = () => {};

AppRegistry.registerComponent("main", () => App);
