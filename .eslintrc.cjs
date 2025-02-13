module.exports = {
	root: true,
	env: { browser: true, es2020: true },
	extends: [
		'eslint:recommended',
		'plugin:@typescript-eslint/recommended-type-checked',
		'plugin:react-hooks/recommended',
		'plugin:react/recommended',
		'plugin:react/jsx-runtime',
		'plugin:prettier/recommended'
	],
	ignorePatterns: ['dist', '.eslintrc.cjs'],
	parser: '@typescript-eslint/parser',
	parserOptions: {
		ecmaVersion: 'latest',
		sourceType: 'module',
		project: ['./tsconfig.json', './tsconfig.node.json', './tsconfig.app.json'],
		tsconfigRootDir: __dirname,
	},
	plugins: ['react-refresh'],
	settings: {
		react: {
			version: 'detect',
		}
	},
	rules: {
		'react-refresh/only-export-components': [
			'warn',
			{ allowConstantExport: true },
		],
    '@typescript-eslint/no-restricted-imports': [
      'error',
      {
        'paths': [
          {
            'name': 'react-redux',
            'importNames': ['useSelector', 'useStore', 'useDispatch'],
            'message': 'Please use pre-typed versions from `src/app/hooks.ts` instead.'
          }
        ]
      }
    ],
    '@typescript-eslint/no-unsafe-argument': 0,
    '@typescript-eslint/no-unsafe-assignment': 0,
    '@typescript-eslint/no-unsafe-call': 0,
    '@typescript-eslint/no-unsafe-member-access': 0,
    '@typescript-eslint/no-unsafe-return': 0,
	},
}
