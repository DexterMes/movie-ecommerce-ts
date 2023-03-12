// module.exports = {
// 	preset: "ts-jest",
// 	testEnvironment: "node",
// 	testMatch: ["**/__tests__/**/*.test.ts"],
// 	moduleNameMapper: {
// 		"^@/(.*)$": "<rootDir>/src/$1",
// 	},
// 	globals: {
// 		"ts-jest": {
// 			tsconfig: "tsconfig.json",
// 		},
// 	},
// 	collectCoverageFrom: ["src/**/*.ts"],
// 	coverageReporters: ["text", "lcov"],
// };

module.exports = {
	preset: "ts-jest",
	testEnvironment: "node",
	testMatch: ["**/__tests__/**/*.test.ts"],
	moduleNameMapper: {
		"^@/(.*)$": "<rootDir>/src/$1",
	},
	transform: {
		"^.+\\.tsx?$": "ts-jest",
	},
	// globals: {
	// 	"ts-jest": {
	// 		tsconfig: "tsconfig.json",
	// 	},
	// },
	collectCoverageFrom: ["src/**/*.ts"],
	coverageReporters: ["text", "lcov"],
};
