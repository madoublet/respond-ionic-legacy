Respond CMS App (version 0.1)
==============================

A Proof-of-Concept app that demonstrates how a Respond CMS site can be built into a native app using the Ionic App Framework (ionicframework.com).  This allows Respond sites to be quickly built into native apps for mobile frameworks such as iOS, Android, and Windows Phone 8.

This is a not a complete implementation of Respond CMS.

In version 0.1:
- Reading a menu created in the CMS into the slideout navigation (see setup)
- Specifying a default page as the home
- Basic rendering of pages created in the CMS
- Basic rendering of forms built in the CMS
- Displaying blog entries
- Displaying images
- Coverting content links into app links

Setup:
- Specify the menu (e.g. primary), language, and app url in the Setup factory (www/js/factories.js)
```
// setup factory (basic setup params
.factory('Setup', function(){
	
	return {
		menu: 'primary',
		language: 'en-us',
		appUrl: 'http://path-to-respond-site.com/'  // the url of your site
	}
	
})
```

- Specify the PageUniqId for the default page for the urlRouterProvider (www/js/app.js)
```
$urlRouterProvider.otherwise('/app/page/[pageUniqId]');
```