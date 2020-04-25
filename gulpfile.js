const { watch } = require(`gulp`);
const browserSync = require(`browser-sync`);
const reload = browserSync.reload;
const htmlValidator = require(`gulp-html`);
const jsLinter = require(`gulp-eslint`);
const cssLinter = require(`gulp-stylelint`);
const jsCompressor = require(`gulp-uglify`);
const babel = require(`gulp-babel`);
const htmlCompressor = require(`gulp-htmlmin`);

let validateHTML = () => {
    return src(`html-files/*.html`)
        .pipe(htmlValidator());
};

let serve = () => {
    browserSync({
        notify: true,
        reloadDelay: 0, // A delay is sometimes helpful when reloading at the
        server: {       // end of a series of tasks.
            baseDir: [
                `html`
            ]
        }
    });
};

let lintJS = () => {
    return src(`scripts/*.js`)
        .pipe(jsLinter())
        .pipe(jsLinter.formatEach(`compact`, process.stderr));
};

let lintCSS = () => {
    return src(`css/*.css`)
        .pipe(cssLinter({
            failAfterError: true,
            reporters: [
                {formatter: `verbose`, console: true}
            ]
        }));
};

let compressJS = () => {
    return src(`uncompressed-scripts/*.js`)
        .pipe(babel())
        .pipe(jsCompressor())
        .pipe(dest(`compressed-scripts`));
};

let compressHTML = () => {
    return src(`uncompressed-html/*.html`)
        .pipe(htmlCompressor({collapseWhitespace: true}))
        .pipe(dest(`compressed-html/`));
};

exports.compressHTML = compressHTML;
exports.validateHTML = validateHTML;
exports.compressJS = compressJS;
exports.lintJS = lintJS;
exports.lintCSS = lintCSS;
exports.serve = serve;
