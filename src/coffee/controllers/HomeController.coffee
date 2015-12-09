angular.module('yunlamp').controller 'HomeController', ($scope, $interval, $timeout, $log) ->

	# Demo mode variables
	$scope.demo_mode = false
	demo_interval = {}

	# RGB state variables
	$scope.red = 0
	$scope.green = 0
	$scope.blue = 0

	# Creation of the Spacebrew Client
	sb = new (Spacebrew.Client)
	
	# Setup of the Spacebrew Client with name & description
	sb.name 'YunLamp Controller'
	sb.description 'YunLamp Controller for Spacebrew'
	
	# Adding the Spacebrew Commands

	sb.addPublish 'redLed', 'range', '0'
	sb.addPublish 'greenLed', 'range', '0'
	sb.addPublish 'blueLed', 'range', '0'

	# Finally, connect to Spacebrew
	sb.connect()

	# Method that handles the calls to Spacebrew
	sendSpace = (id, type, value) ->
		sb.send id, type, value.toString()

	# Log current color in console
	logColors = ->
		$log.debug("RED: #{$scope.red} - GREEN: #{$scope.green} - BLUE: #{$scope.blue}")

	# Turn OFF all the leds
	turnOff = ->
		$scope.updateRed(0)
		$timeout ->
			$scope.updateGreen(0)
		, 160
		$timeout ->
			$scope.updateGreen(0)
		, 320

	# Send new RED value to Spacebrew
	$scope.updateRed = (red) ->
		$scope.red = red
		sendSpace('redLed', 'range', red)
		logColors()

	# Send new GREEN value to Spacebrew
	$scope.updateGreen = (green) ->
		$scope.green = green
		sendSpace('greenLed', 'range', green)
		logColors()

	# Send new BLUE value to Spacebrew
	$scope.updateBlue = (blue) ->
		$scope.blue = blue
		sendSpace('blueLed', 'range', blue)
		logColors()

	# Demo mode with gradient colors
	$scope.toggleDemoMode = ->
		if !$scope.demo_mode
			$scope.demo_mode = true
			turnOff()

			$scope.red = 255
			$scope.green = 0
			$scope.blue = 0

			step = 3

			demo_interval = $interval( () ->
				if $scope.red > 0 && $scope.blue == 0
					$scope.red -= step
					$scope.green += step

				if $scope.green > 0 && $scope.red == 0
					$scope.green -= step
					$scope.blue += step

				if $scope.blue > 0 && $scope.green == 0
					$scope.red += step
					$scope.blue -= step

				$scope.updateRed($scope.red)
				$scope.updateGreen($scope.green)
				$scope.updateBlue($scope.blue)

			, 150)
		else
			$scope.demo_mode = false
			$interval.cancel demo_interval