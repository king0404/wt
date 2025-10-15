const app = angular.module("chatApp", []);

app.controller("ChatCtrl", function ($scope, $http, $interval) {
  const api = "http://localhost:3000/messages";
  $scope.messages = [];

  // Load messages
  const loadMessages = () => {
    $http.get(api).then((res) => ($scope.messages = res.data));
  };
  loadMessages();

  // Refresh every 2 seconds
  $interval(loadMessages, 2000);

  // Send new message
  $scope.sendMessage = () => {
    if (!$scope.newMsg.user || !$scope.newMsg.text) return;
    $http.post(api, $scope.newMsg).then(() => {
      $scope.newMsg.text = "";
      loadMessages();
    });
  };

  // Send message on Enter key
  $scope.checkEnter = (e) => {
    if (e.which === 13) $scope.sendMessage();
  };
});
