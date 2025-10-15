// app.js
const app = angular.module("contactApp", []);

app.controller("ContactController", function ($scope, $http) {
  $scope.contacts = [];
  $scope.contact = {};
  $scope.editMode = false;

  // Load all contacts
  function loadContacts() {
    $http.get("/api/contacts").then((res) => {
      $scope.contacts = res.data;
    });
  }
  loadContacts();

  // Add or update contact
  $scope.addOrUpdateContact = function () {
    if ($scope.editMode) {
      $http
        .put("/api/contacts/" + $scope.contact._id, $scope.contact)
        .then(() => {
          $scope.contact = {};
          $scope.editMode = false;
          loadContacts();
        });
    } else {
      $http.post("/api/contacts", $scope.contact).then(() => {
        $scope.contact = {};
        loadContacts();
      });
    }
  };

  // Edit contact
  $scope.editContact = function (c) {
    $scope.contact = angular.copy(c);
    $scope.editMode = true;
  };

  // Delete contact
  $scope.deleteContact = function (id) {
    $http.delete("/api/contacts/" + id).then(() => loadContacts());
  };

  // Clear form
  $scope.clearForm = function () {
    $scope.contact = {};
    $scope.editMode = false;
  };
});
