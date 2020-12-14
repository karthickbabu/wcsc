"use strict";

// json data
var sky_centers_api = "https://karthickbabu.github.io/wcsc/sky-centers.json";

function loadSkyCentersTable() {
  $.ajax({
    url: sky_centers_api,
    method: 'GET',
    cache: true,
    type: "text/json"
  })
    .done(function (evt) {

      // Set timeout for lazy loading
      setTimeout(function () {
        var result = evt;
        
        var tableHtml = '<h3>Nearby locations</h3>';
        if (result.length > 0) {
          tableHtml += '<table class="table table-striped mt32 skycenters-list">'
            + '<thead>'
            + '<tr>'
            + '<th>Name</th>'
            + '<th>City</th>'
            + '<th>State</th>'
            + '<th>Address</th>'
            + '</tr>'
            + '</thead>'
            + '<tbody>';

          for (var j = 0; j < result.length; j++) {
            tableHtml += '<tr>'
              + '<td>' + result[j].Name + '</td>'
              + '<td>' + result[j].City + '</td>'
              + '<td>' + result[j].State + '</td>'
              + '<td>' + result[j].Address + '</td>'
              + '</tr>';
          }
          tableHtml += '</tbody></table>';
        } else {
          tableHtml += '<p>Sorry no centers are currently available at this location.</p>';
        }

        // Set all content
        $('.table-skycenters').html(tableHtml);
      }, 1000);
    })
    .fail(function () {
      alert('Error : Failed to reach API Url or check your connection');
    })
    .then(function (evt) {
    });
};

function setupFilterSkyCentersTable() {
  $(".search-input").on("keyup", function() {
    var value = $(this).val().toLowerCase();
    $(".skycenters-list tr").filter(function() {
      $(this).toggle($(this).text().toLowerCase().indexOf(value) > -1)
    });
  });
}

$(document).ready(function() {
  loadSkyCenters();
  setupFilterSkyCentersTable();
});
