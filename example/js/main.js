'use strict';

angular.module('myApp', ['quramy-recursive']).controller('Ctrl', ['$scope', function($scope){
	var treeData = {
		name: 'root',
		children: [
			{ name: 'usr', children:[{ name: 'lib' }, {name: 'bin'}] },
			{ name: 'var' },
			{ name: 'home' }
		]
	};

	$scope.addChild = function(data){
		if(!data.children){
			data.children = [];
		}
		data.children.push({
			name: data.newName
		});
		data.newName = '';
	};

	$scope.removeChild = function(data, i){
		data.children.splice(i, 1);
	};

	$scope.title = 'my tree data';

	$scope.treeData = treeData;

	$scope.someData = {
		myTree: treeData
	};
}]);
