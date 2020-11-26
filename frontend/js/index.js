let url = "http://localhost:3000/api/cameras";
console.log(url);
let main = document.getElementById("main");

fetch(url) // Méthod qui permet de faire des "promise"
  .then(

    function(response) { // Test pour confirmer la connexion à l'API
      if (response.status !== 200) {
        console.log('Looks like there was a problem. Status Code: ' +
          response.status);
        return;
      }

      response.json().then(function(data) { // Si connexion au donnée réussi
        
        data.forEach(element=>{ // Création de contenu pour chaques éléments grace à une promesse
          
          setItem (element);
         

        });
      });
    }
  )

  .catch(function(err) { // Erreur de promesse
    console.log('Fetch Error :-S', err);
  });

function setItem (element) {
    let a = document.createElement('a');
    a.classList = "articleLink";
    a.href = "produit.html?id="+element._id;

    let name = document.createElement("h2");
    name.classList = "index-a";
    name.innerHTML = element.name;
      
    let img = document.createElement("img");
    img.classList = "index-img";
    img.setAttribute("alt", "Image d'appareil photo");
    img.innerHTML = element.imageUrl;
    img.src=element.imageUrl;
  
    let p = document.createElement('p');
    p.classList = "index-description";
    p.innerHTML = element.description;
  
    let price = document.createElement("p");
    price.innerHTML = element.price + " €";
    price.classList = "index-price";
  
    let article = document.createElement('article');
    article.classList = "index-article";
  
    
    a.appendChild(name);
    a.appendChild(img);
    a.appendChild(p);
    a.appendChild(price);
    article.appendChild(a);
    main.appendChild(article);
}