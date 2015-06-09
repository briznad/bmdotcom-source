/**
 * Grunt configuration for aWindowNYC
 **/
module.exports = function(grunt) {
    'use strict';

    // load all plugins
    require('matchdep').filterDev('grunt-*').forEach(function(obj) {
        console.log(obj);
        grunt.loadNpmTasks(obj);
    });

    // project configuration
    grunt.initConfig({
        config: {
            sassInput: 'assets/sass/',
            coffeeInput: 'assets/coffee/',
            jsRawIO: 'assets/js/',
            cssOutput: '_site/assets/css/',
            jsOutput: '_site/assets/js/',
            htmlInput: 'assets/html/',
            htmlOutput: '_site/',
            bower: 'bower_components/'
        },

        clean: {
            html: {
                src: ['<%= config.htmlOutput %>*.html'],
                options: {
                    force: true
                }
            },
            css: {
                src: ['<%= config.cssOutput %>*.css'],
                options: {
                    force: true
                }
            },
            js: {
                src: ['<%= config.jsRawIO %>**/*.js*', '<%= config.jsOutput %>*.js*'],
                options: {
                    force: true
                }
            }
        },

        // html tasks
        htmlbuild: {
            prod: {
                src: '<%= config.htmlInput %>index.html',
                dest: '<%= config.htmlOutput %>',
                options: {
                    parseTag: 'include',
                    logOptions: true,
                    allowUnknownTags: true,
                    sections: {
                        partials: {
                            meta: '<%= config.htmlInput %>/partials/meta.html',
                            header: '<%= config.htmlInput %>/partials/header.html',
                            footer: '<%= config.htmlInput %>/partials/footer.html'
                        },
                        modules: {
                            root: '<%= config.htmlInput %>/modules/root.html',
                            resume: '<%= config.htmlInput %>/modules/resume.html',
                            projects: '<%= config.htmlInput %>/modules/projects.html',
                            contact: '<%= config.htmlInput %>/modules/contact.html',
                            modal: '<%= config.htmlInput %>/modules/modal.html'
                        }
                    },
                    scripts: {
                        ga: '<%= config.jsRawIO %>individual/min/ga.js',
                        logTime: '<%= config.jsRawIO %>individual/min/logTime.js',
                        viewport: '<%= config.jsRawIO %>individual/min/viewport.js',
                        loadingClass: '<%= config.jsRawIO %>individual/min/loadingClass.js'
                    }
                }
            }
        },

        htmlmin: {
            prod: {
                options: {
                    removeComments: false,
                    collapseWhitespace: true
                },
                files: {
                    '<%= config.htmlOutput %>index.html': '<%= config.htmlOutput %>index.html',
                    '<%= config.htmlOutput %>404.html': '<%= config.htmlInput %>404.html'
                }
            },
        },

        // sass/css tasks
        sass: {
            prod: {
                options: {
                    sourceMap: false,
                    includePaths: [
                        '<%= config.bower %>',
                        '<%= config.sassInput %>*/'
                    ],
                    outputStyle: 'nested'
                },
                files: {
                    '<%= config.cssOutput %>style.css': '<%= config.sassInput %>style.scss'
                }
            }
        },

        autoprefixer: {
            options: {
                browsers: ['last 5 version', 'ie >= 8']
            },
            prod: {
                src: '<%= config.cssOutput %>style.css'
            }
        },

        cssmin: {
            prod: {
                files: {
                    '<%= config.cssOutput %>style.min.css': '<%= config.cssOutput %>style.css'
                }
            }
        },

        // coffee/js tasks
        coffeelint: {
            dist: {
                files: {
                    src: ['<%= config.coffeeInput %>**/*.coffee']
                },
                options: {
                    max_line_length: {
                        level: "ignore"
                    }
                }
            }
        },

        coffee: {
            options: {
                bare: true
            },
            component: {
                expand: true,
                flatten: true,
                cwd: '<%= config.coffeeInput %>component/',
                src: [
                    '*.coffee',
                    '!_*.coffee'
                ],
                dest: '<%= config.jsRawIO %>component/',
                ext: '.js'
            },
            individual: {
                expand: true,
                flatten: true,
                cwd: '<%= config.coffeeInput %>individual/',
                src: [
                    '*.coffee',
                    '!_*.coffee'
                ],
                dest: '<%= config.jsRawIO %>individual/',
                ext: '.js'
            }
        },

        jshint: {
            options: {
                evil: true,
                boss: true,
                browser: true,
                curly: true,
                eqeqeq: true,
                eqnull: true,
                immed: false,
                latedef: true,
                newcap: true,
                noarg: true,
                node: true,
                sub: true,
                trailing: true,
                laxcomma: true,
                laxbreak: true,
                undef: true,
                debug: true,
                globals: {
                    _: true,
                    $: true,
                    jQuery: true,
                    _gaq: true,
                    Modernizr: true,
                    Davis: true
                }
            },
            gruntfile: {
                src: 'gruntfile.js'
            },
            src: {
                src: ['<%= config.jsRawIO %>**/*.js']
            }
        },

        concat: {
            options: {
                stripBanners: true,
                separator: ';'
            },
            js: {
                src: [
                    // list js dependencies (managed via bower)
                    '<%= config.bower %>jquery/dist/jquery.js', // jQuery must be the first plugin loaded, as it's depended by jQuery plugins as well as Davis.js
                    '<%= config.bower %>davis/davis.js',
                    '<%= config.bower %>underscore/underscore.js',
                    // custom app js
                    '<%= config.jsRawIO %>component/*.js'
                ],
                dest: '<%= config.jsOutput %>do.js'
            }
        },

        uglify: {
            component: {
                options: {
                    sourceMap: true,
                    beautify: false,
                    report: false,
                    mangle: true,
                    compress: {
                        warnings: true
                    }
                },
                files: {
                    '<%= config.jsOutput %>do.min.js': '<%= config.jsOutput %>do.js'
                }
            },
            individual: {
                options: {
                    sourceMap: false,
                    beautify: false,
                    report: false,
                    mangle: false,
                    compress: {
                        warnings: true
                    }
                },
                files: [{
                    expand: true,
                    cwd: '<%= config.jsRawIO %>individual/',
                    src: '*.js',
                    dest: '<%= config.jsRawIO %>individual/min/'
                }]
            }
        },

        watch: {
            // whenever html is changed, minify it
            html: {
                files: '<%= config.htmlInput %>**/*.html',
                tasks: ['html']
            },
            // whenever a scss file is changed, compile it
            sass: {
                files: '<%= config.sassInput %>**/*.scss',
                tasks: ['css']
            },
            // whenever a coffee file is changed, compile it
            coffee: {
                files: '<%= config.coffeeInput %>**/*.coffee',
                tasks: ['js', 'html']
            }
        },

        notify_hooks: {
            options: {
                enabled: true,
                max_jshint_notifications: 3, // maximum number of notifications from jshint output
                success: false, // whether successful grunt executions should be notified automatically
                duration: 3 // the duration of notification in seconds, for `notify-send only
            }
        },

        notify: {
            done: {
                options: {
                    title: 'Grunt Complete',  // optional
                    message: 'all tasks finished successfully', //required
                }
            }
        }
    });

    // default task
    grunt.registerTask('default', ['clean', 'coffeelint', 'coffee', 'jshint', 'concat', 'uglify', 'sass', 'autoprefixer', 'cssmin', 'htmlbuild', 'htmlmin', 'notify']);

    // component tasks
    grunt.registerTask('html', ['clean:html', 'htmlbuild', 'htmlmin', 'notify']);
    grunt.registerTask('css', ['clean:css', 'sass', 'autoprefixer', 'cssmin', 'notify']);
    grunt.registerTask('js', ['clean:js', 'coffeelint', 'coffee', 'jshint', 'concat', 'uglify', 'notify']);
};
