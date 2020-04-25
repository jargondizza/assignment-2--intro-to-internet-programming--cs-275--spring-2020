const { watch,src,dest,series } = require(`gulp`);
const browserSync = require(`browser-sync`);
const reload = browserSync.reload;
const htmlValidator = require(`gulp-html`);
const jsLinter = require(`gulp-eslint`);
const cssLinter = require(`gulp-stylelint`);
const cssCompressor=require(`gulp-uglifycss`);
const jsCompressor = require(`gulp-uglify`);
const babel = require(`gulp-babel`);
const htmlCompressor = require(`gulp-htmlmin`);

let validateHTML = () => {
    return src(`html/*.html`)
        .pipe(htmlValidator());
};

let serve = () => {
    browserSync({
        notify: true,
        reloadDelay: 0, // A delay is sometimes helpful when reloading at the
        server: {       // end of a series of tasks.
            baseDir: [
                `./temp`,
                `html`
            ]
        }
    });
    watch(`html/**/*.html`).on(`change`, reload);
};

let lintJS = () => {
    return src(`js/*.js`)
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

let compressCSS = () => {
    return src (`css/*.css`)
        .pipe(cssCompressor({collapseWhitespace: true}))
        .pipe(dest(`css`));
};

let compressJS = () => {
    return src(`js/*.js`)
        .pipe(babel())
        .pipe(jsCompressor())
        .pipe(dest(`js`));
};

let compressHTML = () => {
    return src(`html/*.html`)
        .pipe(htmlCompressor({collapseWhitespace: true}))
        .pipe(dest(`html/`));
};

exports.compressHTML = compressHTML;
exports.validateHTML = validateHTML;
exports.compressJS = compressJS;
exports.compressCSS=compressCSS;
exports.lintJS = lintJS;
exports.lintCSS = lintCSS;
exports.serve = serve;
exports.build=series(
    compressHTML,
    compressJS
);
