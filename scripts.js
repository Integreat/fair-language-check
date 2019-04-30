
$('#cities').on('change', function() {
    $.getJSON( "https://cms-test.integreat-app.de"+ this.value +"de/wp-json/extensions/v3/pages", function( data ) {
		var options = "";
        $.each( data, function( key, page ) {
            options = options.concat( "<option value='" + page.id + "'>" + page.title + "</option>" );
            localStorage.setItem("ig-page-" + page.id, page.content);
            localStorage.getItem("ig-page-" + page.id);
        });
        $('#pages').html(options);

    });
});

$( document ).ready(function() {
    $.getJSON( "https://cms-test.integreat-app.de/wp-json/extensions/v3/sites", function( data ) {
        var options = "";
        $.each( data, function( key, site ) {
            options = options.concat( "<option value='" + site.path + "'>" + site.name + "</option>" );
        });
        $('#cities').html(options);
    });
});

function parse_xml( xml ) {
    //console.log(xml);
    var element = xml.getElementsByTagName("results")[0];
    //console.log(element);
    var children = element.childNodes;
    //console.log(children);
    var html = "    <h2 class='text-center' style='width:100%; margin-top: 30px; margin-bottom: 30px;'>Ergebnis</h2>" +
    "<table class='table table-hover'><thead><tr><th>Typ</th><th>Wort</th><th>Kontext</th><th>Alterantiven</th></tr></thead><tbody>";
    var errors = Array.from(children);
    for (let error in errors) {
        var word = errors[error].querySelector('string').textContent;
        var type = errors[error].querySelector('description').textContent;
        var precontext = errors[error].querySelector('precontext').textContent;
        var suggestions = Array.from(errors[error].querySelector('suggestions').children);
        var options = [];
        for (let option in suggestions) {
            options.push( suggestions[option].textContent );
        }
        html = html + "<tr><td>" + type + "</td>" +
                      "<td>" + word + "</td>" +
                      "<td>" + precontext + "</td>" +
                      "<td>" + options.join(", ") + "</td></tr>";
    }
    html = html + "</tbody></table>";
    return html;
}

$('#check').on('click', function() {
    var page_id = $("#pages").val();
    var storage_key = "ig-page-" + page_id;
    var page = localStorage.getItem(storage_key);
    $.ajax({
        type: "POST",
        url: "https://fairlanguage-api-dev.dev-star.de/checkDocument",
        data: { 'data': page },
        success: function( data ) {
            $("#result").html(parse_xml(data));
            $("#result").css("display", "block");
        }
    });
});