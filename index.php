<!DOCTYPE html>
  <head>
    <meta name="viewport" content="initial-scale=1.0" />
    <meta content="text/html;charset=UTF-8" />
    <link rel="stylesheet" href="style.php/main.scss" type="text/css" />
    <link rel="stylesheet" href="styles/fontawesome/css/all.css" type="text/css" />
    <link href="https://fonts.googleapis.com/css2?family=Berkshire+Swash&family=Roboto:wght@400;700;900&display=swap" rel="stylesheet">
    <title>Maps App</title>
  </head>
  <body>
    <div class="app col-12">
    <!-- Header -->
      <div class="header col-12">
      <!-- Link to creating new place -->
        <a class="nav-icon nav-plus" onclick="renderCreateForm()">
          <i class="fas fa-plus"></i>
        </a>
        <h1>Maps App</h1>
        <!-- Link to view favourites list -->
        <a class="nav-icon nav-heart" onclick="renderFavourites()">
          <i class="fas fa-heart"></i>
        </a>
      </div>
            <!-- Search Container -->
            <div class="search col-12">
        <form class="col-12" id="searchPlaceForm">
          <input type="text" id="txt" name="txt" placeholder="Search places by title..." />
          <input type="submit" value="Go" />
        </form>
      </div>
      <!-- Google Maps Container -->
      <div id="map"></div>
      <!-- Create Place Form -->
      <div class="content col-12" id="createPlaceCont" style="display:none;">
        <div class="content-header col-12">
          <h2>Create Place</h2>
          <i class="fas fa-times" id="createClose"></i>
        </div>
        <form class="col-12" id="createPlaceForm">
          <label class="col-4" for="title">
            Title
          </label>
          <input class="col-8" type="text" id="title" name="title" />
          <label class="col-4" for="desc">
            Description
          </label>
          <input class="col-8" type="text" id="desc" name="desc" />
          <label class="col-4" for="lat">
            Latitude
          </label>
          <input class="col-8" type="number" id="lat" step="0.000001" name="lat" />
          <label class="col-4" for="lgt">
            Longitude
          </label>
          <input class="col-8" type="number" id="lgt" step="0.000001" name="lgt" />
          <label class="col-4" for="hours">
            Hours
          </label>
          <input class="col-8" type="text" id="hours" name="hours" />
          <input type="submit" value="Create" />
        </form>
      </div>
      <!-- Edit Place Form (comes from template string) -->
      <div class="content col-12" id="editPlaceCont" style="display:none;">
      </div>
      <!-- Favourites List Form -->
      <div class="content col-12" id="favouritesCont" style="display:none;">
        <div class="content-header col-12">
          <h2>Favourites</h2>
          <i class="fas fa-times" id="favClose"></i>
        </div>
        <div class="col-12">
          <ul class="favourites-list" id="favList">
          </ul>
        </div>
      </div>
    </div>
    <script>
    // function to make get request for xml
      function getXML(url, callback) {
        const req = window.ActiveXObject ?
          new ActiveXObject('Microsoft.XMLHTTP'):
          new XMLHttpRequest;
        req.onreadystatechange = function() {
          if (req.readyState == 4) {
            req.onreadystatechange = null;
            callback(req, req.status);
          }
        };
        req.open('GET', url, true);
        req.send(null);
      }
    </script>
    <script src="./js/scripts.js"></script>
    <script async defer src="https://maps.googleapis.com/maps/api/js?key=AIzaSyBzjrFHdd3dtHrtfBfLq9dJFXcgU3Pxe8Q&callback=initMap" type="text/javascript">
    </script>
  </body>
</html>