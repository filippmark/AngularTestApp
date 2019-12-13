(() => {

    angular
        .module('app')
        .controller('DominoController', DominoController);

    function DominoController() {
        const vm = this;
        vm.$onInit = onInit;
        vm.header = 'Domino';

        
        function onInit() {
            vm.degree = 0;
            vm.size = 50;
            vm.speed = 50;
        }

    }

})();