(() => {

    angular
        .module('app')
        .component('domino', {
            controller: 'DominoController',
            controllerAs: 'vm',
            templateUrl: 'app/domino/domino.html'
        });

})();