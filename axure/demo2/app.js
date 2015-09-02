(function() {
	var app = angular.module('taskData', []);

	app.controller('GuidelinesController', function($scope, $http) {
		$scope.guidelines;
		$http.get('data/guideline.json')
			.then(function(res) {
				$scope.guidelines = res.data;
			});

	});

	app.controller('ToolsController', function($scope, $http) {
		$scope.tools;
		$http.get('data/tools.json')
			.then(function(res) {
				$scope.tools = res.data;
			});

	});

	app.controller('SMEController', function($scope, $http) {
		$scope.smes;
		$http.get('data/sme.json')
			.then(function(res) {
				$scope.smes = res.data;
			});

	});

	app.controller('StudiosController', function($scope, $http) {
		$scope.studios;
		$http.get('data/studios.json')
			.then(function(res) {
				$scope.studios = res.data;
			});

	});

})();