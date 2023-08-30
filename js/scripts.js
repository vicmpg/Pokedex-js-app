//IIFE: Pokemon Repository Listing
// adding list of data entries
let pokemonRepository = (function () {
  let pokemonList = [];
  let apiUrl = 'https://pokeapi.co/api/v2/pokemon/?limit=150';
  let modalContainer = document.querySelector('#modal-container');

// functions to add & getAll Pokémon
  function add(pokemon) {
    pokemonList.push(pokemon);
  }

  function getAll() {
    return pokemonList;
  }

// function to fetch list from API
  function loadList() {
    return fetch(apiUrl).then(function (response) {
      return response.json();
    }).then(function (json) {
      json.results.forEach(function (item) {
        let pokemon = {
          name: item.name,
          detailsUrl: item.url
        };
        add(pokemon);
      });
    }).catch(function (e) {
      console.error(e);
    })
  }

// function to trigger showDetails function
  function addListItem(pokemon) {
    let interface = document.querySelector('.pokemon-list');
    let listItem = document.createElement('li');
    let button = document.createElement('button');
    button.innerText = pokemon.name;
    button.classList.add('pokemon-button');
    listItem.appendChild(button);
    interface.appendChild(listItem);
    button.addEventListener('click', function() {
      showDetails(pokemon);
  })
  }

  function loadDetails(item) {
   let url = item.detailsUrl;
   return fetch(url).then(function (response) {
     return response.json();
   }).then(function (details) {
     // adds details to the item
     item.imageUrl = details.sprites.front_default;
     item.height = details.height;
     item.types = details.types;
   }).catch(function (e) {
     console.error(e);
   });
 }

 // function to show modal
  function showModal(pokemon) {
    let modalContainer = document.querySelector('#modal-container');
    modalContainer.innerHTML = '';

    let modal = document.createElement('div');
    modal.classList.add('modal');

    let closeButtonElement = document.createElement('button');
    closeButtonElement.classList.add('modal-close');
    closeButtonElement.innerText = 'Close';
    closeButtonElement.addEventListener('click', hideModal);

    let text = pokemon.name;
		let titleElement = (document.innerText = text);

		let heightElement = document.createElement('p');
		heightElement.innerText = 'Height: ' + pokemon.height;

		let weightElement = document.createElement('p');
		weightElement.innerText = 'Weight: ' + pokemon.weight;

		let typeElement = document.createElement('p');
		typeElement.innerText = 'Types: ';

		pokemon.types.forEach((type, numberOfTypes) => {
			numberOfTypes = pokemon.types.pokemon;

			if (numberOfTypes === 1) {
				typeElement.innerText += type.type.name;
			} else {
				typeElement.innerText += type.type.name + ' ';
			}

    });

      let imageElement = document.createElement('img');
  		imageElement.classList.add('modal-image');
  		imageElement.src = pokemon.imageUrl;

  		modal.append(titleElement);
  		modal.append(imageElement);
  		modal.append(heightElement);
  		modal.append(weightElement);
  		modal.append(typeElement);
      modal.append(closeButtonElement);
      modalContainer.append(modal);

      modalContainer.classList.add('is-visible');
  }

  // function to show details of selected pokémon
   function showDetails(pokemon) {
   loadDetails(pokemon).then(function () {
     showModal(pokemon);
   });
  }

    // function to hide modal
    function hideModal() {
      let modalContainer = document.querySelector('#modal-container');
      modalContainer.classList.remove('is-visible');
  }

    // closing modal when escape is pressed
    window.addEventListener('keydown', (e) => {
      let modalContainer = document.querySelector('#modal-container');
      if (e.key === 'Escape' && modalContainer.classList.contains('is-visible')) {
        hideModal();
    }
  });

    modalContainer.addEventListener('click', (e) => {
    // closing only if the user clicks directly on the overlay
      let target = e.target;
      if (target === modalContainer) {
        hideModal();
    }
  });

// all accessible functions in IIFE
  return {
    add: add,
    getAll: getAll,
    addListItem: addListItem,
    loadList: loadList,
    loadDetails: loadDetails,
    showDetails: showDetails
  };
})();

pokemonRepository.loadList().then(function() {
  pokemonRepository.getAll().forEach(function(pokemon){
    pokemonRepository.addListItem(pokemon);
  });
});