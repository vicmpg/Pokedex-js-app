let pokemonList= [
    { name: 'Charmeleon', height: 0.7, type: ['Fire','Steel'] },
    { name: 'Blastoise', height: 1.6, type: ['Water','Ice'] },
    { name: 'Machop', height: 0.8, type: ['Rock'] }
];

for (let i = 0; i < pokemonList.length; i++){
    if (pokemonList[i].height <1){
        document.write("<p>"+ pokemonList[i].name + pokemonList[i].height +"</p>"+ ' Is a small pokemon');
    }else {
        document.write("<p>"+ pokemonList[i].name + pokemonList[i].height +"</p>"+  ' Wow, that is big!');
    }
}
