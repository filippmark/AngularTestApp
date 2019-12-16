// app.routes.js
(() => {

    angular.module('app')

        .config(($stateProvider, $urlRouterProvider) => {
            const states = [{
                name: 'home',
                url: '',
                template: '<home></home>',
                data: {
                    pageTitle: 'Home'
                }
            }, {
                name: 'domino',
                url: '/domino',
                template: '<domino> </domino>',
                data: {
                    pageTitle: 'Domino'
                }
            },{
                name: 'school-gpa',
                url: '/school-gpa',
                template: '<school-gpa> </school-gpa>',
                data: {
                    pageTitle: 'School Gpa'
                }
            }];
            states.forEach(state => {
                $stateProvider.state(state);
            });
            $urlRouterProvider.when('/', ['$state', '$match', ($state, $match) => {
                $state.go('home');
            }]);
        })

        .run(
            ['$rootScope', '$state', '$stateParams',
                ($rootScope, $state, $stateParams) => {
                    $rootScope.$state = $state;
                    $rootScope.$stateParams = $stateParams;
                }
            ]
        );

})();