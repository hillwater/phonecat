module.exports = function(config){
    config.set({
        basePath : '../',

        files : [
            // all the sources, tests
            {pattern: 'public/lib/angular/angular.js', included: false},
            {pattern: 'public/lib/angular-*/angular-*.js', included: false},
            {pattern: 'public/lib/jquery/jquery.js', included: false},
            {pattern: 'public/js/**/*.js', included: false},
            {pattern: 'test/unit/**/*.js', included: false},

            'test/test-main.js'
        ],

        exclude : [
            'public/lib/angular-loader/angular-loader.js',
            'public/lib/angular-scenario/angular-scenario.js',
            'public/lib/angular-*/*.min.js',
            'public/js/main.js'
        ],

        autoWatch : true,

        frameworks: ['jasmine','requirejs'],

        browsers : ['PhantomJS'],

        plugins : [
            'karma-junit-reporter',
            'karma-chrome-launcher',
            'karma-firefox-launcher',
            'karma-phantomjs-launcher',
            'karma-script-launcher',
            'karma-jasmine',
            'karma-requirejs'
        ],

        junitReporter : {
            outputFile: 'test_out/unit.xml',
            suite: 'unit'
        }
    });
};