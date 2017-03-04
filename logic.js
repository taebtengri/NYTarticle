var authKey = "8866a387d64e4e9e82383ccbc13caac0";

var queryTerm = "";
var numResults = 0;
var startYear = 0;
var endYear = 0;

var queryURLBase = "http://api.nytimes.com/svc/search/v2/articlesearch.json?&api-key=" + authKey;


function runQuery(numArticles, queryURL) {

  $.ajax({
    url: queryURL,
    method: "GET"
  }).done(function(NYTData) {

    
    console.log("------------------");
    console.log(queryURL);
    console.log("------------------");
    console.log(numArticles);
    console.log(NYTData);

    $("#well-section").empty();

    for (var i = 0; i < numArticles; i++) {

      var wellSection = $("<div>");
      wellSection.addClass("well");
      wellSection.attr("id", "article-well-" + i);
      $("#well-section").append(wellSection);

      if (NYTData.response.docs[i].headline !== "null") {
        console.log(NYTData.response.docs[i].headline.main);
        $("#article-well-" + i)
          .append("<h3>" + NYTData.response.docs[i].headline.main + "</h3>");
      }

      if (NYTData.response.docs[i].byline && NYTData.response.docs[i].byline.original) {
        console.log(NYTData.response.docs[i].byline.original);
        $("#article-well-" + i).append("<h5>" + NYTData.response.docs[i].byline.original + "</h5>");
      }


      if (NYTData.response.docs[i].multimedia.length !== 0) {
        $("#article-well-" + i).append("<img src=http://nytimes.com/" + NYTData.response.docs[i].multimedia[0].url + ">");
      }
      
            
      if (NYTData.response.docs[i].section_name !== null || NYTData.response.docs[i].section_name !== "false") {
        $("#article-well-" + i).append("<h5>" + NYTData.response.docs[i].section_name + "</h5>");
      }
      
      $("#article-well-" + i).append("<h5>" + NYTData.response.docs[i].pub_date + "</h5>");
      $("#article-well-" + i)
        .append(
          "<a href=" + NYTData.response.docs[i].web_url + ">" +
          NYTData.response.docs[i].web_url + "</a>"
        );

      console.log(NYTData.response.docs[i].section_name);
      console.log(NYTData.response.docs[i].pub_date);
      console.log(NYTData.response.docs[i].web_url);
    }

  })
 /* .fail(function() {
    console.assert(assertion, message);

  }); */



  


}



$("#search-btn").on("click", function(event) {
  
  event.preventDefault();

  queryTerm = $("#search").val().trim();

  var newURL = queryURLBase + "&q=" + queryTerm;

  numResults = $("#num-records").val();

  startYear = $("#start-year").val().trim();
  endYear = $("#end-year").val().trim();

  if (parseInt(startYear)) {

    startYear += "0101";

    newURL = newURL + "&begin_date=" + startYear;
  }

  if (parseInt(endYear)) {

    endYear += "0101";

    newURL = newURL + "&end_date=" + endYear;
  }

  runQuery(numResults, newURL);

});

