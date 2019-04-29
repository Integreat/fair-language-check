
$('#cities').on('change', function() {
    $.getJSON( "https://cms-test.integreat-app.de/"+ this.value +"/de/wp-json/extensions/v3/pages", function( data ) {
		var options = "";
        $.each( data, function( key, page ) {
            options = options.concat( "<option value='" + page.url + "'>" + page.title + "</option>" );
        });
        $('#pages').html(options);
        localStorage.setItem("ig-pages", data);
    });
});

$( document ).ready(function() {
    $.getJSON( "https://cms-test.integreat-app.de/wp-json/extensions/v3/sites", function( data ) {
        var options = "";
        $.each( data, function( key, site ) {
            options = options.concat( "<option id='" + site.path + "'>" + site.name + "</option>" );
        });
        $('#cities').html(options);
    });
});

