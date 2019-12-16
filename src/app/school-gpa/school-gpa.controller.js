(() => {
  angular.module("app").controller("SchoolGpaController", SchoolGpaController);

  function SchoolGpaController($scope, $timeout, schoolGpaService) {
    const vm = this;
    vm.$onInit = onInit;
    vm.header = "SchoolGpa";

    function onInit() {
      vm.grades = schoolGpaService.grades;
      vm.student = {
        name: "",
        mark: ""
      };
      vm.grade = "";

      vm.currentGrade = schoolGpaService.currentGrade;
      vm.previousGrade = schoolGpaService.previousGrade;
      vm.averageGPA = schoolGpaService.averageGPA;

      vm.addStudent = addStudent;
      vm.removeStudent = removeStudent;

      vm.addNewGrade = addNewGrade;
      vm.chooseGrade = chooseGrade;
      vm.removeGrade = removeGrade;

      vm.removeBorder = removeBorderFromTab;

      $scope.$watchCollection("vm.grades", (newVal, oldVal) => {
        vm.averageGPA = schoolGpaService.calculateAverageGPA();
      });
    }

    function addNewGrade() {
      vm.student = {
        name: "",
        mark: ""
      };

      schoolGpaService.addNewGrade();

     vm.currentGrade = schoolGpaService.currentGrade;
     vm.previousGrade = schoolGpaService.previousGrade;
     

      $timeout(vm.removeBorder, 0);
    }

    function addStudent(student) {
      schoolGpaService.addStudent(student);
    
      vm.averageGPA = schoolGpaService.averageGPA;

      vm.student = {
        name: "",
        mark: ""
      };
    }

    function removeStudent(student) {
      schoolGpaService.removeStudent(student);
      vm.averageGPA = schoolGpaService.averageGPA;
    }

    function chooseGrade(grade) {
      const index = schoolGpaService.grades.findIndex(searchById, grade);
      if (schoolGpaService.currentGrade !== index) {
        schoolGpaService.previousGrade = schoolGpaService.currentGrade;
        schoolGpaService.currentGrade = index;

        vm.currentGrade = schoolGpaService.currentGrade;
        vm.previousGrade = schoolGpaService.previousGrade;

        vm.student = {
          name: "",
          mark: ""
        };
        vm.removeBorder();
      }
    }

    function searchById(element, index, array) {
        if (this.id === element.id) {
          return true;
        }
        return false;
      }

    function removeGrade(grade) {
      schoolGpaService.removeGrade(grade);

      vm.currentGrade = schoolGpaService.currentGrade;
      vm.previousGrade = schoolGpaService.previousGrade;
    
      vm.averageGPA = schoolGpaService.averageGPA;

      if (vm.grades.length > 0) {
        vm.removeBorder();
      }
    }



    function removeBorderFromTab() {
      if(angular.isDefined(vm.grades[schoolGpaService.previousGrade])){
        const prevId = vm.grades[schoolGpaService.previousGrade].id;
        let oldTab = angular.element(document.querySelector(`#tab${prevId}`));
        oldTab[0].style.borderBottom = "1px solid black";
      }
      
      const id = vm.grades[schoolGpaService.currentGrade].id;
      let tab = angular.element(document.querySelector(`#tab${id}`));
      tab[0].style.borderBottom = "none";
    }

  }
})();
