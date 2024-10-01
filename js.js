//endereço

const xmlURL = 'sistemap.xml'

function buscarxml() {

    fetch(xmlURL)
    .then(response => response.text())
    .then(data => {
        //converter texto em DOM
        let parser = new DOMParser();
        let xml = parser.parseFromString(data, "application/xml");
        //extrair os dados desejados
        let noticias = xml.getElementsByTagName("url");
        //elemento para exibir as noticias
        let manchetescontainer = document.getElementById("manchetes")
        manchetescontainer.innerHTML = ""; //limpa a div

        //vamos percorrer a lista usando o for
        for (let index = 0; index < noticias.length; index++) {
            let loc = noticias[i].getElementsByTagName("loc")[0].textContent

            //extrai a data de public
            let data_publi_element = noticias[i].getElementsByTagName("publication_data")[0];
            let data_publi = data_publi_element ? data_publi_element.textContent : 'data indisponivel';

            //verifica o titulo
            let titulo_element = noticias[i].getElementsByTagName("title")[0];
            let titulo = titulo_element ? titulo_element.textContent : "titulo_indisponivel";

            //interpolação de variaveis
            let montadiv = `
            <div class = 'noticias'> 
            <h2>${titulo}</h2>
            <p> publicado em > ${data_publi} </p>
            <a href='${loc}' target='_blank'>
            leia mais</p><hr>
            `
            manchetescontainer.innerHTML += montadiv;
        }
    }).catch(error =>{
        console.error('erro ao carregar o xml', error);
    })
}

window.onload = buscarxml;

