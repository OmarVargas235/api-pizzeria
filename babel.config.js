module.exports = {
    presets: [
        [
            '@babel/preset-env',
            {
                targets: {
                    node: 'current'
                }
            }
        ],
        '@babel/preset-typescript'
    ],
    plugins: [
        [
            'module-resolver',
            {
                alias: {
                    '@routes': './src/routes',
                    '@config': './src/config',
                    '@controllers': './src/controllers',
                    '@models': './src/models',
                    '@helpers': './src/helpers',
                    '@interfaces': './src/interfaces',
                    '@middleware': './src/middleware',
                }
            }
        ]
    ]
};