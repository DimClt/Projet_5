let url = "http://localhost:3000/api/cameras";
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
        
        data.forEach(element=>{ // Création de contenu pour chaques éléments
          let a = document.createElement("a");
          a.classList = "index-a";
          a.innerHTML = element.name;
          a.href = "produit.html?id="+element._id;

          let aImg = document.createElement("a");
          aImg.href = "produit.html?id="+element._id;

          let img = document.createElement("img");
          img.classList = "index-img";
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

          article.appendChild(a);
          article.appendChild(aImg);
          aImg.appendChild(img);
          article.appendChild(p);
          article.appendChild(price);

          main.appendChild(article);
         
        })
      });
    }
  )
  .catch(function(err) { // Erreur de connexion à l'API
    console.log('Fetch Error :-S', err);
  });