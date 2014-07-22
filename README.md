# Andular Recursive

This is [AngularJS](https://angularjs.org/) directive for tree strucuture datum recursively.

## How to install

Download angular-recursive.js file from [here](https://github.com/Quramy/angular-recursive/blob/master/js/angular-recursive.js), or use [bower](http://bower.io/).

```bash
$ bower install angular-recursive
```

And load script into your html.

```html
...
<script src="bower_components/angular/angular.min.js"></script>
<script src="bower_components/angular-recursive/js/angular-recursive.js"></script>
...
```

## Usage

Load `quramy-recursive` module into your app.

```js
var myApp = angular.module('myApp', ['quramy-recursive']);
```

Setup recursive structure data on your `scope`.

```js
myApp.controller('Ctrl', ['$scope', function($scope){
	$scope.treeData = {
		name: 'root',
		children: [
			{ name: 'usr', children:[{ name: 'lib' }, {name: 'bin'}] },
			{ name: 'var' }
		]
	};
});
```

Markup `q-recurse` and `q-recurse-node` on elements to recurse in your view.

```html
<div ng-controller="Ctrl">
	<div q-recurse="treeData">
		<span>{{treeData.name}}</span>
		<ul>
			<li ng-repeat="childNode in treeData.children" q-recurse-node="childNode"></li>
		</ul>
	</div>
</div>
```

Run your app, so you can get following html:

----

root
 + usr
  + lib
  + bin
 + var

----

## Reference

+ `q-recurse`

This directive stands for starting recursion. 
Set "root" of your tree data to this attribute.

+ `q-recurse-node`

This directive stands for ending recursion. 
Set "next node" of your tree data to this attribute.  
The element marked up this attribute must have a parent element marked up `q-recurse` attribute.
It expands elements contained in the element maked up `q-recurse` into itself until "next node" data is `null` or `undefined`.

+ `q-recurse-var`

Set an alias recursive structure data.

```html
<div q-recurse="someData.linkList" q-recurse-var="myLink">
	<span>{{myTree.name}}</span>
  <div q-recurse-node="myLink.next"></div>
</div>
```

```js
$scope.someData = {
	linkList:{
		name: 'first',
		next: {
			name: 'second',
			next: {
				name: 'last'
			}
		}
	}
};
```

+ `$depth`

You can access recursion level in yout html using `scope.$depth` (e.g. `$index` in `ng-repeat`). 

The following example limits the number of recursive expansion to 3 times.

```html
<div q-recurse="linkData">
	Recursion level: {{$depth}}
	<div ng-if="$depth < 3" q-recurse-node="linkData.next"></div>
</div>
```

