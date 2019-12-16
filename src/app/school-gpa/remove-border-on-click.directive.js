(() => {

    angular
        .module('app')
        .directive("removeBorderOnClick", removeBorderOnClick);
        
    function removeBorderOnClick() {
        let isSelected = false;
        console.log('kek');
        return {
            restrict: "A",
            scope:{
                tabId: "@"
            },
            link: function(scope, element, attr) {
                scope.$watch(attr.removeBorderOnClick, function(newVal, oldVal) {
                    console.log(scope.tabId);
                    console.log(newVal);
                    console.log(scope.tabId == newVal.id);
                    if((newVal.id == scope.tabId) && !isSelected)
                    {
                        console.log("here");
                        element[0].style.borderBottom = "none";
                    }
                    else if(isSelected && (newVal.id !== scope.tabId))
                    {
                        console.log("here2");
                        element[0].style.border = "1px solid black";
                    }
                }, true);
            }
        }
    }
        
})();