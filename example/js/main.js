'use strict';

angular.module('myApp', ['quramy-recursive']).controller('Ctrl', ['$scope', function($scope){
	var treeData = {
		name: 'root',
		children: [
			{ name: 'usr', children:[{ name: 'lib' }] },
			{ name: 'var' },
			{ name: 'home' }
		]
	};

	$scope.addChild = function(data){
		data.children.push({
			name: data.newName
		});
	};

	$scope.title = 'my tree data';

	$scope.treeData = treeData;

	$scope.someData = {
		myTree: treeData
	};
}]);
