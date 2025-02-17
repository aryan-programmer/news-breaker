import { dirname } from "path";
import { fileURLToPath } from "url";
import { FlatCompat } from "@eslint/eslintrc";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const compat = new FlatCompat({
	baseDirectory: __dirname,
	allConfig: {},
});

const eslintConfig = [
	...compat.extends("next/core-web-vitals", "next/typescript"),
	...compat.config({
		ignorePatterns: ["**/*.guard.ts"],
		extends: ["next", "plugin:@typescript-eslint/recommended-type-checked"],
		rules: {
			eqeqeq: ["error", "always", { null: "ignore" }],
			"@typescript-eslint/no-explicit-any": "off",
			"react-hooks/exhaustive-deps": "error",
			"react-hooks/rules-of-hooks": "error",
			"@typescript-eslint/switch-exhaustiveness-check": [
				"error",
				{
					allowDefaultCaseForExhaustiveSwitch: true,
					considerDefaultExhaustiveForUnions: false,
					requireDefaultForNonUnion: false,
				},
			],
			"@typescript-eslint/no-unused-vars": [
				"warn", // or "error"
				{
					argsIgnorePattern: "^_",
					varsIgnorePattern: "^_",
					caughtErrorsIgnorePattern: "^_",
				},
			],
		},
		plugins: ["@typescript-eslint"],
		parser: "@typescript-eslint/parser",
		parserOptions: {
			projectService: true,
			tsconfigRootDir: __dirname,
		},
		root: true,
	}),
];

export default eslintConfig;
