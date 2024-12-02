import type { Config } from 'jest'
import nextJest from "next/jest.js";

const createJestConfig = nextJest({
  dir: "./",
});

const config: Config = {
  testEnvironment: 'jsdom',
  modulePaths: ["<rootDir>"],
};

export default createJestConfig(config);
