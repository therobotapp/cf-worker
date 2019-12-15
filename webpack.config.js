const path = require('path')
const webpack = require('webpack')
const { NODE_ENV = 'production' } = process.env
const isProduction = NODE_ENV === 'production'

const TerserPlugin = require('terser-webpack-plugin')

console.log(` Build mode: ${NODE_ENV}`)
const nullModule = path.resolve(__dirname, './null.js')
module.exports = {
  target: 'webworker',
  watchOptions: {
    aggregateTimeout: 1000,
    poll: 1000,
    ignored: ['node_modules', /\.ts$/],
  },
  //
  performance: { hints: 'warning' },
  mode: NODE_ENV,
  devtool: isProduction ? false : 'source-map',
  entry: './dist/worker.js',
  output: {
    path: path.resolve(__dirname, 'bundle'),
    filename: 'worker.js',
  },
  target: 'webworker',
  externals: {
    'isomorphic-fetch': 'fetch',
    'node-fetch': 'fetch',
    console: 'console',
  },
  resolve: {
    symlinks: true,
    alias: { fs: nullModule },
  },
  plugins: [
    new webpack.EnvironmentPlugin({
      NODE_ENV: 'production', // use 'production' unless process.env.NODE_ENV is defined
    }),
  ],
  optimization: {
    usedExports: true,
    // /* // uncomment to disable XD
    ...(isProduction
      ? {
          minimize: true,
          minimizer: [
            new TerserPlugin({
              cache: true,
              parallel: true,
              sourceMap: true,
              terserOptions: {
                output: { comments: false },
                ecma: 8,
                warnings: false,
                parse: {},
                compress: {
                  arguments: false,
                  arrows: true,
                  booleans: false,
                  booleans_as_integers: false,
                  collapse_vars: true,
                  comparisons: false,
                  computed_props: true,
                  conditionals: true,
                  dead_code: true,
                  defaults: true,
                  directives: true,
                  drop_console: isProduction,
                  drop_debugger: true,
                  ecma: 6,
                  evaluate: false,
                  expression: false,
                  global_defs: false,
                  hoist_funs: true,
                  hoist_props: true,
                  hoist_vars: false,
                  ie8: false,
                  if_return: true,
                  inline: true,
                  join_vars: true,
                  keep_classnames: false,
                  keep_fargs: true, // !!false Breaks Apollo federated schema
                  keep_fnames: false,
                  keep_infinity: false,
                  loops: true,
                  module: false,
                  negate_iife: true,
                  passes: 1,
                  properties: true,
                  pure_getters: 'strict',
                  pure_funcs: null,
                  reduce_funcs: true,
                  reduce_vars: false, // !! Breaks Apollo federated schema
                  sequences: true,
                  side_effects: true,
                  switches: true,
                  top_retain: null,
                  toplevel: false,
                  typeofs: true,
                  unsafe: false,
                  unsafe_arrows: false,
                  unsafe_comps: false,
                  unsafe_Function: false,
                  unsafe_math: false,
                  unsafe_methods: false,
                  unsafe_proto: false,
                  unsafe_regexp: false,
                  unsafe_undefined: true, //!
                  unused: true,
                  warnings: true,
                },
                mangle: {
                  properties: false, // !
                  eval: false, // (default false) -- Pass true to mangle names visible in scopes where eval or with are used.
                  keep_classnames: true, //  (default false) -- Pass true to not mangle class names. Pass a regular expression to only keep class names matching that regex. See also: the keep_classnames compress option.
                  // !! keep_fargs: false Breaks Apollo federated schema
                  keep_fnames: true, // (default false) -- Pass true to not mangle function names. Pass a regular expression to only keep class names matching that regex. Useful for code relying on Function.prototype.name. See also: the keep_fnames compress option.
                  module: true, // (default false) -- Pass true an ES6 modules, where the toplevel scope is not the global scope. Implies toplevel.
                  reserved: [], // (default []) -- Pass an array of identifiers that should be excluded from mangling. Example: ["foo", "bar"].
                  toplevel: true, // (default false) -- Pass true to mangle names declared in the top level scope.
                  safari10: false, // (default false)
                }, // Note `mangle.properties` is `false` by default.
              },
            }),
          ],
        }
      : {}),
    /** */
  },
}
