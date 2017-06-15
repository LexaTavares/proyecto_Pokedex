var imagenes = [{

    "logo": "img/Bulbasaur.png"
  },
  {

    "logo": "img/Ivysaur.png"
  },
  {

    "logo": "img/Venusaur.png"
  },
  {

    "logo": "img/Charmander.png"
  },
  {

    "logo": "img/Charmaleon.png"
  },
  {

    "logo": "img/Charizard.png"
  },
  {

    "logo": "img/squirtle.png"
  },
  {

    "logo": "img/Wartortle.png"
  },
  {

    "logo": "img/Blastoise.png"
  },
  {

    "logo": "img/Caterpie.png"
  },
  {

    "logo": "img/Metapod.png"
  },
  {

    "logo": "img/Butterfree.png"
  },
  {

    "logo": "img/Weedle.png"
  },
  {

    "logo": "img/Kakuna.png"
  },
  {

    "logo": "img/Beedrill.png"
  },
  {

    "logo": "img/Pidgey.png"
  },
  {

    "logo": "img/Pidgeotto.png"
  },
  {

    "logo": "img/Pidgeot.png"
  },
  {

    "logo": "img/Rattata.png"
  },
  {

    "logo": "img/Raticate.png"
  }
];
var plantilla =
  '<div class="card-image tarjeta">' +
  '<img src="__logo__">' +
  '<h4>__nombre__</h4>' +
  '<a class="waves-effect waves-light btn boton" href="#modal1" data-url="__url__">Info</a>'
'</div>';

var plantillaDetalle = '<h4>"__nombre__"</h4>' +
  '<div class="row">' +
  '<div class="col s6">' +
  '<img src="__logo__" class="img-100 vertical-align">' +
  '</div>' +
  '<div class="col s6">' +
  '<p><strong>Habitat :</strong>"__habitat__"</p>' +
  '<p><strong>Color :</strong>"__color__"</p>' +
  '<p><strong>Shape :</strong>"__shape__"</p>' +
  '</div>' +
  '</div>' +
  '</div>';

var mostrarPokemones = function(pokemones, imagenes) {
  var container = $(".pokemones")
  var vacio = "";
  pokemones.forEach(function(pokemon, i) {
    // console.log(i);
    vacio += plantilla.replace("__nombre__", pokemon.name).replace("__logo__", imagenes[i].logo)
      .replace("__url__", "http://pokeapi.co/api/v2/pokemon-species/" + (i + 1) + "/");
  });
  container.html(vacio);
};
var infoPokemon = function() {
  var divclass = $(".tarjeta");
  console.log(divclass);
  console.log(this);
  var imagen = divclass.find("img").attr('src');
  console.log(imagen);


  $.getJSON(this.dataset.url, function(response) {
    var habitat = response.habitat.name;
    var color = response.color.name;
    var shape = response.shape.name;
    var nombre = response.name;

    detalles({
      habitat: habitat,
      color: color,
      shape: shape,
      imagen: imagen,
      nombre: nombre
    });

  });

};

function detalles(detalle, imagenes) {
  var $modalDetalle = $('.modal-content');
  // console.log(habitat, color, shape,imagen, nombre);
  var nuevaPlantilla = plantillaDetalle.replace("__nombre__", detalle.nombre)
    .replace("__habitat__", detalle.habitat)
    .replace("__color__", detalle.color)
    .replace("__shape__", detalle.shape)
    .replace("__logo__", detalle.imagen);

  $modalDetalle.html(nuevaPlantilla);
};

function cargarPagina() {

  $('.modal').modal();
  $(document).on("click", ".boton", infoPokemon);
  $.getJSON("https://pokeapi.co/api/v2/pokemon/", function(response) {
    var pokemones = response.results;
    // console.log(response.results);
    mostrarPokemones(pokemones, imagenes);
    // console.log(pokemones);
  })
};


$(document).ready(cargarPagina);
