const {src, dest, watch} = require(`gulp`);
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
    return src(`dev/*.js`)
        .pipe(jsLinter())
        .pipe(jsLinter.formatEach(`compact`, process.stderr));
};
exports.lintJS = lintJS;

let compressJS = () => {
    return src(`dev/*.js`)
        .pipe(babel())
        .pipe(jsCompressor())
        .pipe(dest(`js`));
};
exports.compressJS = compressJS;

let compressHTML = () => {
    return src(`dev/*.html`)
        .pipe(htmlCompressor({collapseWhitespace: true}))
        .pipe(dest(`html`));
};
exports.compressHTML = compressHTML;

let compressCSS = () => {
    return src (`dev/*.css`)
        .pipe(cssCompressor({collapseWhitespace: true}))
        .pipe(dest(`css`));
};
exports.compressCSS=compressCSS;

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
    watch(`html/**/*.html`).on(`change`, reload);
};
exports.serve = serve;
