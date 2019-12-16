// home.controller.js
(() => {

    angular
        .module('app')
        .controller('HomeController', HomeController);

    function HomeController() {
        const vm = this;
        vm.header = 'Home sweet home!';

    }

})();