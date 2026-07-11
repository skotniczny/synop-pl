// @ts-check

import eslint from '@eslint/js'
import { defineConfig } from 'eslint/config'
import tseslint from 'typescript-eslint'
import globals from 'globals'
import { includeIgnoreFile } from "@eslint/config-helpers"
import path from "node:path"

const gitignorePath = path.resolve(import.meta.dirname, ".gitignore")

export default defineConfig(includeIgnoreFile(gitignorePath),{
  files: ['**/*.{js,ts}'],
  extends: [eslint.configs.recommended, tseslint.configs.recommended],
  languageOptions: {
    globals: {
      ...globals.browser
    }
  }
})
