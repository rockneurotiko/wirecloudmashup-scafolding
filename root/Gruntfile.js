/*!
 *   Copyright 2014-2015 CoNWeT Lab., Universidad Politecnica de Madrid
 *
 *   Licensed under the Apache License, Version 2.0 (the "License");
 *   you may not use this file except in compliance with the License.
 *   You may obtain a copy of the License at
 *
 *     http://www.apache.org/licenses/LICENSE-2.0
 *
 *   Unless required by applicable law or agreed to in writing, software
 *   distributed under the License is distributed on an "AS IS" BASIS,
 *   WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 *   See the License for the specific language governing permissions and
 *   limitations under the License.
 */

module.exports = function (grunt) {

    'use strict';

    grunt.initConfig({

        pkg: grunt.file.readJSON('package.json'),

        {% if (bower) { %}
         bower: {
             install: {
                 options: {
                     layout: function (type, component, source) {
                         return type;
                     },
                     targetDir: './build/lib/lib'
                 }
             }
         },
         {% }%}

        {% if (js) { %}
         jshint: {
             options: {
                 jshintrc: true
             },
             all: {
                 files: {
                     src: ['src/js/**/*.js']
                 }
             },
             grunt: {
                 options: {
                     jshintrc: '.jshintrc-node'
                 },
                 files: {
                     src: ['Gruntfile.js']
                 }
             },
             test: {
                 options: {
                     jshintrc: '.jshintrc-jasmine'
                 },
                 files: {
                     src: ['src/test/**/*.js', '!src/test/fixtures/']
                 }
             }
         },

         jscs: {
             widget: {
                 src: 'src/js/**/*.js',
                 options: {
                     config: ".jscsrc"
                 }
             },
             grunt: {
                 src: 'Gruntfile.js',
                 options: {
                     config: ".jscsrc"
                 }
             }
         },

         {% } else { %}

         typescript: {
             base: {
                 src: ['src/ts/*.ts'],
                 dest: 'src/js',
                 options: {
                     module: 'commonjs', //amd or commonjs
                     target: 'es5', //or es3
                     // basePath: '',
                     sourceMap: true,
                     declaration: true
                 }
             }
         },

         tslint: {
             options: {
                 configuration: grunt.file.readJSON("tslint.json")
             },
             files: {
                 src: ['src/ts/*.ts']
             }
         },
         {% }%}

        copy: {
            main: {
                files: [
                    {expand: true, cwd: 'src/js', src: '*', dest: 'build/src/js'}
                ]
            }
        },

        strip_code: {
            multiple_files: {
                src: ['build/src/js/**/*.js']
            },
            imports: {
                options: {
                    start_comment: 'import-block',
                    end_comment: 'end-import-block'
                },
                src: ['src/js/*.js']
            }
        },

        compress: {
            widget: {
                options: {
                    mode: 'zip',
                    archive: 'build/<%= pkg.vendor %>_<%= pkg.name %>_<%= pkg.version %>-dev.wgt'
                },
                files: [
                    {
                        expand: true,
                        cwd: 'src',
                        src: [
                            'css/**/*',
                            'doc/**/*',
                            'images/**/*',
                            'index.html',
                            'config.xml'
                        ]
                    },
                    {
                        expand: true,
                        cwd: 'build/lib',
                        src: [
                            'lib/**/*'
                        ]
                    },
                    {
                        expand: true,
                        cwd: 'build/src',
                        src: [
                            'js/**/*'
                        ]
                    },
                    {
                        expand: true,
                        cwd: '.',
                        src: [
                            'LICENSE'
                        ]
                    }
                ]
            }
        },

        clean: {
            build: {
                src: ['build'{% if (bower) { %},'bower_components'{% }%}]
            },
            temp: {
                src: ['build/src']
            }
        },

        jsbeautifier: {
            files: ["Gruntfile.js"],
            options: {
                js: {
                    spaceAfterAnonFunction: true,
                    endWithNewline: false,
                    jslintHappy: true
                }
            }
        },

        replace: {
            version: {
                overwrite: true,
                src: ['src/config.xml'],
                replacements: [{
                    from: /version=\"[0-9]+\.[0-9]+\.[0-9]+(([ab]|rc)?[0-9]+)?(-dev)?\"/g,
                    to: 'version="<%= pkg.version %>"'
                }]
            }
        },

        jasmine: {
            test:{
                src: ['src/js/*.js', '!src/js/main.js'],
                options: {
                    specs: 'src/test/js/*Spec.js',
                    helpers: ['src/test/helpers/*.js'],
                    vendor: [{% if (jquery) { %}'node_modules/jasmine-jquery/vendor/jquery/jquery.js',
                              'node_modules/jasmine-jquery/lib/jasmine-jquery.js',
                              {% }%}
                             'node_modules/mock-applicationmashup/lib/vendor/mockMashupPlatform.js',
                             'src/test/vendor/*.js']
                }
            },
            coverage: {
                src: '<%= jasmine.test.src %>',
                options: {
                    helpers: '<%= jasmine.test.options.helpers %>',
                    specs: '<%= jasmine.test.options.specs %>',
                    vendor: '<%= jasmine.test.options.vendor %>',
                    template: require('grunt-template-jasmine-istanbul'),
                    templateOptions : {
                        coverage: 'build/coverage/json/coverage.json',
                        report: [
                            {type: 'html', options: {dir: 'build/coverage/html'}},
                            {type: 'cobertura', options: {dir: 'build/coverage/xml'}},
                            {type: 'text-summary'}
                        ]
                    }
                }
            }
        }{% if (wirecloud) { %},
          wirecloud: {
              publish: {
                  file: 'build/<%= pkg.vendor %>_<%= pkg.name %>_<%= pkg.version %>-dev.wgt'
              }
          }
          {% }%}
    });

    {% if (wirecloud) { %}grunt.loadNpmTasks('grunt-wirecloud');{% }%}
    {% if (bower) { %}grunt.loadNpmTasks('grunt-bower-task');{% }%}
    {% if (js){ %}grunt.loadNpmTasks('grunt-contrib-jshint');
     grunt.loadNpmTasks('grunt-contrib-jasmine'); // when test?
     grunt.loadNpmTasks('grunt-jscs');{% } else { %}grunt.loadNpmTasks('grunt-tslint');
     grunt.loadNpmTasks('grunt-typescript');{% }%}
    grunt.loadNpmTasks('grunt-contrib-compress');
    grunt.loadNpmTasks('grunt-contrib-copy');
    grunt.loadNpmTasks('grunt-contrib-clean');
    grunt.loadNpmTasks('grunt-strip-code');
    grunt.loadNpmTasks('grunt-text-replace');
    grunt.loadNpmTasks('grunt-jsbeautifier');

    grunt.registerTask('test', [
        {% if (bower) { %}'bower:install',{% }%}
        {% if (js) { %}'jshint',
         'jshint:grunt',
         'jscs',
         'jasmine:coverage'
         {% } else { %}'tslint',{% }%}
    ]);

    grunt.registerTask('build', [
        'clean:temp',
        'copy:main',
        'strip_code',
        'replace:version',
        'compress:widget'
    ]);

    grunt.registerTask('default', [
        'jsbeautifier',
        {% if (!js) { %}'typescript:base',
         'strip_code:imports',{% }%}
        'test',
        'build'
    ]);

    grunt.registerTask('publish', [
        'default'
        {% if (wirecloud) { %},
         'wirecloud'{% }%}
    ]);
};
