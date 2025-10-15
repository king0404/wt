// app.js
var app = angular.module("movieApp", ["ngAnimate"]);

app.factory("TicketFactory", function () {
  var factory = {};

  factory.movies = [
    {
      title: "Avengers: Endgame",
      genre: "Action",
      showtime: "10:00 AM",
      seats: Array.from({ length: 10 }, () => ({ booked: false })),
    },
    {
      title: "Frozen II",
      genre: "Animation",
      showtime: "1:00 PM",
      seats: Array.from({ length: 10 }, () => ({ booked: false })),
    },
    {
      title: "Inception",
      genre: "Sci-Fi",
      showtime: "6:00 PM",
      seats: Array.from({ length: 10 }, () => ({ booked: false })),
    },
  ];

  // Helper to count available seats
  factory.movies.forEach((m) => {
    m.availableSeats = function () {
      return this.seats.filter((s) => !s.booked).length;
    };
  });

  return factory;
});

app.controller("MainCtrl", function ($scope, TicketFactory) {
  $scope.movies = TicketFactory.movies;
  $scope.genres = [...new Set($scope.movies.map((m) => m.genre))];
  $scope.showtimes = [...new Set($scope.movies.map((m) => m.showtime))];

  // Toggle booking/cancellation
  $scope.toggleSeat = function (movie, seat) {
    seat.booked = !seat.booked;
  };

  // Filters
  $scope.genreFilter = function (movie) {
    if (!$scope.selectedGenre) return true;
    return movie.genre === $scope.selectedGenre;
  };

  $scope.showtimeFilter = function (movie) {
    if (!$scope.selectedShowtime) return true;
    return movie.showtime === $scope.selectedShowtime;
  };
});
