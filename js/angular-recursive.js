'use.strict';

(function(){
	var recurseDirective = 'qRecurse', recurseNodeDirective = 'qRecurseNode';

	angular.module('quramy-recursive', []).directive(recurseDirective, ['$parse', function($parse){
		return{
			transclude: true,
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
					scope.$depth = 0;
					if(attrs.qRecurse && attrs.qRecurseVar){
						var data = $parse(attrs.qRecurse)(scope);
						scope[attrs.qRecurseVar] = data;
					}
				}
			}
		};
	}]).directive(recurseNodeDirective, ['$parse', function($parse){
		return {
			restrict: 'EAC',
			require: '^' + recurseDirective,
			link: {
				post: function(scope, element, attrs, ctrl){
					if(ctrl && attrs[recurseNodeDirective]){
						var childName = ctrl.recurseName;
						var childScope = scope.$new(false);
						var child = $parse(attrs[recurseNodeDirective])(scope);
						if(child){
							childScope.$depth = scope.$depth + 1;
							$parse(childName).assign(childScope, child);
							ctrl.linkFn(childScope, function(clonedElement){
								element.append(clonedElement);
							});
						}
					}
				}
			}
		};
	}]);
})(angular);
