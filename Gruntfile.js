/*global module:false*/
module.exports = function(grunt) {

    // Project configuration.
    grunt.initConfig({

        pkg: grunt.file.readJSON('package.json'),

//        clean: {
//            build: ['assets'],
//            cov: ['src-cov'],
//            test: ['testem.json',
//                   'test/coverage.dat',
//                   'test/fixtures/*.html',
//                   'test/jsTestDriver.conf-coverage.dat',
//                   'test/main-cov.js',
//                   'test/test-cov.html',
//                   'test/tests.tap']
//        },
//
//        copy: {
//            //first copy resource files from libraries into static assets
//            build: {
//                files: [
//                    {
//                        //copy bootstrap images
//                        expand: true,
//                        flatten: true,
//                        src: ['components/bootstrap/img/*.png'],
//                        dest: 'assets/img/'
//                    },
//                    {
//                        //copy mediaelement.js control UI images
//                        expand: true,
//                        flatten: true,
//                        src: ['components/mediaelement/build/*.png',
//                              'components/mediaelement/build/*.svg',
//                              'components/mediaelement/build/*.gif'],
//                        dest: 'assets/css/'
//                    },
//                    {
//                        //copy mediaelement.js plugins
//                        expand: true,
//                        flatten: true,
//                        src: ['components/mediaelement/build/*.swf',
//                              'components/mediaelement/build/*.xap'],
//                        dest: 'assets/plugin/'
//                    },
//                    {
//                        src: ['components/html5shiv/dist/html5shiv.js'],
//                        dest: 'assets/js/html5.js'
//                    }
//                ]
//            },
//            //copy all static assets to maven resources folder
//            install: {
//                files: [
//                    {
//                        src: ['assets/**'],
//                        dest: '../resources/'
//                    },
//                    {
//                        src: ['mustache/**'],
//                        dest: '../resources/'
//                    }
//                ]
//            },
//
//            test: {
//                files: {
//                    '../../../target/testem/tests.tap': 'test/tests.tap'
//                }
//            }
//        },

        jshint: {
            options: {
                es5: true, // Allows EcmaScript5 syntax
                curly: true, // Always use curlys {}
                eqeqeq: true, // No more == for you, === only
                immed: true, // prohibits the use of immediate function invocations without wrapping them in parentheses
                latedef: true, // no setting variables before they are defined
                newcap: true, // Always call constructors with a Cap
                noarg: true, // prohibits arguments.caller and arguments.callee
                sub: true, // This option suppresses warnings about using [] notation when it can be expressed in dot notation: person['name'] vs. person.name.
                undef: true, // prohibits the use of explicitly undeclared variables
                boss: false, // Prohibits assignments in ifs - if (a = 10) {}
                eqnull: false, // Prohibits == null check for null or undefined
                browser: true, // Sets up globals for browser like window and document
                maxdepth: 3, // Max nesting of methods 3 layers deep
                unused: true, // Warns on unused variables
                expr: true, // Allowed for chais expect(false).to.be.false; assertion style.
                devel: false, // Prohibits console.log's etc
                trailing: true, // Prohibits trailing whitespace
                globalstrict: true, // make use strict ok

                globals: {
                    require: true,
                    module: true,
                    define: true,
                    requirejs: true,
                    jasmine: true,
                    describe: true,
                    it: true,
                    xdescribe: true,
                    xit: true,
                    expect: true,
                    beforeEach: true,
                    afterEach: true,
                    setFixtures: true,
                    loadFixtures: true,
                    spyOn: true,
                    Config: true,
                    process:true,
                    exports:true,
                    inject:true,
                    browser:true,
                    repeater:true,
                    angular:true,
                    input:true,
                    select:true,
                    element:true,
                    binding:true
                }
            },

            //use default configure for production
            product: ['routes/*.js', 'public/js/*.js', 'test/unit/*.js', 'test/e2e/*.js'],

            //override some options in development environment
            devel: {
                options: {
                    devel: true
                },
                files: {
                    src: ['routes/*.js', 'public/js/*.js', 'test/unit/*.js', 'test/e2e/*.js']
                }
            }
        },

        requirejs: {
            options: {
                name: '../components/almond/almond',
                baseUrl: 'src',
                mainConfigFile: './require.config.js',
                include: ['app'],
                insertRequire: ['app'],
                wrap: false,
                preserveLicenseComments: false,
                out: 'assets/js/application.js'
            },
            devel: {
                options: {
                    optimize: 'none' //do not compress in development environment
                }
            },
            product: {
                options: {
                    optimize: 'uglify2'
                }
            }
        },

        cssmin: {
            compress: {
                files: {
                    'assets/css/style.css': [
                        'components/bootstrap/docs/assets/css/bootstrap.css',
                        'components/bootstrap/docs/assets/css/bootstrap-responsive.css',
                        'components/mediaelement/build/mediaelementplayer.css',
                        'src/styles/pif.css']
                }
            }
        },

        testem: {
            options: {
                framework: 'jasmine',
                timeout: '60',
                tap: 'test/tests.tap'
            },

            main: {
                options: {
                    launch_in_ci: [
                        'Chrome',
                        'IE8',
                        'IE9',
                        'Firefox'
                    ]
                },
                files: {
                    src: 'test/test.html'
                }
            },

            cov: {
                options: {
                    timeout: 300,
                    launchers: {
                        'PhantomJS-Jasmine': {
                            command: 'phantomjs test/lib/phantomjs-testrunner.js http://localhost:7357',
                            cwd: '.'
                        }
                    },
                    launch_in_ci: [
                        'PhantomJS-Jasmine'
                    ]
                },
                files: {
                    src: 'test/test-cov.html'
                }
            }
        },

        karma:{
            unit: {
                configFile: 'config/karma.conf.js'
            },
            e2e:{
                configFile: 'config/karma-e2e.conf.js'
            }
        },

        //for instrument js source
        blanket: {
            options: {},
            main: {
                files: {
                    'src-cov/': ['src/'],
                }
            }
        }

    });

    //grunt.loadNpmTasks('grunt-contrib-clean');
    //grunt.loadNpmTasks('grunt-contrib-copy');
    grunt.loadNpmTasks('grunt-contrib-jshint');
    grunt.loadNpmTasks('grunt-contrib-requirejs');
    grunt.loadNpmTasks('grunt-contrib-cssmin');
    grunt.loadNpmTasks('grunt-testem');
    grunt.loadNpmTasks('grunt-karma');
    grunt.loadNpmTasks('grunt-blanket');

    grunt.registerTask('prepare-test', 'Prepare test files', function() {
        var done = this.async(),
        prepare = require('./test/prepare');

        prepare.generateCovTestFile();

        prepare.generateFixtures(done);
    });

    grunt.registerTask('fix-cov', 'Process file after test', function() {
        var done = this.async();

        require('./test/prepare').fixCovData(done);
    });

    grunt.registerTask('bower', 'install external libraries by using bower', function() {
        var done = this.async();

        require('bower-checker').install(done);
    });

    grunt.registerTask('versioning', 'add version string to compressed js source', function() {
        var done = this.async();

        grunt.util.spawn({
            cmd: 'git',
            args: ['describe', '--tags', '--always', '--long', '--abbrev=40']
        }, function(err, result) {
            var content, version;

            if (err) {
                grunt.log.error(err);
                return done(false);
            }

            version = '/*\n' +
                'Created by CLM Authoring Tool\n' +
                'version: git-' + result + '\n*/';

            content = grunt.file.read('assets/js/application.js', {encoding: 'utf8'});
            content = version + content;

            grunt.file.write('assets/js/application.js', content, {encoding: 'utf8'});

            done();
        });
    });

    grunt.registerTask('test:product',       ['jshint:product', 'prepare-test', 'testem:main', 'copy:test']);
    grunt.registerTask('test:devel',         ['jshint:devel', 'prepare-test', 'testem:main', 'copy:test']);
    grunt.registerTask('test:cov',           ['prepare-test', 'blanket', 'testem:cov', 'fix-cov', 'copy:test']);
    grunt.registerTask('build:devel',        ['bower', 'requirejs:devel', 'cssmin', 'copy:build', 'versioning']);
    grunt.registerTask('install:devel',      ['build:devel', 'copy:install']);
    grunt.registerTask('build:product',      ['bower', 'requirejs:product', 'cssmin', 'copy:build', 'versioning']);
    grunt.registerTask('install:product',    ['build:product', 'copy:install']);
};
