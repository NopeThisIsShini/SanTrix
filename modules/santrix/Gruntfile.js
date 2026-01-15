/*eslint-env node */
const { string: PluginString } = require('rollup-plugin-string');
const FilesAsStrings = PluginString({
  include: '**/*.svg'
});

let zipUtils = require('./tools/modules/zip-helper');
let gruntUtils = require('./tools/modules/grunt-utils');
let gruntWebPack = require('./tools/modules/grunt-webpack');
let swag = require('@ephox/swag');
let path = require('path');

let plugins = [
  'accordion', 'advlist', 'anchor', 'autolink', 'autoresize', 'autosave', 'charmap', 'code', 'codesample',
  'directionality', 'emoticons', 'help', 'fullscreen', 'image', 'importcss', 'insertdatetime',
  'link', 'lists', 'media', 'nonbreaking', 'pagebreak', 'preview', 'save', 'searchreplace',
  'table', 'template', 'visualblocks', 'visualchars', 'wordcount', 'quickbars'
];

let themes = [
  'silver'
];

let models = [
  'dom',
];

let oxideUiSkinMap = {
  'dark': 'oxide-dark',
  'default': 'oxide',
  'santrix-5': 'santrix-5',
  'santrix-5-dark': 'santrix-5-dark'
};

const stripSourceMaps = function (data) {
  const sourcemap = data.lastIndexOf('/*# sourceMappingURL=');
  return sourcemap > -1 ? data.slice(0, sourcemap) : data;
};

