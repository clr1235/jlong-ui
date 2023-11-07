module.exports = {
	root: true,
	env: {
		browser: true,
		es2021: true,
		node: true,
	},
	parser: '@typescript-eslint/parser',
	extends: [
		// 参考vuejs官方的eslint配置： https://eslint.vuejs.org/user-guide/#usage
		'plugin:vue/vue3-recommended',
		'eslint:recommended',

		'plugin:@typescript-eslint/recommended',

		// 使用prettier的推荐规则
		'prettier',
		'plugin:prettier/recommended',
	],
	plugins: ['vue', '@typescript-eslint'],
	rules: {
		// 对应上边的plugin:vue/vue3-recommended
		'vue/multi-word-component-names': 'off', // 关闭组件名必须多字： https://eslint.vuejs.org/rules/multi-word-component-names.html
		'vue/no-v-model-argument': 'off',
		'vue/script-setup-uses-vars': 'error',
		'vue/no-reserved-component-names': 'off',
		'vue/custom-event-name-casing': 'off',
		'vue/attributes-order': 'off',
		'vue/one-component-per-file': 'off',
		'vue/html-closing-bracket-newline': 'off',
		'vue/max-attributes-per-line': 'off',
		'vue/multiline-html-element-content-newline': 'off',
		'vue/singleline-html-element-content-newline': 'off',
		'vue/attribute-hyphenation': 'off',
		'vue/require-default-prop': 'off',
		'vue/require-explicit-emits': 'off',
		'vue/html-self-closing': [
			'error',
			{
				html: {
					void: 'always',
					normal: 'never',
					component: 'always',
				},
				svg: 'always',
				math: 'always',
			},
		],

		// 对应上边的 eslint:recommended
		'no-var': 2,
		'no-unused-vars': 'off',
		// indent: [2, 'tab'], // 强制使用一致的缩进

		// 对应上边的 plugin:@typescript-eslint/recommended
		'@typescript-eslint/no-unused-vars': 'off',
		'@typescript-eslint/no-explicit-any': 'off', // 允许使用any

		// 对应上边的 prettier, plugin:prettier/recommended   这边的配置生效高于.prettier.config文件
		'prettier/prettier': [
			'error',
			{
				tabWidth: 4,
				useTabs: true, // 不使用制表符
				printWidth: 120,
				singleQuote: true,
				semi: false,
				endOfLine: 'auto',
			},
		],
	},
	// 覆盖
	overrides: [
		{
			files: ['*.html'],
			processor: 'vue/.vue',
		},
		{
			files: ['*.js', '*.ts', '*.vue'],
			rules: {
				'no-undef': 'off',
			},
		},
		{
			files: ['*.js'],
			rules: {
				'@typescript-eslint/no-var-requires': 'off',
			},
		},
		{
			files: ['*.vue'],
			parser: 'vue-eslint-parser',
			parserOptions: {
				parser: '@typescript-eslint/parser',
				extraFileExtensions: ['.vue'],
				ecmaVersion: 'latest',
				createDefaultProgram: false,
				ecmaFeatures: {
					jsx: true,
				},
			},
			rules: {
				'no-undef': 'off',
			},
		},
		{
			files: ['**/*.md/*.js', '**/*.md/*.ts'],
			rules: {
				'no-console': 'off',
				'import/no-unresolved': 'off',
				'@typescript-eslint/no-unused-vars': 'off',
			},
		},
	],
	// https://eslint.org/docs/latest/use/configure/language-options#specifying-globals
	globals: {
		DialogOption: 'readonly',
		OptionType: 'readonly',
	},
}
