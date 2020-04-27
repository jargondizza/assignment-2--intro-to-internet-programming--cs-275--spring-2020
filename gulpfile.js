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

let copyCSS = () => {
    return src (`css/*.css`)
        .pipe(dest(`temp/css`));
};
exports.copyCSS = copyCSS;

let copyHTML = () => {
    return src (`html/*.html`)
        .pipe(dest(`temp/html`));
};
exports.copyHTML = copyHTML;

let copyJS = () => {
    return src (`js/*.js`)
        .pipe(dest(`temp/js`));
};
exports.copyJS = copyJS;

let validateHTML = () => {
    return src(`temp/*.html`)
        .pipe(htmlValidator());
};
exports.validateHTML = validateHTML;

let lintJS = () => {
    return src(`js/*.js`)
        .pipe(jsLinter())
        .pipe(jsLinter.formatEach(`compact`, process.stderr));
};
exports.lintJS = lintJS;

let lintJSForProd = () => {
    return src(`temp/js/*.js`)
        .pipe(jsLinter())
        .pipe(jsLinter.formatEach(`compact`, process.stderr));
};
exports.lintJSForProd = lintJSForProd;

let lintCSS = () => {
    return src(`css/*.css`)
        .pipe(cssLinter({
            failAfterError: true,
            reporters: [
                {formatter: `verbose`, console: true}
            ]
        }));
};
exports.lintCSS = lintCSS;

let transpileJSForDev = () => {
    return src(`js/*.js`)
        .pipe(babel())
        .pipe(dest(`temp/js/`));
};
exports.transpileJSForDev = transpileJSForDev;

let compressJS = () => {
    return src(`js/*.js`)
        .pipe(babel())
        .pipe(jsCompressor())
        .pipe(dest(`prod/js`));
};
exports.compressJS = compressJS;

let compressHTML = () => {
    return src([`html/*.html`,`html/**/*.html`])
        .pipe(htmlCompressor({collapseWhitespace: true}))
        .pipe(dest(`prod/html`));
};
exports.compressHTML = compressHTML;

let compressCSS = () => {
    return src ([`css/*.css`,`css/**/*.css`])
        .pipe(cssCompressor({collapseWhitespace: true}))
        .pipe(dest(`prod/css`));
};
exports.compressCSS = compressCSS;

let dev = () => {
    browserSync({
        notify: true,
        reloadDelay: 0, // A delay is sometimes helpful when reloading at the
        server: {       // end of a series of tasks.
            baseDir: [
                `temp`,
                `html`
            ]
        }
    });
    watch(`html/**/*.html`, series(copyHTML, validateHTML))
        .on(`change`, reload);
    watch(`js/**/*.js`, series(
        copyJS, lintJS, transpileJSForDev))
        .on(`change`, reload);
    watch(`css/**/*.css`, series(
        copyCSS, lintCSS, compressCSS))
        .on(`change`, reload);
};
exports.dev = series(
    copyCSS,
    copyHTML,
    copyJS,
    validateHTML,
    lintJS,
    lintCSS,
    transpileJSForDev,
    dev
);
exports.build = series(
    lintJSForProd,
    compressJS,
    compressHTML,
    compressCSS
);
