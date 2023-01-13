const { src, dest, watch , series, parallel } = require('gulp');
const autoprefixer = require('autoprefixer'); // Diseño para todos los navegadores 
const sass = require('gulp-sass') (require ('sass')); // Pre-procesador css
const browserSync = require('browser-sync'); // sincronizar navegador( ejem: mobile)
const postcss = require('gulp-postcss'); // Herramienta para hacer modificaciones al css
const cssnano = require('cssnano'); // minifica el css
const sourcemaps = require('gulp-sourcemaps'); // Permite visualizar el código en el navegador, aunque este se encuentre minificado
const purgecss = require('gulp-purgecss') // Elimina css que no se usa en el html
const terser = require('gulp-terser')
const concat = require('gulp-concat')

const path = {
    scss: './scss/**/*.scss', // ? 'Ruta SCSS de entrada
    css: './build/css', // ? Ruta CSS de destino
    js: './scripts/**/*.js',  // ? Ruta JS de entrada
    jsDest: './build/js' // ? Ruta JS de destino
}
function server() {
    browserSync.init({
        server: './'
    });
    // watch(path.scss, ['css']);
    watch('./*.html').on('change', browserSync.reload);
    watch(path.js).on('change', browserSync.reload);
    // watch(path.scss).on('change', browserSync.reload);

}

function css() {
    return src(path.scss)
        .pipe(sourcemaps.init())
        .pipe(sass().on('error', sass.logError))
        // .pipe(autoPrefixer({
        //     versions: ['last 2 browsers']
        // }))
        .pipe(postcss([autoprefixer({
            versions: ['last 2 browsers']
        }), cssnano()]))
        .pipe(sourcemaps.write('.'))
        .pipe(dest(path.css))
        .pipe(browserSync.stream());
}

function js() {
    return src(path.js)
        .pipe(sourcemaps.init())
        .pipe(terser())
        .pipe(concat('index.js'))
        .pipe(sourcemaps.write('.'))
        .pipe(dest(path.jsDest))
}

// function limpiarCodigo() {
//     return src('./css/app.css')
//         .pipe(purgecss({
//             content: ['./index.html']
//         }))
//         .pipe(dest(path.css))
// }

function purge() {
    return src('./css/app.css')
        .pipe(purgecss({
            content: ['./*.html']
        }))
        .pipe(dest('./css/'))
}

function watchFiles() {
    watch(path.scss, css);
    watch(path.js, js);
}

exports.purge = purge;
exports.css = css;
exports.watchFiles = watchFiles

exports.default = parallel(css, js, server, watchFiles);