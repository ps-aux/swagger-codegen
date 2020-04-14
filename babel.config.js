module.exports = {
    presets: [
        [
            '@babel/preset-env',
            {
                targets: {
                    node: true
                },
                useBuiltIns: 'usage',
                corejs: 3
            }
        ],
        '@babel/preset-typescript'
    ],
    plugins: [
        '@babel/plugin-proposal-class-properties',
        [
            'module-resolver',
            {
                extensions: ['.js', '.ts', '.tsx'],
                root: ['.']
            }
        ]
    ]
}
