// function to render Google Maps
function initMap() {
  const map = new google.maps.Map(document.getElementById('map'), {
    center: new google.maps.LatLng(66.793800, 23.986931),
    zoom: 4
  });

  const infoWindow = new google.maps.InfoWindow;

  // get database data for saved places
  getXML('./places/read.php', function(data) {
    const xml = data.responseXML;
    const markers = xml.documentElement.getElementsByTagName('marker');

    const favouritesList = document.createElement('ul');
    favouritesList.classList.add('favourites-list');

    Array.prototype.forEach.call(markers, function(markerElem) {
      let id = markerElem.getAttribute('id');
      let title = markerElem.getAttribute('title');
      let desc = markerElem.getAttribute('desc');
      let lat = markerElem.getAttribute('lat');
      let lgt = markerElem.getAttribute('lgt');
      let hours = markerElem.getAttribute('hours');
      let fav = markerElem.getAttribute('fav');

      const point = new google.maps.LatLng(
        parseFloat(markerElem.getAttribute('lat')),
        parseFloat(markerElem.getAttribute('lgt'))
      );

      // info window content
      const infowincontent = document.createElement('div');
      infowincontent.classList.add('map-info');

      const info = document.createElement('div');
      info.classList.add('info-texts');
      infowincontent.appendChild(info);
      infowincontent.appendChild(document.createElement('br'));

      const strong = document.createElement('strong');
      strong.textContent = title;
      info.appendChild(strong);

      const text = document.createElement('text');
      text.textContent = desc;
      info.appendChild(text);

      // box where edit & delete icons place
      const icons = document.createElement('div');
      icons.classList.add('info-icons');
      infowincontent.appendChild(icons);
      infowincontent.appendChild(document.createElement('br'));

      const update = document.createElement('i');
      update.classList.add('fas', 'fa-pen');
      update.setAttribute('id', id);
      icons.appendChild(update);
      update.addEventListener('click', () => renderEditForm(id));

      const fvr = document.createElement('i');
      fvr.classList.add('fas', 'fa-heart');
      fvr.setAttribute('fav', fav);

      if (fav == 1) {
        fvr.addEventListener('click', () => addToFavourites(id));
        fvr.classList.remove('grey');
        fvr.classList.add('red');
      } else {
        fvr.addEventListener('click', () => removeFromFavourites(id));
        fvr.classList.remove('red');
        fvr.classList.add('grey');
      }

      icons.appendChild(fvr);

      const remove = document.createElement('i');
      remove.classList.add('fas', 'fa-trash');
      remove.setAttribute('id', 'removePlace');
      remove.addEventListener('click', () => removePlace(id, infoWindow, marker));
      icons.appendChild(remove);

      // set marker
      const marker = new google.maps.Marker({
        map: map,
        position: point
      });

      marker.addListener('click', () => {
        infoWindow.setContent(infowincontent);
        infoWindow.open(map, marker);
      });
    });
  });
}

// function to render favourites and toggle view, same time closing other views
function renderFavourites() {
  const favouritesCont = document.getElementById('favouritesCont');
  const favouritesList = document.getElementById('favList');
  
  createPlaceCont.style.display = 'none';
  editPlaceCont.style.display = 'none';
  favouritesCont.style.display = (favouritesCont.style.display == 'none') ? 'flex' : 'none';

  const xhr = new XMLHttpRequest;
    let url = './favourites/read.php';
    xhr.onreadystatechange = () => {
      const status = xhr.status;
      if (status === 0 || (status >= 200 && status < 400)) {
        console.log(xhr.responseText);
        favouritesList.innerHTML = xhr.responseText;
      } else {
        console.log('Error!');
      }
    };
    xhr.open('GET', url, true);
    xhr.send();

  // close view from icon
  favClose.addEventListener('click', () => {
    favouritesCont.style.display = 'none';
  });
}

// function to add place to favourites
function addToFavourites(id) {
  let data = new FormData();
  data.append('id', id);
  const xhr = new XMLHttpRequest;
    let url = './favourites/update.php';
    xhr.onreadystatechange = () => {
      const status = xhr.status;
      if (status === 0 || (status >= 200 && status < 400)) {
        console.log(xhr.responseText);
      } else {
        console.log('Error!');
      }
    };
    xhr.open('POST', url, true);
    xhr.send(data);
}

// function to remove place from favourites
function removeFromFavourites(id) {
  let data = new FormData();
  data.append('id', id);
  const xhr = new XMLHttpRequest;
    let url = './favourites/delete.php';
    xhr.onreadystatechange = () => {
      const status = xhr.status;
      if (status === 0 || (status >= 200 && status < 400)) {
        console.log(xhr.responseText);
      } else {
        console.log('Error!');
      }
    };
    xhr.open('POST', url, true);
    xhr.send(data);
    // refresh map
    initMap();
}

// function to remove current place
function removePlace(id, infoWindow, marker) {
  let data = new FormData();
  data.append('id', id);
  const xhr = new XMLHttpRequest;
  let url = './places/delete.php';
  xhr.onreadystatechange = () => {
    const status = xhr.status;
    if (status === 0 || (status >= 200 && status < 400)) {
      console.log(xhr.responseText);
    } else {
      console.log('Error!');
    }
  };
  xhr.open('POST', url, true);
  xhr.send(data);
  // close info window and update map to view changes
  infoWindow.close(marker);
  initMap();
}

