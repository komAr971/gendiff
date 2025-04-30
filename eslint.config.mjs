import { defineConfig } from "eslint/config"
import globals from "globals"
import path from "node:path"
import { fileURLToPath } from "node:url"
import js from "@eslint/js"
import { FlatCompat } from "@eslint/eslintrc"
import stylisticJs from '@stylistic/eslint-plugin'

const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)
const compat = new FlatCompat({
    baseDirectory: __dirname,
    recommendedConfig: js.configs.recommended,
    allConfig: js.configs.all
})

export default defineConfig([{
    //extends: compat.extends("airbnb-base"),

    plugins: {
      '@stylistic': stylisticJs
    },

    languageOptions: {
        globals: {
            ...globals.browser,
        },

        ecmaVersion: 12,
        sourceType: "module",
    },

    rules: {
        "import/extensions": 0,
        "no-console": 0,
        "no-unused-expressions": 0,
        "no-continue": 0,

        "no-underscore-dangle": [2, {
            allow: ["__filename", "__dirname"],
        }],

        "@stylistic/semi": ["error", "never"]
    },
}])