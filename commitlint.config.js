module.exports = {
  /*
   * Resolve and load @commitlint/config-conventional from node_modules.
   * Referenced packages must be installed
   */
  extends: ['@commitlint/config-conventional'],
  /*
   * Resolve and load conventional-changelog-atom from node_modules.
   * Referenced packages must be installed
   */
  parserPreset: 'conventional-changelog-angular',
  /*
   * Resolve and load @commitlint/format from node_modules.
   * Referenced package must be installed
   */
  formatter: '@commitlint/format',
  /*
   * Any rules defined here will override rules from @commitlint/config-conventional
   */
  rules: {
    'type-enum': [
      2,
      'always',
      [
        'build',
        'ci',
        'docs',
        'feat',
        'fix',
        'perf',
        'refactor',
        'chore',
        'style',
        'test',
      ],
    ],
  },
  /*
   * Functions that return true if commitlint should ignore the given message.
   */
  ignores: [commit => commit === ''],
  /*
   * Whether commitlint uses the default ignore rules.
   */
  defaultIgnores: true,
}
