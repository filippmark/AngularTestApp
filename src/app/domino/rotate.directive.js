(() => {

    angular
        .module('app')
        .directive("rotate", rotate);
        
    function rotate() {
        return {
            restrict: "A",
            link: function(scope, element, attr) {
                scope.$watch('degree', function(newVal, oldVal) {
                    if (newVal !== oldVal)
                    { 
                        element[0].style.transform = `rotate(${newVal}deg)`;
                    }
                });
            }
        }
    }
        
})();