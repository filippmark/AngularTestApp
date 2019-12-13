(() => {

    angular
        .module('app')
        .directive("changeSize", rotate);
        
    function rotate() {
        let originalWidth = 140;
        let originalHeigth = 200;
        return {
            restrict: "A",
            link: function(scope, element, attr) {
                scope.$watch(attr.changeSize, function(newVal, oldVal) {
                    if (newVal !== oldVal)
                    { 
                        console.log('size');
                        console.log(`${newVal}:${oldVal}`);
                        element[0].style.width = `${originalWidth* newVal/100}px`;
                        element[0].style.height = `${originalHeigth * newVal/100}px`;
                    }
                });
            }
        }
    }
        
})();