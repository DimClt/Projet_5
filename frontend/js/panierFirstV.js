let container = document.getElementById("container");
let url = new URL("http://localhost:3000/api/cameras/order"); // Url de l'api qui attend nos données

let lpanier = localStorage.getItem('panier'); // Récupération du panier
let panier = JSON.parse(lpanier);

let reducer = (accumulator, currentValue) => { // Permet d'additioner les valeur d'un tableau
        return accumulator + currentValue
};

let finalPrice;  // Prix final de la commande qui sera envoyé a la confirmation 

let divTotal = document.createElement("div");
divTotal.classList = "divTotal";

let total = document.createElement("p");
total.id = "totalCommande";

/////////////// Pour les articles /////////////////////////////

panier.forEach(element => { // Création d'une liste résumé des produits avec la possibilité de rajouter ou enlever des produits au panier avec un affichage des prix

                let id = element.id;
                let lnse = element.lenses;

                let article = document.createElement("article");
                article.classList = "article";

                let divImg = document.createElement("div");
                divImg.classList = "divImg";

                let divMiddle = document.createElement("div");
                divMiddle.classList = "divMiddle";

                let divAdd = document.createElement("div");
                divAdd.classList = "divAdd";

                let divLast = document.createElement("div");
                divLast.classList = "divLast";

                let img = document.createElement("img");
                img.src = element.img;
                img.innerHTML = element.img;
                img.classList = "apercu-panier";
                

                let name = document.createElement("h2");
                name.innerHTML = element.name + ' " ' + element.lenses + ' "';

                let lense = document.createElement("p");
                lense.innerHTML = "Lentille : " + element.lenses;

                let price = document.createElement("p");
                price.innerHTML = "Prix : " + element.price + " €";

                let addImg = document.createElement("img");
                addImg.src = "../backend/images/add.png";

                let quantite = document.createElement("p");
                quantite.classList = "qty";
                quantite.id = quantite;
                quantite.innerHTML = "Quantité : " + element.qty;

                let totalObject = document.createElement("p");
                totalObject.classList = "totalObject";
                totalObject.innerHTML = "Sous-total : " + calculItemTotal(element, id, lnse) + " €";
                
                let addProduct = document.createElement("button");
                addProduct.innerHTML = " ";
                addProduct.classList = "addButton";
                addProduct.setAttribute("aria-label", "Ajouter un produit au panier");
                addProduct.appendChild(addImg);
                addProduct.addEventListener('click', function(event){ // Permet d'ajouté un produit déjà sélectionné au panier
                        event.preventDefault();
                        qty = element.qty++;
                        quantite.innerHTML = "Quantité : " + element.qty;
                        totalObject.innerHTML = "Sous-total : " + calculItemTotal(element, id, lnse) + " €";
                        total.innerHTML = "Total commande : " + calculTotalPanier(panier) + " €";         
                        localStorage.setItem('panier', JSON.stringify(panier)); 
                });
                
                let imgDelete = document.createElement("img");
                imgDelete.src = "../backend/images/delet.png";
                imgDelete.id = "imgDelete";
                
                let buttonDelete = document.createElement("button");
                buttonDelete.innerHTML = "";
                buttonDelete.classList = "buttonDelete";
                buttonDelete.setAttribute("aria-label", "Retirer un produit au panier");
                buttonDelete.id = id;
                buttonDelete.addEventListener('click', function(event){ // Retire un élément du panier
                        event.preventDefault();                       
                        let change = false;                    
                        if (element.qty>0 && element.qty >= 1) {
                                element.qty--;
                                quantite.innerHTML = element.qty;
                                change = true;                    
                                if (change===true) {
                                        quantite.innerHTML = "Quantité : " + element.qty;
                                        totalObject.innerHTML = "Sous-total : " + calculItemTotal(element, id, lnse) + " €";
                                        total.innerHTML = "Total commande : " + calculTotalPanier(panier) + " €";         
                                        localStorage.setItem('panier', JSON.stringify(panier));                                                                                                   
                                }       
                        }                       
                });  
                container.appendChild(article);
                buttonDelete.appendChild(imgDelete);
                divImg.appendChild(img);
                divMiddle.appendChild(name);
                divMiddle.appendChild(lense);
                divAdd.appendChild(quantite);
                divAdd.appendChild(addProduct)
                divMiddle.appendChild(divAdd);
                divMiddle.appendChild(price);
                divLast.appendChild(buttonDelete);
                divLast.appendChild(totalObject);
                article.appendChild(divImg);
                article.appendChild(divMiddle);
                article.appendChild(divLast);                        
                
});    

