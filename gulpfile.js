const {src, dest, watch, series} = require(`gulp`);
const htmlValidator = require(`gulp-html`);
const jsLinter = require(`gulp-eslint`);
const cssLinter = require(`gulp-stylelint`);
const jsCompressor = require(`gulp-uglify`);
const babel = require(`gulp-babel`);
const htmlCompressor = require(`gulp-htmlmin`);
const cssCompressor = require(`gulp-uglifycss`);
const browserSync = require(`browser-sync`);
const reload = browserSync.reload;


let validateHTML = () => {
    return src(`temp/*.html`)
        .pipe(htmlValidator());
};
exports.validateHTML = validateHTML;

let lintJS = () => {
    return src(`temp/js/*.js`)
        .pipe(jsLinter())
        .pipe(jsLinter.formatEach(`compact`, process.stderr));
};
exports.lintJS = lintJS;

let lintCSS = () => {
    return src(`temp/css/*.css`)
        .pipe(cssLinter({
            failAfterError: true,
            reporters: [
                {formatter: `verbose`, console: true}
            ]
        }));
};
exports.lintCSS = lintCSS;

let transpileJSForDev = () => {
    return src(`./temp/js/app.js`)
        .pipe(babel())
        .pipe(dest(`dev/js`));
};
exports.transpileJSForDev = transpileJSForDev;

let compressJS = () => {
    return src(`temp/js/app.js`)
        .pipe(babel())
        .pipe(jsCompressor())
        .pipe(dest(`prod`));
};
exports.compressJS = compressJS;

let compressHTML = () => {
    return src([`temp/html/*.html`,`temp/html/**/*.html`])
        .pipe(htmlCompressor({collapseWhitespace: true}))
        .pipe(dest(`prod`));
};
exports.compressHTML = compressHTML;

let compressCSS = () => {
    return src ([`temp/css/*.css`,`temp/css/**/*.css`])
        .pipe(cssCompressor({collapseWhitespace: true}))
        .pipe(dest(`prod`));
};
exports.compressCSS = compressCSS;

let serve = () => {
    browserSync({
        notify: true,
        reloadDelay: 0, // A delay is sometimes helpful when reloading at the
        server: {       // end of a series of tasks.
            baseDir: [
                `./temp/`,
                `./html/`
            ]
        }
    });
    watch(`temp/html/**/*.html`, series(validateHTML)).on(`change`, reload);
    watch(`temp/js/**/*.js`, series(lintJS, transpileJSForDev)).on(`change`, reload);
    watch(`temp/css/**/*.css`, series(lintCSS, compressCSS)).on(`change`, reload);
};
exports.serve = series(
    lintJS,
    lintCSS,
    compressJS,
    validateHTML,
    transpileJSForDev,
    serve
);
exports.build = series(
    compressJS,
    compressHTML,
    compressCSS
);