// function to render create place form and toggle view, same time closing other views
function renderCreateForm() {
  const createPlaceCont = document.getElementById('createPlaceCont');
  const createPlaceForm = document.getElementById('createPlaceForm');

  editPlaceCont.style.display = 'none';
  favouritesCont.style.display = 'none';
  createPlaceCont.style.display = (createPlaceCont.style.display == 'none') ? 'flex' : 'none';

  // close view form icon
  createClose.addEventListener('click', () => {
    createPlaceCont.style.display = 'none';
  });

  // make post request
  createPlaceForm.addEventListener('submit', (e) => {
    e.preventDefault();
    let data = new FormData();
    const xhr = new XMLHttpRequest;
    let title = document.getElementById('title').value;
    let desc = document.getElementById('desc').value;
    let lat = document.getElementById('lat').value;
    let lgt = document.getElementById('lgt').value;
    let hours = document.getElementById('hours').value;
    data.append('title', title);
    data.append('desc', desc);
    data.append('lat', lat);
    data.append('lgt', lgt);
    data.append('hours', hours);
    let url = './places/create.php';
    xhr.onreadystatechange = () => {
      const status = xhr.status;
      if (status === 0 || (status >= 200 && status < 400)) {
        console.log(xhr.responseText);
      } else {
        console.log('Error!');
      }
    };
    xhr.open('POST', url, true);
    xhr.send(data);
    // update map to view changes
    initMap();
    // close form
    createPlaceCont.style.display = 'none';
  });
}

// function to render form and creating template
function renderEditForm(id) {
  const editPlaceCont = document.getElementById('editPlaceCont');
  const editPlaceTemplate = ` <div class="content-header col-12">
                                <h2>Edit Place</h2>
                                <i class="fas fa-times" id="editClose"></i>
                                </div>
                                <form id="editPlaceForm" data-id=${id}>
                                <label class="col-4" for="title">
                                  Title
                                </label>
                                <input class="col-8" type="text" id="titleE" name="title" />
                                <label class="col-4" for="desc">
                                  Description
                                </label>
                                <input class="col-8" type="text" id="descE" name="desc" />
                                <label class="col-4" for="lat">
                                  Latitude
                                </label>
                                <input class="col-8" type="number" id="latE" step="0.000001" name="lat" />
                                <label class="col-4" for="lgt">
                                  Longitude
                                </label>
                                <input class="col-8" type="number" id="lgtE" step="0.000001" name="lgt" />
                                <label class="col-4" for="hours">
                                  Hours
                                </label>
                                <input class="col-8" type="text" id="hoursE" name="hours" />
                                </br>
                                <input type="submit" value="Save" />
                              </form>`;

  editPlaceCont.innerHTML = editPlaceTemplate;
  const editPlaceForm = document.getElementById('editPlaceForm');

  createPlaceCont.style.display = 'none';
  favouritesCont.style.display = 'none';
  editPlaceCont.style.display = (editPlaceCont.style.display == 'none') ? 'flex' : 'none';

  // make post request
  editPlaceForm.addEventListener('submit', (e) => {
    e.preventDefault();
    let data = new FormData();
    const placeId = editPlaceForm.dataset.id;
    let title = document.getElementById('titleE').value;
    let desc = document.getElementById('descE').value;
    let lat = document.getElementById('latE').value;
    let lgt = document.getElementById('lgtE').value;
    let hours = document.getElementById('hoursE').value;
    data.append('id', placeId);
    data.append('title', title);
    data.append('desc', desc);
    data.append('lat', lat);
    data.append('lgt', lgt);
    data.append('hours', hours);
    const xhr = new XMLHttpRequest;
    let url = './places/update.php';
    xhr.onreadystatechange = () => {
      const status = xhr.status;
      console.log(status)
      if (status === 0 || (status >= 200 && status < 400)) {
        console.log(xhr.responseText);
      } else {
        console.log('Error!');
      }
    };
    xhr.open('POST', url, true);
    xhr.send(data);
    // close form
    editPlaceCont.style.display = 'none';
    // update map to view changes
    initMap();
  });

  // close view from icon
  editClose.addEventListener('click', () => {
    editPlaceCont.style.display = 'none';
  });
}

// function to search places by title
const searchPlaceForm = document.getElementById('searchPlaceForm');

searchPlaceForm.addEventListener('submit', (e) => {
  e.preventDefault();
  let data = new FormData();
  data.append('txt', txt);
  const xhr = new XMLHttpRequest;
    let url = 'http://localhost:8888/maps-app/places/search.php';
    xhr.onreadystatechange = () => {
      const status = xhr.status;
      if (status === 0 || (status >= 200 && status < 400)) {
        console.log(xhr.responseText);
      } else {
        console.log('Error!');
      }
    };
    xhr.open('GET', url, true);
    xhr.send(data);
    initMap();
})