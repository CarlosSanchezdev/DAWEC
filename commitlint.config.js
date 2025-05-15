export default {
    extends: ['@commitlint/config-conventional'],
    rules: {
        'type-enum': [2, 'always', ['feat', 'fix', 'docs', 'style', 'refactor', 'test', 'chore']],
        'scope-enum': [2, 'always', [
            'tema1', 'tema2', 'tema3', 'tema4', 'tema5', 'tema6', 'tema7', 'tema8',
            'sim1', 'sim2', 'sim3', 'sim4', 'sim5', 'sim6', 'sim7', 'sim8'
        ]],
        'type-case': [2, 'always', 'lower'],
        'scope-case': [2, 'always', 'lower'],
        'scope-empty': [2, 'never'],
        'type-empty': [2, 'never'],
        'subject-empty': [2, 'never'],
        'subject-full-stop': [2, 'never', '.'],
        'header-max-length': [2, 'always', 30]
    }
};
