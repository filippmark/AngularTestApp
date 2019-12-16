(() => {
  angular
        .module("app")
        .controller("DominoController", DominoController);

  function DominoController() {
    const vm = this;
    vm.$onInit = onInit;
    vm.header = "Domino";

    function onInit() {
      vm.degree = 0;

      vm.size = 75;

      vm.speed = 50;

      vm.topPartOfDomino = 3;
      vm.bottomPartOfDomino = 6;

      vm.updateFaces = updateFaces;

      vm.changeSize = changeSize;

      vm.changeSpeed = changeSpeed;
    }

    function updateFaces() {
      vm.topPartOfDomino = generateRandomInt();
      vm.bottomPartOfDomino = generateRandomInt();
    }

    function generateRandomInt() {
      return Math.floor(Math.random() * 6) + 1;
    }

    function changeSize() {
      const originalWidth = 140;
      const originalHeigth = 200;

      const element = angular.element(document.querySelector(".domino"));

      const coef = vm.size / 100;

      element[0].style.width = `${originalWidth * coef}px`;
      element[0].style.height = `${originalHeigth * coef}px`;
    }

    function changeSpeed() {
      const originalSpeed = 1000;

      const element = angular.element(document.querySelector(".domino"));

      element[0].style.transition = `transform ease ${(originalSpeed *
        (100 - vm.speed)) /
        100}ms`;
    }
  }
})();