// app.js
const app = angular.module("hospitalApp", []);

app.controller("PatientController", function ($scope, $http) {
  $scope.patients = [];
  $scope.patient = {};
  $scope.editMode = false;

  // Load all patients
  const loadPatients = () => {
    $http.get("/api/patients").then((res) => {
      $scope.patients = res.data;
    });
  };
  loadPatients();

  // Add or update patient
  $scope.addOrUpdatePatient = () => {
    if ($scope.editMode) {
      $http
        .put(`/api/patients/${$scope.patient._id}`, $scope.patient)
        .then(() => {
          $scope.patient = {};
          $scope.editMode = false;
          loadPatients();
        });
    } else {
      $http.post("/api/patients", $scope.patient).then(() => {
        $scope.patient = {};
        loadPatients();
      });
    }
  };

  // Edit patient
  $scope.editPatient = (p) => {
    $scope.patient = angular.copy(p);
    $scope.editMode = true;
  };

  // Delete patient
  $scope.deletePatient = (id) => {
    $http.delete(`/api/patients/${id}`).then(() => loadPatients());
  };

  // Clear form
  $scope.clearForm = () => {
    $scope.patient = {};
    $scope.editMode = false;
  };
});
