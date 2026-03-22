import nextConfig from 'eslint-config-next/core-web-vitals'

// eslint-config-next/core-web-vitals includes a 'next/typescript' entry that
// registers the @typescript-eslint plugin. Extract it so we can reuse the
// same plugin instance in our own rules block.
const tsEntry = nextConfig.find((c) => c.plugins?.['@typescript-eslint'])
const tsPlugin = tsEntry?.plugins?.['@typescript-eslint']

const eslintConfig = [
  ...nextConfig,

  {
    rules: {
      // JavaScript best practices
      'prefer-const': 'error',
      'no-var': 'error',
      'no-console': ['warn', { allow: ['warn', 'error'] }],
      eqeqeq: ['error', 'always', { null: 'ignore' }],

      // React
      'react/self-closing-comp': ['error', { component: true, html: true }],
      'react-hooks/exhaustive-deps': 'error',
    },
  },

  {
    files: ['**/*.ts', '**/*.tsx'],
    ...(tsPlugin ? { plugins: { '@typescript-eslint': tsPlugin } } : {}),
    rules: {
      '@typescript-eslint/no-explicit-any': 'error',
      '@typescript-eslint/no-unused-vars': [
        'error',
        {
          vars: 'all',
          args: 'after-used',
          ignoreRestSiblings: true,
          argsIgnorePattern: '^_',
          varsIgnorePattern: '^_',
          destructuredArrayIgnorePattern: '^_',
          caughtErrorsIgnorePattern: '^(_|ignore)',
        },
      ],
      '@typescript-eslint/consistent-type-imports': [
        'error',
        { prefer: 'type-imports', fixStyle: 'inline-type-imports' },
      ],
      '@typescript-eslint/ban-ts-comment': [
        'warn',
        { 'ts-ignore': 'allow-with-description', minimumDescriptionLength: 10 },
      ],
      '@typescript-eslint/no-empty-object-type': 'warn',
    },
  },

  {
    ignores: ['.next/', 'node_modules/', 'src/payload-types.ts'],
  },
  {
    files: ['src/scripts/**/*'],
    rules: { 'no-console': 'off' },
  },
]

export default eslintConfig
