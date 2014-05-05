angular.module('respond.factories', [])

// setup factory (basic setup params
.factory('Setup', function(){
	
	return {
		menu: 'primary',
		language: 'en-us',
		appUrl: 'http://path-to-respond-site.com'  // the url of your site
	}
	
})

// menu factory
.factory('Menu', function($http, Setup){
	
	var menu = {};
	
	menu.retrieve = function(callback){
		$http.get(Setup.appUrl + 'api/menu/list/' + Setup.menu)
			.success(callback);
	}
	
	return menu;
	
})

// page factory
.factory('Page', function($http, Setup){
	
	var page = {};
	
	page.retrieve = function(id, callback){
	
		// update id
		id = id.replace(/\./g, '/');
		
		// post params
		var params = {
			pageUniqId: id,
			language: Setup.language,
			prefix: ''  
			};
		
		// set post to URL Encoded
		$http.defaults.headers.post['Content-Type'] = 'application/x-www-form-urlencoded; charset=UTF-8';
	
		// post
		$http.post(Setup.appUrl + 'api/page/published/featured', $.param(params))
			.success(callback);
	}
	
	return page;
	
})

// list factory
.factory('List', function($http, Setup){
	
	var list = {};
	
	list.retrieve = function(id, label, display, pageTypeUniqId, descLength, pageSize, orderBy, category, callback){
		
		if(descLength == undefined)descLength = 1000;
		
		// post params
		var params = {
			id: id,
			label: label,
			display: display,
			pageTypeUniqId: pageTypeUniqId, 
			descLength: descLength,
			pageSize: pageSize, 
			orderBy: orderBy, 
			category: category,
			language: Setup.language, 
			prefix: '',
			page: 0
			};
			
		// set URL based on display
		var url = 'api/page/published/list';
		
		if(params.display == 'blog'){
	        url = 'api/page/published/blog';
	    }
	    
		// set post to URL Encoded
		$http.defaults.headers.post['Content-Type'] = 'application/x-www-form-urlencoded; charset=UTF-8';
	
		// post
		$http.post(Setup.appUrl + url, $.param(params))
			.success(callback);
		
	}
	
	return list;

});

