'use.strict';

var cc = 0;

angular.module('quramy-recursive', []).directive('qRecurse', ['$parse', function($parse){
	return{
		transclude: true,
		//transclude: 'elements',
		restrict: 'EAC',
		template: '<div ng-transclude></div>',
		controller: ['$scope', '$attrs', '$transclude', function($scope, $attrs, $transclude){
			var data;
			this.linkFn = $transclude;
			this.recurseName = $attrs.qRecurse;

			if($attrs.qRecurse && $attrs.qRecurseVar){
				this.recurseName = $attrs.qRecurseVar;
				data = $parse($attrs.qRecurse)($scope);
				$scope[$attrs.qRecurseVar] = $scope[$attrs.qRecurseVar] || data;
			}

		}],
		link: {
			pre: function(scope, element, attrs){
				if(attrs.qRecurse && attrs.qRecurseVar){
					var data = $parse(attrs.qRecurse)(scope);
					scope[attrs.qRecurseVar] = data;
				}
			}
		}
	};
}]).directive('qRecurseNode', ['$parse', function($parse){
	return {
		restrict: 'EAC',
		require: '^qRecurse',
		link: function(scope, element, attrs, ctrl){
			if(ctrl && cc < 14){
				cc =  cc + 1;
				var chileName = ctrl.recurseName;
				var childScope = scope.$new(false);
				var child = $parse(attrs.qRecurseNode)(scope);
				if(child){
					$parse(chileName).assign(childScope, child);
					ctrl.linkFn(childScope, function(clonedElement){
						element.append(clonedElement);
					});
				}
			}
		}
	};
}]);
