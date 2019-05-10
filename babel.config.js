module.exports = {
    presets: [
        [
            '@babel/preset-env',
            {
                targets: {
                    node: true
                }
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
