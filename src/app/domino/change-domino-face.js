(() => {

    angular
        .module('app')
        .directive("changeDominoFace", changeDominoFace);
        
    function changeDominoFace($templateCache, $compile) {
        return {
            restrict: "A",
            templateUrl: "app/domino/dominoFaces.html",
            link: function(scope, element, attr) {
                scope.$watch(attr.changeDominoFace, function(newVal, oldVal) {
                    appendFace(newVal, element, $templateCache, scope);
                    if(newVal != oldVal)
                    {
                        var child = element[0].lastElementChild;  
                        while (child) { 
                            element[0].removeChild(child); 
                            child = element[0].lastElementChild; 
                        }
                        appendFace(newVal, element, $templateCache, scope);
                    }
                });
            }
        }

        function appendFace(newVal, element, $templateCache, scope){
            let template = $templateCache.get(`${newVal}-point(s)`) 
            let face = $compile(template)(scope);
            angular.forEach(face, (val, key) =>{
                element[0].append(val);
            });
        }
    }
        
})();