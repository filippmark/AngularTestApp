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
            vm.size = 75;
            vm.speed = 50;
            vm.topPartOfDomino = 3;
            vm.bottomPartOfDomino = 6;
            vm.updateFaces = updateFaces;
        }

        function updateFaces(){
            vm.topPartOfDomino = generateRandomInt();
            vm.bottomPartOfDomino = generateRandomInt();
        }

        function generateRandomInt(){
            return Math.floor(Math.random() * 6) + 1;
        }

    }

})();