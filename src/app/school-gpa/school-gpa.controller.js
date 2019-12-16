(() => {
  angular.module("app").controller("SchoolGpaController", SchoolGpaController);

  function SchoolGpaController($scope, $timeout, schoolGpaService) {
    const vm = this;
    vm.$onInit = onInit;
    vm.header = "SchoolGpa";

    function onInit() {
      console.log(schoolGpaService);
      vm.grades = [];
      vm.student = {
        name: "",
        mark: ""
      };
      vm.grade = "";

      vm.currentGrade = 0;
      vm.previousGrade = 0;

      vm.addStudent = addStudent;
      vm.removeStudent = removeStudent;

      vm.addNewGrade = addNewGrade;
      vm.chooseGrade = chooseGrade;
      vm.removeGrade = removeGrade;

      vm.removeBorder = removeBorderFromTab;

      $scope.$watchCollection("vm.grades", (newVal, oldVal) => {
        vm.averageGPA = calculateAverageGPA();
      });
    }

    function addNewGrade() {
      vm.student = {
        name: "",
        mark: ""
      };
      vm.grades.push({
        students: [],
        name: "",
        id: new Date().getTime()
      });
      vm.previousGrade = vm.currentGrade;
      vm.currentGrade = vm.grades.length - 1;

      $timeout(vm.removeBorder, 0);
    }

    function addStudent(student) {
      let copyStudent = {};

      angular.copy(student, copyStudent);

      copyStudent.mark = parseFloat(copyStudent.mark);
      copyStudent.id = new Date().getTime();

      vm.grades[vm.currentGrade].students.push(copyStudent);

      vm.student = {
        name: "",
        mark: ""
      };

      vm.averageGPA = calculateAverageGPA();
    }

    function removeStudent(student) {
      const index = vm.grades[vm.currentGrade].students.findIndex(
        searchById,
        student
      );

      vm.grades[vm.currentGrade].students.splice(index, 1);

      vm.averageGPA = calculateAverageGPA();
    }

    function chooseGrade(grade) {
      const index = vm.grades.findIndex(searchById, grade);
      if (vm.currentGrade !== index) {
        vm.previousGrade = vm.currentGrade;
        vm.currentGrade = index;
        vm.student = {
          name: "",
          mark: ""
        };
        vm.removeBorder();
      }
    }

    function removeGrade(grade) {
      const index = vm.grades.findIndex(searchById, grade);
        
      vm.grades.splice(index, 1);

      if (vm.grades.length > 0) {
        vm.currentGrade = 0;
        vm.removeBorder();
      }
    }

    function searchById(element, index, array) {
      if (this.id === element.id) {
        return true;
      }
      return false;
    }

    function calculateAverageGPA() {
      let allSum = 0;
      let studentsAmount = 0;
      vm.grades.forEach((value, key) => {
        value.students.forEach((value, key) => {
          allSum = allSum + value.mark;
        });

        studentsAmount = studentsAmount + value.students.length;
      });
      if (studentsAmount > 0) return allSum / studentsAmount;
      return 0;
    }

    function removeBorderFromTab() {
      if(angular.isDefined(vm.grades[vm.previousGrade])){
        const prevId = vm.grades[vm.previousGrade].id;
        let oldTab = angular.element(document.querySelector(`#tab${prevId}`));
        oldTab[0].style.borderBottom = "1px solid black";
      }
      
      const id = vm.grades[vm.currentGrade].id;
      let tab = angular.element(document.querySelector(`#tab${id}`));
      tab[0].style.borderBottom = "none";
    }

  }
})();
