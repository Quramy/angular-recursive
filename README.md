# Andular Recursive

This is [AngularJS](https://angularjs.org/) directive for tree strucuture datum recursively.

## How to install

Download angular-recursive.min.js file from here, or use bower.

```
$ bower install angular-recursive
```

And load script into your html.

```html
<script src="bower_components/angular-recursive/js/angular-recursive.js"></script>
```

## Usage

Load `quramy-recursive` module into your app.

```js
var myApp = angular.module('myApp', ['quramy-recursive']);
```

Setup recursive structure data on `scope`.

```js
myApp.controller('Ctrl', ['$scope', function($scope){
	$scope.treeData = {
		name: 'root',
		children: [
			{ name: 'usr', children:[{ name: 'lib' }, {name: 'bin'}] },
			{ name: 'var' },
			{ name: 'home' }
		]
	};
});
```

Markup `q-recurse` and `q-recurse-node` into your view.

```html
	<div ng-controller="Ctrl">
		<div q-recurse="treeData">
			<ul>
				<li ng-repeat="childNode in treeData.children" q-recurse-node="childNode"></li>
			</ul>
		</div>
	</div>
```

## reference

