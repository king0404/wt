// app.js
angular
  .module("studentApp", [])
  .controller("StudentController", function ($scope, $http) {
    $scope.students = [];
    $scope.student = {};
    $scope.editMode = false;
    $scope.editId = null;

    const apiUrl = "http://localhost:3010/students";

    // Load students
    $scope.loadStudents = function () {
      $http.get(apiUrl).then(function (response) {
        $scope.students = response.data;
      });
    };

    // Add student
    $scope.addStudent = function () {
      if ($scope.student.name && $scope.student.age && $scope.student.grade) {
        $http.post(apiUrl, $scope.student).then(function () {
          $scope.student = {};
          $scope.loadStudents();
        });
      }
    };

    // Edit student
    $scope.edit = function (s) {
      $scope.student = angular.copy(s);
      $scope.editMode = true;
      $scope.editId = s._id;
    };

    // Update student
    $scope.updateStudent = function () {
      $http.put(apiUrl + "/" + $scope.editId, $scope.student).then(function () {
        $scope.student = {};
        $scope.editMode = false;
        $scope.editId = null;
        $scope.loadStudents();
      });
    };

    // Delete student
    $scope.deleteStudent = function (id) {
      $http.delete(apiUrl + "/" + id).then(function () {
        $scope.loadStudents();
      });
    };

    // Initial load
    $scope.loadStudents();
  });
