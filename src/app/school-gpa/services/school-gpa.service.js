(() => {
  angular
        .module("app")
        .factory("schoolGpaService", SchoolGpaService);

  function SchoolGpaService() {
    let grades = [];
    let currentGrade = 0;
    let previousGrade = 0;
    let averageGPA = 0;

    let api = {
      grades,
      currentGrade,
      previousGrade,
      averageGPA,

      addNewGrade,
      removeGrade,

      addStudent,
      removeStudent,

      calculateAverageGPA,
      
      searchById
    };

    function addNewGrade() {
      api.grades.push({
        students: [],
        name: "",
        id: new Date().getTime()
      });
      api.previousGrade = api.currentGrade;
      api.currentGrade = api.grades.length - 1;
    }

    function addStudent(student) {
      let copyStudent = {};

      angular.copy(student, copyStudent);

      copyStudent.mark = parseFloat(copyStudent.mark);
      copyStudent.id = new Date().getTime();

      api.grades[api.currentGrade].students.push(copyStudent);

      api.averageGPA = calculateAverageGPA();
    }

    function removeStudent(student) {
      const index = api.grades[api.currentGrade].students.findIndex(
        searchById,
        student
      );

      api.grades[api.currentGrade].students.splice(index, 1);

      api.averageGPA = calculateAverageGPA();
    }

    function removeGrade(grade) {
      const index = api.grades.findIndex(searchById, grade);

      api.grades.splice(index, 1);

      if (api.grades.length > 0) {
        api.currentGrade = 0;
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
      api.grades.forEach((value, key) => {
        value.students.forEach((value, key) => {
          allSum = allSum + value.mark;
        });

        studentsAmount = studentsAmount + value.students.length;
      });
      if (studentsAmount > 0) return allSum / studentsAmount;
      return 0;
    }

    return api;
  }
})();
