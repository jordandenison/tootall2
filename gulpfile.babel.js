import fs from 'fs'
import path from 'path'

import gulp from 'gulp'
import babel from 'gulp-babel'
import stylus from 'gulp-stylus'
import Filter from 'gulp-filter'
import concat from 'gulp-concat'
import sync from 'run-sequence'
import webpackStream from 'webpack-stream'
import serve from 'browser-sync'
import historyApiFallback from 'connect-history-api-fallback'

const webDevPort = process.env.PORT || 3000

const publicRoot = 'public'
const srcRoot = 'src'

const resolveToSrc = glob => path.join(srcRoot, glob || '')

const nonSpecJs = '**/*!(.spec.js).js'
const styl = '**/*.styl'
const css = '**/*.css'

const paths = {
  js: resolveToSrc(nonSpecJs),
  styl: resolveToSrc(styl),
  css: resolveToSrc(css),
  semantic: './node_modules/semantic-ui-css/semantic.css',
  entry: {
    js: path.join(srcRoot, 'index.js')
  },
  output: publicRoot
}

function handleBuildError (e) {
  console.log(e && e.stack || e)
  this.emit('end')
}

const buildServer = () =>
  gulp.src('src/**/*.js')
    .pipe(babel({ presets: ['es2015', 'react'] }))
    .on('error', handleBuildError)
    .pipe(gulp.dest('dist'))
    .on('error', handleBuildError)

gulp.task('build-server', () => buildServer())

const buildCSS = prod => {
  const filter = Filter(styl, { restore: true })

  return gulp.src([paths.semantic, paths.styl, paths.css])
    .pipe(filter)
    .pipe(stylus({ compress: !!prod }))
    .pipe(filter.restore)
    .pipe(concat('styles.css'))
    .pipe(gulp.dest('public/styles'))
}

gulp.task('build-css', () => buildCSS())
gulp.task('build-css-prod', () => buildCSS(true))

const buildJS = prod =>
  gulp.src(paths.entry.js)
    .pipe(webpackStream(require(`./webpack.javascript${prod ? '.prod' : ''}.config`)))
    .on('error', handleBuildError)
    .pipe(gulp.dest(paths.output))
    .on('error', handleBuildError)

gulp.task('build-js', () => buildJS())
gulp.task('build-js-prod', () => buildJS(true))

gulp.task('cacheBuster', cb => fs.writeFile('./cacheBuster.js', `module.exports = '-' + ${Date.now()}`, cb))

gulp.task('serve', () =>
  serve({
    port: webDevPort,
    open: false,
    server: {
      baseDir: publicRoot,
      middleware: [ historyApiFallback() ]
    }
  }))

gulp.task('watch', () =>
  gulp
    .watch([paths.js]
    .concat([paths.styl]), ['build', serve.reload]))

gulp.task('build', done => sync('build-server', 'build-js', 'build-css', done))
gulp.task('build-prod', done => sync('cacheBuster', 'build-server', 'build-js-prod', 'build-css-prod', done))
gulp.task('default', done => sync('build', 'serve', 'watch', done))
