angular.module('yunlamp', ['ionic']);

angular.module('yunlamp').run(function($rootScope, $ionicPlatform) {
  return $ionicPlatform.ready(function() {
    if (window.cordova && window.cordova.plugins.Keyboard) {
      cordova.plugins.Keyboard.hideKeyboardAccessoryBar(true);
    }
    if (window.StatusBar) {
      return StatusBar.styleDefault();
    }
  });
});

angular.module('yunlamp').config(function($stateProvider, $urlRouterProvider, $httpProvider) {
  $stateProvider.state('home', {
    url: '/home',
    templateUrl: 'templates/home.html',
    controller: 'HomeController'
  });
  return $urlRouterProvider.otherwise('/home');
});

angular.module('yunlamp').controller('HomeController', function($scope, $interval, $timeout, $log) {
  var demo_interval, logColors, sb, sendSpace, turnOff;
  $scope.demo_mode = false;
  demo_interval = {};
  $scope.red = 0;
  $scope.green = 0;
  $scope.blue = 0;
  sb = new Spacebrew.Client;
  sb.name('YunLamp Controller');
  sb.description('YunLamp Controller for Spacebrew');
  sb.addPublish('redLed', 'range', '0');
  sb.addPublish('greenLed', 'range', '0');
  sb.addPublish('blueLed', 'range', '0');
  sb.connect();
  sendSpace = function(id, type, value) {
    return sb.send(id, type, value.toString());
  };
  logColors = function() {
    return $log.debug("RED: " + $scope.red + " - GREEN: " + $scope.green + " - BLUE: " + $scope.blue);
  };
  turnOff = function() {
    $scope.updateRed(0);
    $timeout(function() {
      return $scope.updateGreen(0);
    }, 160);
    return $timeout(function() {
      return $scope.updateGreen(0);
    }, 320);
  };
  $scope.updateRed = function(red) {
    $scope.red = red;
    sendSpace('redLed', 'range', red);
    return logColors();
  };
  $scope.updateGreen = function(green) {
    $scope.green = green;
    sendSpace('greenLed', 'range', green);
    return logColors();
  };
  $scope.updateBlue = function(blue) {
    $scope.blue = blue;
    sendSpace('blueLed', 'range', blue);
    return logColors();
  };
  return $scope.toggleDemoMode = function() {
    var step;
    if (!$scope.demo_mode) {
      $scope.demo_mode = true;
      turnOff();
      $scope.red = 255;
      $scope.green = 0;
      $scope.blue = 0;
      step = 3;
      return demo_interval = $interval(function() {
        if ($scope.red > 0 && $scope.blue === 0) {
          $scope.red -= step;
          $scope.green += step;
        }
        if ($scope.green > 0 && $scope.red === 0) {
          $scope.green -= step;
          $scope.blue += step;
        }
        if ($scope.blue > 0 && $scope.green === 0) {
          $scope.red += step;
          $scope.blue -= step;
        }
        $scope.updateRed($scope.red);
        $scope.updateGreen($scope.green);
        return $scope.updateBlue($scope.blue);
      }, 150);
    } else {
      $scope.demo_mode = false;
      return $interval.cancel(demo_interval);
    }
  };
});
