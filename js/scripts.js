let pokemonRepository = (function () {
    let pokemonList = [

        { 
            name: 'Charmeleon',
            height: 0.7, 
            type: ['Fire','Steel'] 
        },
        { 
            name: 'Blastoise', 
            height: 1.6, 
            type: ['Water','Ice'] 
        },
        { 
            name: 'Machop', 
            height: 0.8, 
            type: ['Rock'] 
        }
    ];

    function add(pokemon) {
        pokemonList.push(pokemon);
      }
    
      function getAll() {
        return pokemonList;
      }
    
      return {
        add: add,
        getAll: getAll
      };
})();
console.log(pokemonRepository.getAll());
pokemonRepository.add({ name: 'Pikachu' });
console.log(pokemonRepository.getAll());