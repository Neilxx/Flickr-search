// Setting search function while onload page
window.onload = function(){ 
    document.getElementById("search").onclick = tagSearch; 
};

function tagSearch(tag){
    // Resetting page's background and the lacation of search bar
    document.getElementById("all").className = 'pure';
    document.getElementById("container").className = 'input-group col-xs-3 container';
    var output = '';
    var APIKey = '867bb25ffba077bdfab2c24a57969391';
    // Getting different tags depends in different situation: 
    // through searching bar or clicking tags
    if(this.id == 'search'){
        var keyword = document.getElementById("keyword").value;
        document.getElementById("keyword").value = null;
    }
    else{
        var keyword = tag.innerHTML;
        $('#myModal').modal('hide');
    }
    // API request using jQuery
    var flickrAPI = 'https://api.flickr.com/services/rest/?     method=flickr.photos.search&format=json&api_key='+ APIKey +
        '&tags=' + keyword + '&jsoncallback=?';
    $.getJSON(flickrAPI, function(data) {
        // Formatting all the searched img and put them in a div with id "gallery"
        if (data.stat == 'ok') {
            result = data.photos.photo;
            for (var i = 0; i < result.length; i++) {
                output += '<div style="text-align:center;padding:3px;" class="col-md-4"><img data-toggle="modal" onclick="setModal(this)" data-target="#myModal" style="height:150px" id="'+ result[i].id + '" src="http://farm' + result[i].farm + '.staticflickr.com/' + result[i].server + '/' + result[i].id + '_' + result[i].secret + '.jpg"></div>';
            }
        document.getElementById("gallery").innerHTML = output;
            }
        else {
        result = null;
        }
    });
}
// Using bootstrap modal
function setModal(image){
    var output = '';
    var APIKey = '867bb25ffba077bdfab2c24a57969391';
    var image_id = image.id;
    var flickrAPI = 'https://api.flickr.com/services/rest/?     method=flickr.photos.getInfo&format=json&api_key='+ APIKey +
        '&photo_id=' + image_id + '&jsoncallback=?';
    // API request using jQuery
    $.getJSON(flickrAPI, function(data) {
        if (data.stat == 'ok') {               
            result = data.photo.tags.tag;               
            for (var i = 0; i < result.length; i++) {
                output += '<a href="#" onclick="tagSearch(this)">'+ result[i]['_content'] + '</a></br>';

            }
        // Setting modal's contents
        document.getElementById("modal-body-image").innerHTML = '<img src="' + image.src + '">';
        document.getElementById("modal-title").innerHTML = data.photo.title._content;
        document.getElementById("modal-body-tags").innerHTML = output;
        }
        else {
        result = null;
        }
    });
}