function setItem(element, addProduct, buttonDelete) {

        
        
}

////////// Fonction de calcule des prix ///////////////////

function calculItemTotal(element, id, lnse) { // Fonction qui permet de calculé des total de chaque produit dès qu'il y a un ajout ou retrait du panier
        let totalElement;
                if (element.id == id && element.lenses == lnse) {
                let price = element.price;
                let qty = element.qty;
                totalElement = Number(price * qty);
                }
        return totalElement;
}

function calculTotalPanier(element) { // Fontion qui calcule de total de tous le panier dynamiquement
        let totalPanierAdd;
        let totalOfItem = [];
        let totalByItem = element.price * element.qty;
        totalOfItem.push(totalByItem);
        addAllPrice(totalOfItem);
        function addAllPrice(totalOfItem) {
                totalPanierAdd = Number(totalOfItem.reduce(reducer));               
                return totalPanierAdd;
        }      
        // return totalPanierAdd;
}


// function calculTotalPanier(array) { // Fontion qui calcule de total de tous le panier dynamiquement
//         let totalPanierAdd;
//         let totalByitem;
//         let totalOfItem = [];
//         array.forEach(element => {
//                 price = element.price;
//                 let qty = element.qty;
//                 totalByitem = price * qty;
//                 totalOfItem.push(totalByitem);
//                 totalPanierAdd = addAllPrice(totalOfItem);
//                 function addAllPrice(totalOfItem) {
//                         totalPanierAdd = totalOfItem.reduce(reducer);               
//                         return totalPanierAdd;
//                 }      
//                 return totalPanierAdd;
//         });   
//         return totalPanierAdd;
// }

divTotal.appendChild(total);
container.appendChild(divTotal);

total.innerHTML = "Total commande : " + calculTotalPanier(panier) + " €";

let totalPrice = calculTotalPanier(panier);

let products = []; // Données attendu par l'api afin de valider la commande

function pushSelectedProduct(array) { // Fonction qui permet de sélection seulement les produits n'étant pas a 0
        array.forEach(element => {
                let qty = element.qty; 
                if (qty > 0) {
                        let id = element.id;
                        products.push(id);
                }
        });
}

///////////// Formulaire de commande ////////////////////

let formContact = document.getElementById('form-contact'); // Récupération du formulaire 
let firstName = document.getElementById('firstName');
let lastName = document.getElementById('lastName');
let address = document.getElementById('address');
let city = document.getElementById('city');
let email = document.getElementById('email');

let envoiCommand = document.getElementById('submit-command')
formContact.addEventListener('submit', function(event){ // Préparation des données a l'api
        event.preventDefault();
        let contact = { // Création d'un objet contact avec les valeur de l'input utilisateur
                firstName: firstName.value,
                lastName: lastName.value,
                address: address.value,
                city: city.value,
                email: email.value
        };
        pushSelectedProduct(panier); // Préparation des produits > 0
        let order = {contact, products};   
        fetch(url, {
                method:"POST", // Méthode  de connexion a l'api
                headers: {
                        'Content-Type': 'application/json;charset=UTF-8' // Le type de donnée qui va lui être transmit
                },
                body:JSON.stringify(order), // Envois des données a l'api
        }).then(response=>{ // Promesse d'un réponse de l'api
                response.json().then(data=>{ // Promesse de création des données pour la confirmation
                        localStorage.clear();
                        localStorage.setItem('orderId', data.orderId);
                        localStorage.setItem('contact', JSON.stringify(contact));
                        localStorage.setItem('totalprice', totalPrice);
                        window.location.href='confirmation.html'; // Dirige l'utilisateur sur la page confirmation
                })
         });
 
});