var app = angular.module("weatherApp", []);

app.controller("WeatherController", function ($scope, $http) {
  const API_KEY = "b6595bf4c0273294c6e0aee327798b96";

  $scope.city = "";
  $scope.weatherData = null;

  $scope.getWeather = function () {
    if (!$scope.city) return;

    const url =
      "https://api.openweathermap.org/data/2.5/weather?q=" +
      $scope.city +
      "&appid=" +
      API_KEY +
      "&units=metric";

    $http.get(url).then(
      function (response) {
        $scope.weatherData = response.data;
      },
      function () {
        alert("City not found or API error!");
      }
    );
  };
});

app.directive("weatherDisplay", function () {
  return {
    restrict: "E",
    scope: {
      data: "=",
    },
    template: `
      <div class="result" ng-if="data">
        <h2>{{data.name | uppercase}}</h2>
        <div class="temp">{{data.main.temp | number:1}} °C</div>
        <p>{{data.weather[0].description | uppercase}}</p>
        <p>Humidity: {{data.main.humidity}}%</p>
        <p>Wind Speed: {{data.wind.speed}} m/s</p>
      </div>
    `,
  };
});
