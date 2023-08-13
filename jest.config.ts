import type { Config } from '@jest/types';

const config: Config.InitialOptions = {
    roots: ['<rootDir>/src'],
    testMatch: ['**/*.spec.ts'],
    transform: {
        '^.+\\.tsx?$': '@swc/jest',
    },
    moduleNameMapper: {
        '^@/(.*)$': '<rootDir>/src/$1',
        '^__mocks__/(.*)$': '<rootDir>/__mocks__/$1',
    },
    clearMocks: true,
    collectCoverage: true,
    collectCoverageFrom: [
        './src/**/*.ts',
        '!**/*.d.ts',
        '!**/node_modules/**',
    ],
    coverageThreshold: {
        global: {
            branches: 30,
            functions: 30,
            lines: 30,
            statements: 30,
        },
    },
    testPathIgnorePatterns: [
        '<rootDir>/node_modules/'
    ],
};

export = config;
