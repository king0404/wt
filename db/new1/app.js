var app = angular.module("employeeApp", []);

app.controller("EmployeeController", [
  function () {
    var vm = this;

    // initial employees
    vm.employees = [
      { name: "Alice", position: "Manager" },
      { name: "Bob", position: "Developer" },
    ];

    vm.newEmployee = {};

    // add employee
    vm.addEmployee = function () {
      if (vm.newEmployee.name && vm.newEmployee.position) {
        vm.employees.push({
          name: vm.newEmployee.name,
          position: vm.newEmployee.position,
        });
        vm.newEmployee = {}; // clear form
      }
    };

    // update employee (already two-way bound via ng-model)
    vm.updateEmployee = function (emp) {
      alert("Employee updated: " + emp.name + " - " + emp.position);
      // (No extra code needed because ng-model already updates vm.employees)
    };

    // delete employee
    vm.deleteEmployee = function (index) {
      vm.employees.splice(index, 1);
    };
  },
]);
