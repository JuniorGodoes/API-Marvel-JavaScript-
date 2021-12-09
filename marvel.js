const timeStamp = '1583370112'
const apikey = '5c2c036b8e4e1cc3b24397ca6faba391'
const md5 = 'd7e1324a58b49ce25e7fcdc217531a16'

const next = document.getElementById('next-page');
const last = document.getElementById('last-page');
const divHero = document.querySelector('div#herois');
let nameHeros = []
let srcImages = []
let events = []
let pag_number = 1  


function atualizar(){
    fetch(`http://gateway.marvel.com/v1/public/characters?ts=1583370112&apikey=5c2c036b8e4e1cc3b24397ca6faba391&hash=d7e1324a58b49ce25e7fcdc217531a16`
    ).then((response) => {
        return response.json();
    }).then((jsonparsed) => {
        
        jsonparsed.data.results.forEach(element => {
            const srcImage = element.thumbnail.path + '.' + element.thumbnail.extension
            const nameHero = element.name
            let nameSerie = []
            let nameEvent = []
            
            srcImages.push(srcImage)
            nameHeros.push(nameHero)

            let qtdeS = element.series.items.length
            let qtdeE = element.events.items.length
    
            for(let pos = 0; pos < qtdeS && pos <= 2; pos++){
                let serie = element.series.items[pos].name
                nameSerie.push(serie)
            }
            for(let pos = 0; pos < qtdeE && pos + qtdeS <= 2; pos++){
                let event = element.events.items[pos].name
                nameEvent.push(event)
            }
            let event = `${nameSerie}, ${nameEvent}`

            events.push(event)

        });

        execute(nameHeros, 10, pag_number);
    })
}

atualizar();

let nameBack = nameHeros
let imageBack = srcImages
let eventsBack = events


document.getElementById('NameBusca').addEventListener("keyup", function (){
    let busca = document.getElementById('NameBusca').value;
    nameHeros = nameBack
    srcImages = imageBack
    events = eventsBack

    let newHeros = []
    let newImage = []
    let newEvent = []   

    document.querySelector('div#herois').innerHTML = "";

    for(j = 0; j < nameHeros.length; j++){

        if(nameHeros[j].indexOf(busca) >= 0){
            newHeros.push(nameHeros[j])
            newImage.push(srcImages[j])
            newEvent.push(events[j])
        }
    }

    nameHeros = newHeros
    srcImages = newImage
    events = newEvent

    execute(nameHeros, 10, pag_number);
})

function nextpage(){
    pag_number++
    document.querySelector('div#herois').innerHTML = "";
    execute(nameHeros, 10, pag_number)
}

function lastpage(){
    if (pag_number > 1){
        pag_number--
    }
    document.querySelector('div#herois').innerHTML = "";
    execute(nameHeros, 10, pag_number)
}

function execute(array, page_size, page_number){
    return array.forEach(function(nome, indice){
        if(indice >= ((page_number - 1) * page_size) && indice < (page_number * page_size)){
            createDivHero(srcImages[indice], nameHeros[indice], events[indice], divHero);
        }
    })
}

function createDivHero(srcImages, nameHeros, events, divToAppend){
    const divVo = document.createElement('div')
    const divPai = document.createElement('div')
    const divFilho = document.createElement('div')
    const divEvent = document.createElement('div')
    const textName = document.createElement('text')
    const img = document.createElement('img')

    textName.textContent = nameHeros
    divEvent.textContent = events
    img.src = srcImages

    divFilho.appendChild(img)
    divFilho.appendChild(textName)
    divPai.appendChild(divFilho)
    divVo.appendChild(divPai)
    divVo.appendChild(divEvent)
    divToAppend.appendChild(divVo)

    divPai.classList.add("personagem");
    divVo.classList.add("retangulo");
    divEvent.classList.add("events");
}