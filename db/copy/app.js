angular.module('labApp', [])
.factory('UserFactory', function($http) {
    const baseUrl = 'http://localhost:3000/users';
    return {
        getUsers: () => $http.get(baseUrl),
        addUser: (user) => $http.post(baseUrl, user),
        updateUser: (user) => $http.put(`${baseUrl}/${user._id}`, user),
        deleteUser: (id) => $http.delete(`${baseUrl}/${id}`)
    };
})
.service('UserService', function(UserFactory) {
    this.getAllUsers = () => UserFactory.getUsers();
    this.createUser = (user) => UserFactory.addUser(user);
    this.updateUser = (user) => UserFactory.updateUser(user);
    this.deleteUser = (id) => UserFactory.deleteUser(id);
})
.controller('MainCtrl', function($scope, UserService) {
    $scope.users = [];
    $scope.newUser = {};

    function loadUsers() {
        UserService.getAllUsers().then(res => $scope.users = res.data);
    }

    loadUsers();

    $scope.addUser = function() {
        if($scope.newUser.name && $scope.newUser.email) {
            UserService.createUser($scope.newUser).then(res => {
                $scope.users.push(res.data);
                $scope.newUser = {};
            });
        } else {
            alert("Enter name and email!");
        }
    };

    $scope.editUser = function(user) {
        user.editing = true;
    };

    $scope.updateUser = function(user) {
        UserService.updateUser(user).then(res => {
            user.editing = false;
        });
    };

    $scope.deleteUser = function(user) {
        if(confirm("Are you sure you want to delete this user?")) {
            UserService.deleteUser(user._id).then(res => {
                const index = $scope.users.indexOf(user);
                $scope.users.splice(index, 1);
            });
        }
    };
});
