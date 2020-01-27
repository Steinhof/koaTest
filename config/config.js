// const fs = require('fs');

// const getMainCssFile = fs.readdirSync('./src/css/');
// const getJsFiles = fs.readdirSync('./src/js/');

// Export variables
module.exports = {
    name: 'Example Project',
    paths: {
        src: {
            base: './src/',
            client: {
                base: './src/client/',
                modules: './src/client/modules/',
                styles: './src/client/styles/',
                templates: './src/client/templates/',
            },
        },
        dist: {
            base: './dist/',
            public: {
                base: './dist/public/',
                css: './dist/public/css/',
                js: './dist/public/js/',
                img: './dist/public/img/',
                fonts: './dist/public/fonts/',
            },
        },
        config: {
            base: './config/',
        },
        logs: {
            base: './logs',
        },
    },
    urls: {
        dev: 'http://localhost:3000',
        graphQl: 'http://localhost:4000/graphql',
        proxy: 'http://localhost:3001',
    },
    ports: {
        dev: 3000,
        proxy: 3001,
        graphql: 4000,
    },
    globs: {
        src: ['./src/**/*'],
        dist: ['./dist/**/*'],
        client: ['./src/client/**/*'],
        distPublic: ['./dist/public/**/*'],
        distModules: ['./dist/js/*'],
        distStyles: ['./dist/css/*'],
        distImg: ['./dist/img/**/*'],
    },
    entries: {
        html: {
            main: './dist/public/index.html',
        },
        styles: {
            main: './src/client/styles/main.less',
        },
        modules: {
            html: {
                main: './dist/public/index.html',
            },
            mobile: {
                react: {
                    main: './src/client/mobile/main.tsx',
                },
                html: {
                    template: './src/client/mobile/templates/module.html',
                },
                styles: {
                    main: './src/client/mobile/styles/main.less',
                },
            },
            desktop: {
                react: {
                    main: './src/client/desktop/main.tsx',
                },
                html: {
                    template: './src/client/desktop/templates/module.html',
                },
                styles: {
                    main: './src/client/desktop/styles/main.less',
                },
            },
            sw: {
                main: './src/client/modules/utils/serviceWorker/sw.ts',
                compiled: './dist/public/sw.js',
            },
        },
        images: {
            favicon: './src/public/img/favicon/tour-favicon.ico',
        },
        server: {
            main: {
                ts: './src/server.ts',
                js: './dist/server.js',
            },
        },
    },
    configs: {
        webpack: {
            dev: './webpack.dev.js',
            build: './webpack.build.js',
            sw: './webpack.sw.js',
            node: './webpack.node.js',
        },
        tsconfig: {
            dev: 'tsconfig.json',
        },
        env: {
            config: './src/.env',
        },
    },
};
