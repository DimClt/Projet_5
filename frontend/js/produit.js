let main = document.getElementById("main");
let form = document.getElementById("lense-form");

//////////////////// Récuprération de l'id dans l'url de la page //////////////////

let queryString=window.location.search;
let id= new URLSearchParams(queryString).get('id'); 
let url = "http://localhost:3000/api/cameras/"+id;

fetch(url)
.then((response)=>{

        if (response.status !== 200) { // Test connexion
                console.log('Looks like there was a problem. Status Code: ' +
                  response.status);
                return;
        }

        response.json().then((element_id)=> { // Promesse de la réponse de l'api

        

                
                let ajoutPanier = document.getElementById('submit-form');
                displayCart(element_id, ajoutPanier)
                ajoutPanier.addEventListener('click', function(event){
                        event.preventDefault();
                        let panier=[]; // Création d'un tableau qui permet de stocker les produits choisis afin de les mettres en localstorage
                        let lpanier=localStorage.getItem('panier');
                        let isPresent=false;
                        if(lpanier){
                                panier=JSON.parse(lpanier); // Récupère les données du localstorage afin de les comparer avec les données du produits choisis
                                panier.forEach(element=>{
                                        if(element.id==id && element.lenses==lense.value){ // Si présent augmente la quantitée de 1 et renvois ' vrai ' a présent afin que les prochain ajoute directement 1 
                                                element.qty=element.qty+1;
                                                isPresent=true;
                                        }
                                })
                        }
                        if(!isPresent){ // Si pas présent création d'un objet du produit
                                let camera={
                                        id:element_id._id,
                                        img:element_id.imageUrl,
                                        name:element_id.name,
                                        lenses:lense.value,
                                        price:element_id.price,
                                        qty: 1,              
                                }
                                panier.push(camera) // On l'ajoute au tableau panier qui contient les autres produits sélectionnés
                        }                     
                        alert("Votre article a été ajouté au panier !"); // Avertissement de validation de la sélection
                        localStorage.setItem('panier', JSON.stringify(panier)); // On envois notre panier dans le localstorage afin de pour creer un panier                                   
                });

              
        });    
})
.catch(function(err) { // Erreur de promesse
        console.log('Fetch Error :-S', err);
});

function displayCart(element_id, ajoutPanier){
        let title=document.createElement("h1");
        title.innerHTML=element_id.name;
        title.classList = "index-produit";

        let img=document.createElement("img");
        img.innerHTML=element_id.imageUrl;
        img.src=element_id.imageUrl;
        img.classList = "produit-img";
        img.setAttribute("alt", "Image d'appareil photo");

        let p=document.createElement("p");
        p.innerHTML=element_id.description;
        p.classList = "produit-description";

        let lense=document.getElementById('lense');
        let lenses=element_id.lenses;
        lenses.forEach(data=>{ // Selection des lentilles disponible
                let option=document.createElement('option');
                option.value=data; 
                option.innerHTML=data;
                lense.appendChild(option);
        })
        let price=document.createElement("p");
                price.innerHTML=element_id.price + " €";
                price.classList = "produit-price";

                let article=document.createElement("article");
                article.classList = "produit-article";

                article.appendChild(title);
                article.appendChild(img);
                article.appendChild(p);
                article.appendChild(price);
                form.appendChild(lense);
                form.appendChild(ajoutPanier);
                article.appendChild(form);

                main.appendChild(article);


}






