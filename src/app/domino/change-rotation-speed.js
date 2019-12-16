(() => {

    angular
        .module('app')
        .directive("changeRotationSpeed", rotate);
        
    function rotate($templateCache) {
        let originalSpeed = 1000;
        return {
            restrict: "A",
            link: function(scope, element, attr) {
                scope.$watch(attr.changeRotationSpeed, function(newVal, oldVal) {
                    if (newVal !== oldVal)
                    { 
                        element[0].style.transition = `transform ease ${originalSpeed*(100 - newVal)/100}ms`
                    }
                });
            }
        }
    }
        
})();