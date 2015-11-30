module.exports = function(grunt) {

    // Project configuration.
    grunt.initConfig({
        "phonegap-build": {
            debug: {
                options: {
                    archive: "app.zip",
                    "appId": "1375227",
                    "user": {
                        "email": "you@domain.com",
                        "password": "yourpassword"
                    },
                    keys: {
                        ios: {
                            "password": "test"
                        },
                        android: {
                            "key_pw": "test",
                            "keystore_pw": "test"
                        }
                    },
                    download: {
                        ios: 'debug/ios.ipa',
                        android: 'debug/android.apk'
                    }
                }
            },
            release: {
                options: {
                    archive: "app.zip",
                    "appId": "1375227",
                    "user": {
                        "email": "you@domain.com",
                        "password": "password"
                    },
                    keys: {
                        ios: {
                            "password": "test"
                        },
                        android: {
                            "key_pw": "test",
                            "keystore_pw": "test"
                        }
                    },
                    download: {
                        ios: 'dist/ios.ipa',
                        android: 'dist/android.apk'
                    }
                }
            }
        },
        compress: {
            main: {
                options: {
                    archive: 'app.zip'
                },
                files: [{
                    expand: true,
                    src: ['**/*'],
                    cwd: 'www/'
                }]
            }
        }

    });

    // Load tasks.
    grunt.loadNpmTasks('grunt-contrib-compress');
    grunt.loadNpmTasks('grunt-phonegap-build');

    // Default task.
    grunt.registerTask('default', 'compress');
};