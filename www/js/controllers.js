angular.module('respond.controllers', [])

// app controller, builds the menu
.controller('AppCtrl', function($scope, $state, Menu) {
	
	// get menu json
	$scope.test = 'hello';
	$scope.menu = [];
	
	// only show the menu for root items
	$scope.showMenu = function(){
	
		if(location.href.indexOf('/nested/') == -1){
			return true;
		}
		else{
			return false;
		}
				
	};
	
	// get the menu from the factory
	Menu.retrieve(function(data){
	
		// #debug
		console.log('#DEBUG [Menu.retrieve] ' + data);
	
		$scope.menu = data;
		
		});
	

})

// page controller
.controller('PageCtrl', function($scope, $sce, $stateParams, Page, List, Setup) {

	$scope.id = $stateParams.id;
	$scope.html = 'Loading...';
	
	
	
	// get the page from the factory
	Page.retrieve($scope.id, function(data){
		
		// #debug
		console.log('#DEBUG [Page.retrieve] ' + data);
		
		// parse the data coming back from the factory
		var html = respond.Parse.HTML(data, Setup.appUrl);

		// setup factories for lists
		var $html = $(html);
		
		// find lists
		var lists = $html.find('.respond-list');
		
		// walk through lists
		for(x=0; x<lists.length; x++){
			
			var $list = $(lists[x]);
			
			var id = $list.attr('data-id');
			var display = $list.attr('data-display');
			var label = $list.attr('data-label');
			var pageTypeUniqId = $list.attr('data-pagetypeid');
			var descLength = $list.attr('data-desclength');
			var pageSize = $list.attr('data-length');
			var orderBy = $list.attr('data-orderby');
			var category = $list.attr('data-category');
			
			var context = $scope;
			
			console.log('#DEBUG [PageCtrl scope]');
			console.log(context);
			
			// get the list from the factor
			List.retrieve(id, label, display, pageTypeUniqId, descLength, pageSize, orderBy, category, function(data){
			
				// #debug
				console.log('#DEBUG [List.retrieve]');
				console.log(data);
				
				console.log('#DEBUG [List.context]');
				console.log(context);
			
				context[id] = data;
				
				});
			
		}
		
		// update the html scope
		$scope.html = html;
	
	});
	
  
})

.controller('HomeCtrl', function($scope) {
  
});


