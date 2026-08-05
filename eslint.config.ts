import nx from '@nx/eslint-plugin';
import simpleImportSort from 'eslint-plugin-simple-import-sort';
import tailwindcss from 'eslint-plugin-tailwindcss';
import unusedImports from 'eslint-plugin-unused-imports';

export default [
  ...nx.configs['flat/base'],
  ...nx.configs['flat/typescript'],
  ...nx.configs['flat/javascript'],
  ...nx.configs['flat/angular-template'],
  { ignores: ['**/dist', '**/out-tsc'] },
  {
    files: ['**/*.ts', '**/*.js'],
    plugins: {
      'simple-import-sort': simpleImportSort,
      'unused-imports': unusedImports,
      tailwindcss,
    },
    // Resolved relative to the nearest eslint.config.ts/package.json above
    // the linted file — that's apps/app/, not the workspace root.
    settings: {
      tailwindcss: { cssConfigPath: './src/styles.css' },
    },
    // Override the preset's severities and add the workspace's own rules.
    rules: {
      'tailwindcss/classnames-order': 'error',
      'tailwindcss/no-arbitrary-value': 'error',
      'tailwindcss/no-unnecessary-arbitrary-value': 'error',
      'tailwindcss/no-custom-classname': [
        'error',
        // { whitelist: ['custom\\-*'] },
      ],
      'tailwindcss/no-contradicting-classname': 'error',
      '@nx/enforce-module-boundaries': [
        'error',
        {
          enforceBuildableLibDependency: true,
          allow: ['^.*/eslint(\\.base)?\\.config(\\.ts)?$'],
          depConstraints: [
            { sourceTag: 'type:app', onlyDependOnLibsWithTags: ['type:lib'] },
            { sourceTag: 'type:lib', onlyDependOnLibsWithTags: ['type:lib'] },
          ],
        },
      ],
      '@typescript-eslint/consistent-type-imports': [
        'error',
        { prefer: 'type-imports', fixStyle: 'inline-type-imports' },
      ],
      'simple-import-sort/exports': 'error',
      'simple-import-sort/imports': [
        'error',
        {
          groups: [
            ['^@?\\w'], // External packages
            ['^@letora'], // Workspace libs
            ['^\\.'], // Relative imports
          ],
        },
      ],
      'unused-imports/no-unused-imports': 'error',
    },
  },
  {
    files: ['**/*.html'],
    plugins: {
      tailwindcss,
    },
    settings: {
      tailwindcss: { cssConfigPath: './src/styles.css' },
    },
    rules: {
      '@angular-eslint/template/attributes-order': [
        'error',
        {
          alphabetical: true,
          order: [
            'STRUCTURAL_DIRECTIVE',
            'TEMPLATE_REFERENCE',
            'ATTRIBUTE_BINDING',
            'INPUT_BINDING',
            'TWO_WAY_BINDING',
            'OUTPUT_BINDING',
          ],
        },
      ],
      'tailwindcss/classnames-order': 'error',
      'tailwindcss/no-arbitrary-value': 'error',
      'tailwindcss/no-unnecessary-arbitrary-value': 'error',
      'tailwindcss/no-custom-classname': [
        'error',
        // { whitelist: ['custom\\-*'] },
      ],
      'tailwindcss/no-contradicting-classname': 'error',
    },
  },
];
