'use strict';

(function(){
	var recurseDirective = 'qRecurse', recurseNodeDirective = 'qRecurseNode', recurseTakeover = recurseDirective + 'Takeover';

	angular.module('quramy-recursive', []).directive(recurseDirective, ['$parse', function($parse){
		return{
			transclude: true,
			restrict: 'AC',
			template: '<div ng-transclude></div>',
			controller: ['$scope', '$attrs', '$transclude', function($scope, $attrs, $transclude){
				var data;
				this.linkFn = $transclude;
				this.recurseName = $attrs.qRecurse;

				// Set alias
				if($attrs.qRecurse && $attrs.qRecurseVar){
					this.recurseName = $attrs.qRecurseVar;
					data = $parse($attrs.qRecurse)($scope);
					$scope[$attrs.qRecurseVar] = $scope[$attrs.qRecurseVar] || data;
				}

			}],
			link: {
				pre: function(scope, element, attrs){
					scope.$depth = 0;
					/*
					if(attrs.qRecurse && attrs.qRecurseVar){
						var data = $parse(attrs.qRecurse)(scope);
						scope[attrs.qRecurseVar] = data;
					}
				  */
				}
			}
		};
	}]).directive(recurseNodeDirective, ['$parse', function($parse){
		var scopeTransfer = function(destScope, transVars){
			var i = 0;
			if(angular.isObject(transVars)){
				angular.forEach(transVars, function(value, key){
					destScope[key] = value;
				});
			}else{
				return;
			}
		};
		return {
			restrict: 'AC',
			require: '^' + recurseDirective,
			link: {
				post: function(scope, element, attrs, ctrl){
					if(ctrl && attrs[recurseNodeDirective]){
						var childName = ctrl.recurseName;
						var childScope;
						var child = $parse(attrs[recurseNodeDirective])(scope);
						var transStr = attrs[recurseTakeover], transVars;
						if(child){
							childScope = scope.$new(false);
							childScope.$depth = scope.$depth + 1;
							if(transStr){
								transVars = $parse(transStr)(scope);
								scopeTransfer(childScope, transVars);
							}
							$parse(childName).assign(childScope, child);

							// linking parent template and child scope.
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
