(() => {

    angular
        .module('app')
        .directive("rotate", rotate);
        
    function rotate() {
        return {
            restrict: "A",
            scope:{
                degree: "=rotate"
            },
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