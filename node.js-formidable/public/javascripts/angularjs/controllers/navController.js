app.controller("NavController", function($scope, NavService) {

$scope.isLogged = false;

// Get menu:
$scope.menu = NavService.menu;

});
