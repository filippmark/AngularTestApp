(() => {

    angular
        .module('app')
        .controller('SchoolGpaController', SchoolGpaController);

    function SchoolGpaController() {
        const vm = this;
        vm.$onInit = onInit;
        vm.header = 'SchoolGpa';
        
        function onInit() {
            console.log('kek');
        }
    }

})();