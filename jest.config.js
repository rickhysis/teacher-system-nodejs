module.exports = {
    testEnvironment: "node",
    setupFilesAfterEnv: ["<rootDir>/tests/setup.js"], 
    moduleFileExtensions: ["js", "json"],
    testMatch: ["**/tests/**/*.test.js"], 
    collectCoverage: true, 
    collectCoverageFrom: ["services/**/*.js", "controllers/**/*.js"], 
    coverageDirectory: "coverage",
    coverageThreshold: {
        global: {
            branches: 70,
            functions: 70,
            lines: 70,
            statements: 70,
        },
    },
    verbose: true,
};