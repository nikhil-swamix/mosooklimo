(function (a) {
    a.fn.replaceTagName = function (f) {
        var g = [],
            h = this.length;
        while (h--) {
            var k = document.createElement(f),
                b = this[h],
                d = b.attributes;
            for (var c = d.length - 1; c >= 0; c--) {
                var j = d[c];
                k.setAttribute(j.name, j.value)
            }
            k.innerHTML = b.innerHTML;
            a(b).after(k).remove();
            g[h - 1] = k
        }
        return a(g)
    }
})(window.jQuery);


function tagReplacer(currenttag,newtag){
	var NewElement = $("<"+newtag+"/>");
	$.each(currenttag.attributes, function(i, attrib){
	  $(NewElement).attr(attrib.name, attrib.value);
	});
	// Replace the current element with the new one and carry over the contents
	$(currenttag).replaceWith(function () {
	  return $(NewElement).append($(this).contents());
	});
}


$.getJSON('/utilities/city-data.json', {}, function(json, textStatus) {
	// $('input[type="city"]').replaceTagName("select");
	mytag=$('input[type="city"]')

	citySuperAutoCompleteOptions=[]


	for (let k in json ){
		citySuperAutoCompleteOptions=[...citySuperAutoCompleteOptions,...json[k]]
	}	
	console.log(citySuperAutoCompleteOptions)
	$( "#activeCity" ).autocomplete({
		source: citySuperAutoCompleteOptions,
		minLength: 2,
	});

});	
