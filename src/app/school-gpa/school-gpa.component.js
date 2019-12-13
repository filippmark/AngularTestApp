(() => {

    angular
        .module('app')
        .component('schoolGpa', {
            controller: 'SchoolGpaController',
            controllerAs: 'vm',
            templateUrl: 'app/school-gpa/school-gpa.html'
        });
})();