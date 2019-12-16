(() => {

    angular
        .module('app')
        .controller('SchoolGpaController', SchoolGpaController);

    function SchoolGpaController($scope) {
        const vm = this;
        vm.$onInit = onInit;
        vm.header = 'SchoolGpa';
        
        function onInit() {
            vm.grades = [];
            vm.student = {
                name: "",
                mark: ""
            };
            vm.grade = '';
            vm.studentName = '';
            vm.studentGPA = 0;
            vm.averageGPA = 0;
            vm.currentGrade = 0; 
            
            vm.addStudent = addStudent;
            vm.removeStudent = removeStudent;

            vm.addNewGrade = addNewGrade;
            vm.chooseGrade = chooseGrade;
            vm.removeGrade = removeGrade;

            $scope.$watchCollection('vm.grades', (newVal, oldVal) => {
                vm.averageGPA = calculateAverageGPA();
            })
        }

        function addNewGrade(){
            vm.student = {
                name: "",
                mark: ""
            }; 
            vm.grades.push({
                students: [],
                name: "",
                id: new Date().getTime(),
            });
            vm.currentGrade = vm.grades.length - 1;
        }

        function addStudent(student){
            console.log(student);
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
            console.log(vm.grades);
        }

        function removeStudent(student){
            const index = vm.grades[vm.currentGrade].students.findIndex(searchById, student);
            vm.grades[vm.currentGrade].students.splice(index, 1);
            vm.averageGPA = calculateAverageGPA();
            console.log(vm.grades);
        }

        function chooseGrade(grade){
            const index = vm.grades.findIndex(searchById, grade);
            if(vm.currentGrade !== index)
            {   
                vm.currentGrade = index;
                vm.student = {
                    name: "",
                    mark: ""
                };
            }
        }


        function removeGrade(grade){
            const index = vm.grades.findIndex(searchById, grade);
            vm.grades.splice(index, 1);
            if(vm.grades.length > 0)
            {
                vm.currentGrade = 0;
            }
            
        }

        function searchById(element, index, array){
            if(this.id === element.id){
                return true;
            }
            return false;
        }

       function calculateAverageGPA(){
            let allSum = 0; 
            let studentsAmount = 0;
            angular.forEach(vm.grades, (value, key)=>{
                angular.forEach(value.students, (value, key) => {
                    console.log(value.mark);
                    allSum = allSum + value.mark;
                });
                studentsAmount = studentsAmount + value.students.length;
            })
            if(studentsAmount > 0)
                return allSum/studentsAmount;
            return 0;
        }

    }

})();