module.exports = function (grunt) {
  const packageData = grunt.file.readJSON('package.json');

  // Determine the release date
  const dateRe = new RegExp('^##\\s+' + packageData.version.toString().replace(/\./g, '\\.') + '\\s+\\-\\s+([\\d-]+)$', 'm');
  const changelog = grunt.file.read('CHANGELOG.md').toString();
  const dateMatch = dateRe.exec(changelog);
  if (dateMatch !== null) {
    packageData.date = dateMatch[1];
  } else {
    packageData.date = 'TBD';
  }

  grunt.initConfig({
    pkg: packageData,

    shell: {
      prismjs: { command: 'node ./bin/build-prism.js', cwd: '../../' },
      tsc: { command: 'tsc -b' },
      moxiedoc: { command: 'moxiedoc "src/core/main/ts" -t santrixnext --fail-on-warning --dry' }
    },

    eslint: {
      target: [ 'src/**/*.ts' ]
    },

    globals: {
      options: {
        configFile: 'src/core/main/json/globals.json',
        outputDir: 'lib/globals',
        templateFile: 'src/core/main/js/GlobalsTemplate.js'
      }
    },

    rollup: Object.assign(
      {
        core: {
          options: {
            treeshake: true,
            format: 'iife',
            onwarn: swag.onwarn,
            plugins: [
              FilesAsStrings,
              swag.nodeResolve({
                basedir: __dirname,
                prefixes: {
                  'santrix/core': 'lib/core/main/ts'
                }
              }),
              swag.remapImports()
            ]
          },
          files:[
            {
              src: 'lib/core/main/ts/api/Main.js',
              dest: 'js/santrix/santrix.js'
            }
          ]
        },
        'core-types': {
          options: {
            treeshake: true,
            format: 'es',
            onwarn: (warning) => {
              // Ignore circular deps in types
              if (warning.code !== 'CIRCULAR_DEPENDENCY') {
                swag.onwarn(warning)
              }
            },
            plugins: [
              FilesAsStrings,
              swag.dts({
                respectExternal: true,
                keepVariables: [ 'santrix' ],
                keepComments: false
              })
            ]
          },
          files: [
            {
              src: 'lib/core/main/ts/api/PublicApi.d.ts',
              dest: 'js/santrix/santrix.d.ts'
            }
          ]
        }
      },
      gruntUtils.generate(plugins, 'plugin', (name) => {
        return {
          options: {
            treeshake: true,
            format: 'iife',
            onwarn: swag.onwarn,
            plugins: [
              FilesAsStrings,
              swag.nodeResolve({
                basedir: __dirname,
                prefixes: gruntUtils.prefixes({
                  'santrix/core': 'lib/globals/santrix/core'
                }, [
                  [`santrix/plugins/${name}`, `lib/plugins/${name}/main/ts`]
                ]),
                mappers: [
                  swag.mappers.replaceDir('./lib/core/main/ts/api', './lib/globals/santrix/core/api'),
                  swag.mappers.invalidDir('./lib/core/main/ts')
                ]
              }),
              swag.remapImports()
            ]
          },
          files:[ { src: `lib/plugins/${name}/main/ts/Main.js`, dest: `js/santrix/plugins/${name}/plugin.js` } ]
        };
      }),
      gruntUtils.generate(themes, 'theme', (name) => {
        return {
          options: {
            treeshake: true,
            format: 'iife',
            onwarn: swag.onwarn,
            plugins: [
              FilesAsStrings,
              swag.nodeResolve({
                basedir: __dirname,
                prefixes: gruntUtils.prefixes({
                  'santrix/core': 'lib/globals/santrix/core'
                }, [
                  [`santrix/themes/${name}/resources`, `src/themes/${name}/main/resources`],
                  [`santrix/themes/${name}`, `lib/themes/${name}/main/ts`]
                ]),
                mappers: [
                  swag.mappers.replaceDir('./lib/core/main/ts/api', './lib/globals/santrix/core/api'),
                  swag.mappers.invalidDir('./lib/core/main/ts')
                ]
              }),
              swag.remapImports()
            ]
          },
          files:[
            {
              src: `lib/themes/${name}/main/ts/Main.js`,
              dest: `js/santrix/themes/${name}/theme.js`
            }
          ]
        };
      }),
      gruntUtils.generate(models, 'model', (name) => {
        return {
          options: {
            treeshake: true,
            format: 'iife',
            onwarn: swag.onwarn,
            plugins: [
              FilesAsStrings,
              swag.nodeResolve({
                basedir: __dirname,
                prefixes: gruntUtils.prefixes({
                  'santrix/core': 'lib/globals/santrix/core'
                }, [
                  [`santrix/models/${name}`, `lib/models/${name}/main/ts`]
                ]),
                mappers: [
                  swag.mappers.replaceDir('./lib/core/main/ts/api', './lib/globals/santrix/core/api'),
                  swag.mappers.invalidDir('./lib/core/main/ts')
                ]
              }),
              swag.remapImports()
            ]
          },
          files:[
            {
              src: `lib/models/${name}/main/ts/Main.js`,
              dest: `js/santrix/models/${name}/model.js`
            }
          ]
        };
      })
    ),

    emojis: {
      twemoji: {
        base: '',
        ext: '.png'
      }
    },

    terser: Object.assign(
      {
        options: {
          ecma: 2018,
          output: {
            comments: 'all',
            ascii_only: true
          },
          compress: {
            passes: 2
          }
        },
        core: {
          files: [
            { src: 'js/santrix/santrix.js', dest: 'js/santrix/santrix.min.js' },
            { src: 'js/santrix/icons/default/icons.js', dest: 'js/santrix/icons/default/icons.min.js' },
          ]
        },
        // very similar to the emoticons plugin, except mangle is off
        'emoticons-raw': {
          options: {
            mangle: false,
            compress: false,
            output: {
              indent_level: 2
            }
          },
          files: [
            { src: 'src/plugins/emoticons/main/js/emojis.js', dest: 'js/santrix/plugins/emoticons/js/emojis.js' },
            { src: 'src/plugins/emoticons/main/js/emojiimages.js', dest: 'js/santrix/plugins/emoticons/js/emojiimages.js' }
          ]
        }
      },
      gruntUtils.generate(plugins, 'plugin', (name) => {
        var pluginExtras = {
          emoticons: [
            { src: 'src/plugins/emoticons/main/js/emojis.js', dest: 'js/santrix/plugins/emoticons/js/emojis.min.js' },
            { src: 'src/plugins/emoticons/main/js/emojiimages.js', dest: 'js/santrix/plugins/emoticons/js/emojiimages.min.js' }
          ]
        };
        return {
          files: [
            { src: `js/santrix/plugins/${name}/plugin.js`, dest: `js/santrix/plugins/${name}/plugin.min.js` }
          ].concat(pluginExtras.hasOwnProperty(name) ? pluginExtras[name] : [])
        };
      }),
      gruntUtils.generate(themes, 'theme', (name) => {
        return {
          files: [ { src: `js/santrix/themes/${name}/theme.js`, dest: `js/santrix/themes/${name}/theme.min.js` } ]
        };
      }),
      gruntUtils.generate(models, 'model', (name) => {
        return {
          files: [ { src: `js/santrix/models/${name}/model.js`, dest: `js/santrix/models/${name}/model.min.js` } ]
        };
      })
    ),

    'webpack-dev-server': {
      everything: () => gruntWebPack.all(plugins, themes, models),
      options: {
        devServer: {
          port: grunt.option('webpack-port') !== undefined ? grunt.option('webpack-port') : 3000,
          host: '0.0.0.0',
          allowedHosts: 'all',
          static: {
            publicPath: '/',
            directory: path.join(__dirname)
          },
          hot: false,
          liveReload: false,
          setupMiddlewares: (middlewares, devServer) => {
            gruntWebPack.generateDemoIndex(grunt, devServer.app, plugins, themes, models);
            return middlewares;
          }
        }
      },
    },

    concat: Object.assign({
        options: {
          process: function(content) {
            return content.
              replace(/@@version@@/g, packageData.version).
              replace(/@@releaseDate@@/g, packageData.date);
          }
        },
        core: {
          src: [
            'src/core/text/build-header.js',
            'src/core/text/dompurify-license-header.js',
            'js/santrix/santrix.js'
          ],
          dest: 'js/santrix/santrix.js'
        }
      },
      gruntUtils.generate(plugins, 'plugin', function (name) {
        return {
          src: [
            'src/core/text/build-header.js',
            name === 'codesample' ? 'src/core/text/prismjs-license-header.js' : null,
            `js/santrix/plugins/${name}/plugin.js`
          ].filter(Boolean),
          dest: `js/santrix/plugins/${name}/plugin.js`
        };
      }),
      gruntUtils.generate(themes, 'theme', function (name) {
        return {
          src: [
            'src/core/text/build-header.js',
            name === 'silver' ? 'src/core/text/dompurify-license-header.js' : null,
            `js/santrix/themes/${name}/theme.js`
          ].filter(Boolean),
          dest: `js/santrix/themes/${name}/theme.js`
        };
      }),
      gruntUtils.generate(models, 'model', function (name) {
        return {
          src: [
            'src/core/text/build-header.js',
            `js/santrix/models/${name}/model.js`
          ],
          dest: `js/santrix/models/${name}/model.js`
        };
      })
    ),

    copy: {
      core: {
        options: {
          process: function (content) {
            return content.
              replace('@@majorVersion@@', packageData.version.split('.')[0]).
              replace('@@minorVersion@@', packageData.version.split('.').slice(1).join('.')).
              replace('@@releaseDate@@', packageData.date);
          }
        },
        files: [
          {
            src: 'js/santrix/santrix.js',
            dest: 'js/santrix/santrix.js'
          },
          {
            src: 'js/santrix/santrix.min.js',
            dest: 'js/santrix/santrix.min.js'
          },
          {
            src: 'src/core/main/text/readme_lang.md',
            dest: 'js/santrix/langs/README.md'
          },
          {
            src: '../../LICENSE.TXT',
            dest: 'js/santrix/license.txt'
          },
          {
            src: '../../README.md',
            dest: 'js/santrix/README.md'
          }
        ]
      },
      'default-icons': {
        files: [
          {
            expand: true,
            cwd: '../oxide-icons-default/dist/icons/default',
            src: '**',
            dest: 'js/santrix/icons/default'
          }
        ]
      },
      'ui-skins': {
        files: gruntUtils.flatMap(oxideUiSkinMap, function (name, mappedName) {
          return [
            {
              expand: true,
              cwd: '../oxide/build/skins/ui/' + name,
              src: '**',
              dest: 'js/santrix/skins/ui/' + mappedName
            }
          ];
        })
      },
      'content-skins': {
        files: [
          {
            expand: true,
            cwd: '../oxide/build/skins/content',
            src: '**',
            dest: 'js/santrix/skins/content'
          },
        ]
      },
      'visualblocks-plugin': {
        files: [
          { src: 'src/plugins/visualblocks/main/css/visualblocks.css', dest: 'js/santrix/plugins/visualblocks/css/visualblocks.css' }
        ]
      },
      'html-i18n': {
        files: [
          {
            expand: true,
            cwd: 'src/plugins/help/main/js/i18n/keynav',
            src: '**',
            dest: 'js/santrix/plugins/help/js/i18n/keynav'
          }
        ]
      }
    },

    moxiezip: {
      production: {
        options: {
          baseDir: 'santrix',
          excludes: [
            'js/**/plugin.js',
            'js/**/theme.js',
            'js/**/model.js',
            'js/**/icons.js',
            'js/**/*.map',
            'js/santrix/santrix.full.min.js',
            'js/santrix/plugins/moxiemanager',
            'js/santrix/plugins/visualblocks/img',
            'js/santrix/README.md',
            'README.md'
          ],
          to: 'dist/santrix_<%= pkg.version %>.zip',
          dataFilter: (args) => {
            if (args.filePath.endsWith('.min.css')) {
              args.data = stripSourceMaps(args.data);
            }
          }
        },
        src: [
          'js/santrix/langs',
          'js/santrix/plugins',
          'js/santrix/skins/**/*.js',
          'js/santrix/skins/**/*.min.css',
          'js/santrix/skins/**/*.woff',
          'js/santrix/icons',
          'js/santrix/themes',
          'js/santrix/models',
          'js/santrix/santrix.d.ts',
          'js/santrix/santrix.min.js',
          'js/santrix/license.txt',
          'CHANGELOG.md',
          'LICENSE.TXT',
          'README.md'
        ]
      },

      development: {
        options: {
          baseDir: 'santrix',
          excludes: [
            '../../modules/*/dist',
            '../../modules/*/build',
            '../../modules/*/scratch',
            '../../modules/*/lib',
            '../../modules/*/tmp',
            '../../modules/santrix/js/santrix/santrix.full.min.js',
            '../../scratch',
            '../../node_modules'
          ],
          to: 'dist/santrix_<%= pkg.version %>_dev.zip'
        },
        files: [
          {
            expand: true,
            cwd: '../../',
            src: [
              'modules/*/src',
              'modules/*/CHANGELOG.md',
              'modules/*/Gruntfile.js',
              'modules/*/gulpfile.js',
              'modules/*/README.md',
              'modules/*/README.md',
              'modules/*/package.json',
              'modules/*/tsconfig*.json',
              'modules/*/.eslint*.json',
              'modules/*/webpack.config.js',
              'modules/*/.stylelintignore',
              'modules/*/.stylelintrc',
              'modules/santrix/tools',
              'bin',
              'patches',
              '.yarnrc',
              'LICENSE.TXT',
              'README.md',
              'lerna.json',
              'package.json',
              'tsconfig*.json',
              '.eslint*.json',
              'yarn.lock'
            ]
          },
          {
            expand: true,
            cwd: '../../',
            src: 'modules/santrix/js',
            dest: '/',
            flatten: true
          }
        ]
      },

      cdn: {
        options: {
          onBeforeSave: function (zip) {
            zip.addData('dist/version.txt', packageData.version);
          },
          pathFilter: function (zipFilePath) {
            return zipFilePath.replace('js/santrix/', 'dist/');
          },
          dataFilter: (args) => {
            if (args.filePath.endsWith('.min.css')) {
              args.data = stripSourceMaps(args.data);
            }
          },
          onBeforeConcat: function (destPath, chunks) {
            // Strip the license from each file and prepend the license, so it only appears once
            var license = grunt.file.read('src/core/text/build-header.js').replace(/@@version@@/g, packageData.version).replace(/@@releaseDate@@/g, packageData.date);
            return [license].concat(chunks.map(function (chunk) {
              return chunk.replace(license, '').trim();
            }));
          },
          excludes: [
            'js/**/config',
            'js/**/scratch',
            'js/**/classes',
            'js/**/lib',
            'js/**/dependency',
            'js/**/src',
            'js/**/*.less',
            'js/**/*.dev.js',
            'js/**/*.dev.svg',
            'js/**/*.map',
            'js/santrix/santrix.full.min.js',
            'js/santrix/plugins/moxiemanager',
            'js/santrix/plugins/visualblocks/img',
            'js/santrix/README.md',
            'README.md',
            'js/tests/.jshintrc'
          ],
          concat: [
            {
              src: [
                'js/santrix/santrix.d.ts',
                'js/santrix/santrix.min.js',
                'js/santrix/themes/*/theme.min.js',
                'js/santrix/models/*/model.min.js',
                'js/santrix/plugins/*/plugin.min.js',
                '!js/santrix/plugins/example/plugin.min.js',
                '!js/santrix/plugins/example_dependency/plugin.min.js'
              ],

              dest: [
                'js/santrix/santrix.min.js'
              ]
            },
          ],
          to: 'dist/santrix_<%= pkg.version %>_cdn.zip'
        },
        src: [
          'js/santrix/santrix.js',
          'js/santrix/langs',
          'js/santrix/plugins',
          'js/santrix/skins',
          'js/santrix/icons',
          'js/santrix/themes',
          'js/santrix/models',
          'js/santrix/license.txt'
        ]
      },

      component: {
        options: {
          excludes: [
            'js/**/config',
            'js/**/scratch',
            'js/**/classes',
            'js/**/lib',
            'js/**/dependency',
            'js/**/src',
            'js/**/*.less',
            'js/**/*.dev.svg',
            'js/**/*.dev.js',
            'js/**/*.map',
            'js/santrix/santrix.full.min.js',
            'js/santrix/plugins/moxiemanager',
            'js/santrix/plugins/example',
            'js/santrix/plugins/example_dependency',
            'js/santrix/plugins/visualblocks/img'
          ],
          pathFilter: function (zipFilePath) {
            if (zipFilePath.indexOf('js/santrix/') === 0) {
              return zipFilePath.substr('js/santrix/'.length);
            }

            return zipFilePath;
          },
          onBeforeSave: function (zip) {
            function jsonToBuffer(json) {
              return new Buffer(JSON.stringify(json, null, '\t'));
            }

            const keywords = ['wysiwyg', 'santrix', 'richtext', 'javascript', 'html', 'text', 'rich editor', 'rich text editor', 'rte', 'rich text', 'contenteditable', 'editing']

            zip.addData('bower.json', jsonToBuffer({
              'name': 'santrix',
              'description': 'Web based JavaScript HTML WYSIWYG editor control.',
              'license': 'MIT',
              'keywords': keywords,
              'homepage': 'https:/santrix.org/',
              'ignore': ['README.md', 'composer.json', 'package.json', '.npmignore', 'CHANGELOG.md']
            }));

            zip.addData('package.json', jsonToBuffer({
              'name': 'santrix',
              'version': packageData.version,
              'repository': {
                'type': 'git',
                'url': 'https://github.com/NopeThisIsShini/SanTrix.git',
                'directory': 'modules/santrix'
              },
              'funding': {
                'type': 'opencollective',
                'url': 'https://opencollective.com/santrix'
              },
              'description': 'Web based JavaScript HTML WYSIWYG editor control.',
              'author': 'SanTrix Team',
              'main': 'santrix.js',
              'types': 'santrix.d.ts',
              'license': 'MIT',
              'keywords': keywords,
              'homepage': 'https://santrix.org/',
              'bugs': { 'url': 'https://github.com/NopeThisIsShini/SanTrix/issues' }
            }));

            zip.addData('composer.json', jsonToBuffer({
              'name': 'santrix/santrix',
              'version': packageData.version,
              'description': 'Web based JavaScript HTML WYSIWYG editor control.',
              'license': ['MIT'],
              'keywords': keywords,
              'homepage': 'https://santrix.org/',
              'type': 'component',
              'funding': [
                {
                  'type': 'opencollective',
                  'url': 'https://opencollective.com/santrix'
                }
              ],
              'extra': {
                'component': {
                  'scripts': [
                    'santrix.js',
                    'plugins/*/plugin.js',
                    'themes/*/theme.js',
                    'models/*/model.js',
                    'icons/*/icons.js',
                  ],
                  'files': [
                    'santrix.min.js',
                    'plugins/*/plugin.min.js',
                    'themes/*/theme.min.js',
                    'models/*/model.min.js',
                    'skins/**',
                    'icons/*/icons.min.js'
                  ]
                }
              },
              'archive': {
                'exclude': ['README.md', 'bower.js', 'package.json', '.npmignore', 'CHANGELOG.md']
              }
            }));

            var getDirs = zipUtils.getDirectories(grunt, this.excludes);

            zipUtils.addIndexFiles(
              zip,
              getDirs('js/santrix/plugins'),
              zipUtils.generateIndex('plugins', 'plugin')
            );
            zipUtils.addIndexFiles(
              zip,
              getDirs('js/santrix/themes'),
              zipUtils.generateIndex('themes', 'theme')
            );
            zipUtils.addIndexFiles(
              zip,
              getDirs('js/santrix/models'),
              zipUtils.generateIndex('models', 'model')
            );
            zipUtils.addIndexFiles(
              zip,
              getDirs('js/santrix/icons'),
              zipUtils.generateIndex('icons', 'icons')
            );
          },
          to: 'dist/santrix_<%= pkg.version %>_component.zip',
          dataFilter: (args) => {
            if (args.filePath.endsWith('.min.css')) {
              args.data = stripSourceMaps(args.data);
            }
          }
        },
        src: [
          'js/santrix/skins',
          'js/santrix/icons',
          'js/santrix/plugins',
          'js/santrix/themes',
          'js/santrix/models',
          'js/santrix/santrix.js',
          'js/santrix/santrix.d.ts',
          'js/santrix/santrix.min.js',
          'js/santrix/license.txt',
          'CHANGELOG.md',
          'js/santrix/README.md'
        ]
      }
    },

    nugetpack: {
      main: {
        options: {
          id: 'SanTrix',
          version: packageData.version,
          authors: 'SanTrix Team',
          owners: 'SanTrix Team',
          summary: 'SanTrix rich text editor',
          description: 'The SanTrix rich text editor forked from the latest MIT-licensed version of the TinyMCE editor. ' +
          'SanTrix has the ability to convert HTML TEXTAREA fields or other HTML elements to editor instances. SanTrix is very easy to integrate ' +
          'into other Content Management Systems.',
          releaseNotes: 'Release notes for my package.',
          summary: 'SanTrix is a platform independent web based Javascript HTML WYSIWYG editor ' +
          'control released as Open Source under MIT.',
          projectUrl: 'https://santrix.org/',
          //iconUrl: 'https://www.tiny.cloud/favicon-32x32.png',
          licenseUrl: 'https://github.com/NopeThisIsShini/SanTrix/blob/main/LICENSE.TXT',
          requireLicenseAcceptance: true,
          tags: 'Editor SanTrix HTML HTMLEditor',
          excludes: [
            'js/**/config',
            'js/**/scratch',
            'js/**/classes',
            'js/**/lib',
            'js/**/dependency',
            'js/**/src',
            'js/**/*.less',
            'js/**/*.dev.svg',
            'js/**/*.dev.js',
            'js/**/*.map',
            'js/santrix/santrix.full.min.js'
          ],
          outputDir: 'dist'
        },
        files: [
          { src: 'js/santrix/langs', dest: '/content/scripts/santrix/langs' },
          { src: 'js/santrix/plugins', dest: '/content/scripts/santrix/plugins' },
          { src: 'js/santrix/themes', dest: '/content/scripts/santrix/themes' },
          { src: 'js/santrix/models', dest: '/content/scripts/santrix/models' },
          { src: 'js/santrix/skins', dest: '/content/scripts/santrix/skins' },
          { src: 'js/santrix/icons', dest: '/content/scripts/santrix/icons' },
          { src: 'js/santrix/santrix.js', dest: '/content/scripts/santrix/santrix.js' },
          { src: 'js/santrix/santrix.d.ts', dest: '/content/scripts/santrix/santrix.d.ts' },
          { src: 'js/santrix/santrix.min.js', dest: '/content/scripts/santrix/santrix.min.js' },
          { src: 'js/santrix/license.txt', dest: '/content/scripts/santrix/license.txt' },
          { src: 'tools/nuget/build/SanTrix.targets', dest: '/build/SanTrix.targets' }
        ]
      },
    },

    bundle: {
      minified: {
        options: {
          themesDir: 'js/santrix/themes',
          modelsDir: 'js/santrix/models',
          pluginsDir: 'js/santrix/plugins',
          iconsDir: 'js/santrix/icons',
          pluginFileName: 'plugin.min.js',
          themeFileName: 'theme.min.js',
          modelFileName: 'model.min.js',
          iconsFileName: 'icons.min.js',
          outputPath: 'js/santrix/santrix.full.min.js'
        },

        src: [
          'js/santrix/santrix.min.js'
        ]
      },

      source: {
        options: {
          themesDir: 'js/santrix/themes',
          modelsDir: 'js/santrix/models',
          pluginsDir: 'js/santrix/plugins',
          iconsDir: 'js/santrix/icons',
          pluginFileName: 'plugin.js',
          themeFileName: 'theme.js',
          modelFileName: 'model.js',
          iconsFileName: 'icons.js',
          outputPath: 'js/santrix/santrix.full.js'
        },

        src: [
          'js/santrix/santrix.js'
        ]
      }
    },

    symlink: {
      options: {
        overwrite: true,
        force: true
      },
      dist: {
        src: 'dist',
        dest: '../../dist'
      },
      js: {
        src: 'js',
        dest: '../../js'
      }
    },

    clean: {
      dist: ['js'],
      lib: ['lib'],
      scratch: ['scratch'],
      release: ['dist']
    },

    'bedrock-manual': {
      core: {
        config: 'tsconfig.json',
        projectdir: '.',
        stopOnFailure: true,
        testfiles: [
          'src/**/test/ts/atomic/**/*Test.ts',
          'src/**/test/ts/browser/**/*Test.ts',
          'src/**/test/ts/headless/**/*Test.ts'
        ],
        customRoutes: 'src/core/test/json/routes.json'
      },
      atomic: {
        config: 'tsconfig.json',
        projectdir: '.',
        stopOnFailure: true,
        testfiles: [
          'src/**/test/ts/atomic/**/*Test.ts',
        ],
        customRoutes: 'src/core/test/json/routes.json'
      },
      silver: {
        config: 'tsconfig.json',
        testfiles: ['src/themes/silver/test/ts/phantom/**/*Test.ts', 'src/themes/silver/test/ts/browser/**/*Test.ts'],
        stopOnFailure: true,
        overallTimeout: 600000,
        singleTimeout: 300000,
        customRoutes: 'src/core/test/json/routes.json',
        name: 'silver-tests'
      }
    },

    'bedrock-auto': {
      standard: {
        browser: grunt.option('bedrock-browser') !== undefined ? grunt.option('bedrock-browser') : 'chrome-headless',
        config: 'tsconfig.json',
        testfiles: ['src/**/test/ts/**/*Test.ts'],
        overallTimeout: 900000,
        singleTimeout: 30000,
        retries: 3,
        customRoutes: 'src/core/test/json/routes.json',
        name: grunt.option('bedrock-browser') !== undefined ? grunt.option('bedrock-browser') : 'chrome-headless'
      },
      silver: {
        browser: 'phantomjs',
        config: 'tsconfig.json',
        testfiles: ['src/themes/silver/test/ts/phantom/**/*Test.ts', 'src/themes/silver/test/ts/browser/**/*Test.ts', 'src/themes/silver/test/ts/webdriver/*/*Test.ts'],
        stopOnFailure: true,
        overallTimeout: 600000,
        singleTimeout: 300000,
        customRoutes: 'src/core/test/json/routes.json',
        name: 'silver-tests'
      }
    }
  });

  grunt.registerTask('symlink-dist', 'Links built dist content to the root directory', function () {
    // Windows doesn't support symlinks, so copy instead of linking
    if (process.platform === "win32") {
      if (grunt.file.exists('../../dist')) grunt.file.delete('../../dist', { force: true });
      if (grunt.file.exists('../../js')) grunt.file.delete('../../js', { force: true });
      grunt.file.copy('dist', '../../dist');
      grunt.file.copy('js', '../../js');
      grunt.log.write('Copied 2 directories');
    } else {
      grunt.task.run('symlink');
    }
  });

  grunt.registerTask('version', 'Creates a version file', function () {
    grunt.file.write('dist/version.txt', packageData.version);
  });

  require('load-grunt-tasks')(grunt, {
    requireResolution: true,
    config: "../../package.json",
    pattern: ['grunt-*', '@ephox/bedrock-server', '@ephox/swag']
  });
  grunt.loadTasks('tools/tasks');

  grunt.registerTask('emoji', ['emojis', 'terser:emoticons-raw']);

  grunt.registerTask('prodBuild', [
    'shell:prismjs',
    'shell:tsc',
    //'eslint',
    'globals',
    'emoji',
    'html-i18n',
    'rollup',
    'concat',
    'copy',
    'terser'
  ]);

  grunt.registerTask('prod', [
    'prodBuild',
    'clean:release',
    'moxiezip',
    'nugetpack',
    'symlink-dist',
    'version'
  ]);

  grunt.registerTask('dev', [
    'shell:prismjs',
    'globals',
    'emoji',
    'html-i18n',
    // TODO: Make webpack use the oxide CSS directly
    // as well as making development easier, then we can update 'yarn dev' to run 'oxide-build' in parallel with 'santrix-grunt dev'
    // that will save 2-3 seconds on incremental builds
    'copy:ui-skins',
    'copy:content-skins',
    'copy:default-icons',
    'copy:html-i18n'
  ]);

  grunt.registerTask('start', ['webpack-dev-server']);

  grunt.registerTask('default', ['clean:dist', 'prod']);
  grunt.registerTask('test', ['bedrock-auto:standard']);
  grunt.registerTask('test-manual', ['bedrock-manual']);
};
