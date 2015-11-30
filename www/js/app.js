// Ionic Starter App

// angular.module is a global place for creating, registering and retrieving Angular modules
// 'starter' is the name of this angular module example (also set in a <body> attribute in index.html)
// the 2nd parameter is an array of 'requires'
angular.module('app', ['ionic', 'controllers', 'services', 'templates'])

    .config(function($stateProvider){
        $stateProvider
            .state('splash', {
                url: '/',
                templateUrl: 'splash.html',
                controller: 'SplashCtrl'
            })
            .state('menu',{
                url: '/menu',
                templateUrl: 'menu.html',
                controller: 'MenuCtrl'
            })
            .state('loading', {
                url: '/loading',
                templateUrl: 'loading.html',
                controller: 'LoadingCtrl'
            })
            .state('game', {
                url: '/game',
                templateUrl: 'game.html',
                controller: 'GameCtrl'
            })
            .state('endgame', {
                url: '/endgame',
                templateUrl: 'endgame.html',
                controller: 'EndgameCtrl'
            })
            .state('highscores', {
                url: '/highscores',
                templateUrl: 'highscores.html',
                controller: 'HighscoreCtrl'
            })
            .state('credits',{
                url: '/credits',
                templateUrl: 'credits.html',
                controller: 'CreditsCtrl'
            })
    })
    .run(function($ionicPlatform) {
        $ionicPlatform.ready(function() {
        // Hide the accessory bar by default (remove this to show the accessory bar above the keyboard
        // for form inputs)
            if(window.cordova && window.cordova.plugins.Keyboard) {
                cordova.plugins.Keyboard.hideKeyboardAccessoryBar(true);
            }
            if(window.StatusBar) {
                StatusBar.styleDefault();
            }
        });
    })
