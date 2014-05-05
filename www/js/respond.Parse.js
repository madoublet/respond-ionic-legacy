/*
	Handles parsing of page data returned by Respond services
*/
var respond = respond || {};

respond.Parse = function(){};

respond.Parse.HTML = function(html, url){
	
	var $data = $('<div class="container"></div>').append(html);
	
	// get columns
	var cols = $data.find('.col-md-4').addClass('col-33');
	
	// remove block (has a different meaning in ionic)
	var cols = $data.find('.block').removeClass('block');
	
	// get forms
	var forms = $data.find('.respond-form');
	
	// walk through forms
	for(y= 0; y<forms.length; y++){
	
		// parse the form data
		var html = respond.Parse.Form(forms[y]);
			
		// replace form with parsed data
		$(forms[y]).html(html);
			
	}
	
	// get lists
	var lists = $data.find('.respond-list');
	
	// walk through lists
	for(y= 0; y<lists.length; y++){
	
		// parse the list data
		var html = respond.Parse.List(lists[y], y);
			
		// replace form with parsed data
		$(lists[y]).replaceWith(html);
			
	}
	
	// get images
	var images = $data.find('.o-image img, .l-image img, .r-image img');
	
	for(y=0; y<images.length; y++){
		
		var src= $(images[y]).attr('src');
		
		$(images[y]).attr('src', url + '/' + src);
		
	}
	
	// get links
	var links = $data.find('a');
	
	for(y=0; y<links.length; y++){
	
		var href = $(links[y]).attr('href');
		
		// leave static links alone
		if(href.indexOf('http://') === -1){
			
			var href = 'lookup:'+href.replace(/\//g, '.');
			
			$(links[y]).attr('href','');
			$(links[y]).attr('ng-href','#/app/page/'+href);
			
		}
		
	}
	
	
	// remove loading (handled within the App)
	$data.find('.list-loading').remove();
	
	// remove paging for now
	$data.find('.page-results').remove();
  			
	return $data.html();
	
}

// builds list bindings
respond.Parse.List = function(data, i){

	var $data = $(data);

	var id = 'list'+i;
	var display = $(data).attr('data-display');
	var label = $(data).attr('data-label');
	var pagetypeid = $(data).attr('data-pagetypeid');
	var descLength = $(data).attr('data-desclength');
	var length = $(data).attr('data-length');
	var orderby = $(data).attr('data-orderby');
	var category = $(data).attr('data-category');
	
	// create container
	var html = '<div class="respond-list" ng-repeat="list in ' + id + '"' 
		+ 'data-id="' + id + '" '
		+ 'data-display="' + display + '" '
		+ 'data-label="' + label + '" '
		+ 'data-pagetypeid="' + pagetypeid + '" '
		+ 'data-desclength="' + descLength + '" '
		+ 'data-length="' + length + '" '
		+ 'data-orderby="' + orderby + '" '
		+ 'data-category="' + category + '"'
		+ '>';
	
	
	// create bindings for different list types
	if(display == 'blog'){
		html += '<div class="content" compile="list.Content"></div>';
	}
	else{
		html += '{{list.Name}}'; // temp
	}
		
	html += '</div>';
	
	return html;
	
}

// builds parameters for the API call
respond.Parse.Form = function(data){

	var $data = $(data);

	var html = '<div class="list">'; 	// ionic equivalent of the form
  			
	var controls = $data.find('.form-group, button');
	
	for(x=0; x<controls.length; x++){
	
		var control = $(controls[x]);
		
		// get text from the label
		var label = $(control.find('label').get(0)).text().trim();
		
		if(label != ''){
			html +=  '<div class="item item-divider">' + label + '</div>';
		}
		
		// get type of control
		var type = control.attr('data-type');
	
		// textboxes	
		if(type == 'text'){
			
			// get id
			var id = control.find('input[type=text]').attr('id');
			var placeholder = control.find('input[type=text]').attr('placeholder');
			
			// set placeholder
			if(placeholder == null || placeholder == undefined){
				placeholder = '';
			}
			
			// create ionic equivalent of textbox
			html += '<label class="item item-input">' +
		   		'<input id="'+id+'" type="text" placeholder="'+placeholder+'">' +
		   		'</label>';			  			
		}
		
		// textarea	
		if(type == 'textarea'){
			
			// get id
			var id = control.find('textarea').attr('id');
			
			// create ionic equivalent of textbox
			html += '<label class="item item-input">' +
		   		'<input id="'+id+'" type="text">' +
		   		'</label>';			  			
		}
		
		// radio list
		if(type == 'radiolist'){
			
			var radios = control.find('.radio');
			
			for(z=0; z<radios.length; z++){
			
				var radio = $(radios[z]);
			
				var radiolabel = radio.text();
				var name = radio.find('input[type=radio]').attr('name');
				var value = radio.find('input[type=radio]').attr('value');
			
	  			html += '<label class="item item-radio">' +
						'<input type="radio" name="'+name+'" value="'+value+'">' +
						'<div class="item-content">' +
						radiolabel + 
						'</div>' +
						'<i class="radio-icon ion-checkmark"></i>' +
						'</label>';
					
			}
			
		}
		
	}
	// end find .controls
	
	html += '</div>';
	
	// get button text
	var buttontext = $data.find('button').text();
	
	// add the button
	html += '<button class="button button-block">'+buttontext+'</button>';

	return html;
    
}