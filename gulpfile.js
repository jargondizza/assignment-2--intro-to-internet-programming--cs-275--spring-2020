const {src, dest, watch,series} = require(`gulp`);
const htmlValidator = require(`gulp-html`);
const jsLinter = require(`gulp-eslint`);
const jsCompressor = require(`gulp-uglify`);
const babel = require(`gulp-babel`);
const htmlCompressor = require(`gulp-htmlmin`);
const cssCompressor = require(`gulp-uglifycss`);
const browserSync = require(`browser-sync`);
const reload = browserSync.reload;

let validateHTML = () => {
    return src(`dev/*.html`)
        .pipe(htmlValidator());
};
exports.validateHTML = validateHTML;

let lintJS = () => {
    return src([`dev/js/*.js`,`dev/js/**/*.js`])
        .pipe(jsLinter())
        .pipe(jsLinter.formatEach(`compact`, process.stderr));
};
exports.lintJS = lintJS;

let compressJS = () => {
    return src(`dev/*.js`)
        .pipe(babel())
        .pipe(jsCompressor())
        .pipe(dest(`prod`));
};
exports.compressJS = compressJS;

let compressHTML = () => {
    return src([`dev/html/*.html`,`dev/html/**/*.html`])
        .pipe(htmlCompressor({collapseWhitespace: true}))
        .pipe(dest(`prod`));
};
exports.compressHTML = compressHTML;

let compressCSS = () => {
    return src ([`dev/css/*.css`,`dev/css/**/*.css`])
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
                `temp`,
                `dev`,
                `dev/html`
            ]
        }
    });
    watch(`dev/html/**/*.html`, series(validateHTML)).on(`change`, reload);
    watch(`dev/js/**/*.js`, series(lintJS, transpileJSForDev)).on(`change`, reload);
    watch(`dev/css/**/*.css`, series(compressCSS)).on(`change`, reload);
};
exports.serve = series(lintJS, transpileJSForDev, validateHTML, serve);

let copyUnprocessedAssetsForProd = () => {
    return src([
        `dev/*.*`,       // Source all files,
        `dev/**`,        // and all folders,
        `!dev/html/`,    // but not the HTML folder
        `!dev/html/*.*`, // or any files in it
        `!dev/html/**`,  // or any sub folders;
        `!dev/**/*.js`,  // ignore JS;
        `!dev/css/**` // and, ignore Sass/CSS.
    ], {dot: true}).pipe(dest(`prod`));
};
exports.copyUnprocessedAssetsForProd = copyUnprocessedAssetsForProd;

exports.build = series(
    compressHTML,
    compressCSS,
    transpileJsForProd,
    copyUnprocessedAssetsForProd
);
