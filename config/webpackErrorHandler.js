function webpackErrorHandler(err, stats) {
    // Stats Object
    if (err) {
        console.error(err.stack || err);
        if (err.details) {
            console.error(err.details);
        }
        return;
    }
    const statsConfig = {
        all: false,
        /* Show entries */
        assets: true,
        colors: true,
        modules: false,
        errors: true,
        publicPath: false,
        timings: true,
        cachedAssets: true,
        /* Stat logs */
        warnings: true,
        performance: true,
        moduleTrace: true,
        errorDetails: true,
    };

    // Result (you can choose stats preset)
    console.log(stats.toString(statsConfig));
}

module.exports = webpackErrorHandler;
