let container = document.getElementById("container");

// Url de l'api qui attend nos données
let url = new URL("http://localhost:3000/api/cameras/order"); 

// Panier recupère tous les produits choisis
let lpanier = localStorage.getItem('panier');
let panier = JSON.parse(lpanier);

// Tableaux qui sera envoyé à l'api avec les id des objets validés
let products = [];

///////////////////////// Fonction //////////////////////////////

function reducer (accumulator, currentValue) { // Fonction d'addition de tableau
        return accumulator + currentValue;
}

function totalByProduct(panier, id, lnse,) { // Fonction de calcule du total par produit 
    let totalItem;
    panier.forEach(element => {
        if (element.id == id && element.lenses == lnse ) {
            totalItem = Number(element.qty * element.price);
        }
    });
    return totalItem;
}

function totalForOrder(panier) { // Fonction qui calcule le total de la commande
    if (panier.length ===0) {
        return Number(0);
    }
    if (panier.length >= 1) {
        let allProductPrice = [];
        panier.forEach(element => {
        allProductPrice.push(element.qty * element.price);
        });
        return Number(allProductPrice.reduce(reducer), 0);
    }
    
}

function panierRemove (panier, element) { // Fonction qui supprime un objet du panier
        let itemIndex = panier.indexOf(element);
        panier.splice(itemIndex, 1);
}

function changeHtml(qty, itemsPrices, totalOrder, element, id, lnse) { // Fonction qui affiche les calcules dynamiquement
    qty.innerHTML = "Quantitée(s) : " + element.qty;
    itemsPrices.innerHTML = "Sous-total du panier : " +  totalByProduct(panier, id, lnse) + " €";
    totalOrder.innerHTML = "Total du panier : " + totalForOrder(panier) + " €";
    return;
}

function pushProduct(panier) { // Fonction qui prépare les données pour l'api
    panier.forEach(element => {
        let id = element.id;
        products.push(id);
    });
}

function setItem(element, id, lnse, container, addButton, delButton) { // Fonction qui ajoute le contenu du panier
    let divRow = document.createElement('div'); // Création des div pour bootstrap
    divRow.classList = "row";

    let divImg = document.createElement('div'); 
    divImg.classList = "col col-2";
    divImg.id = "divImg";

    let divMain = document.createElement('div'); 
    divMain.classList = "col col-8 col-md-8 col-lg-6";

    let divAside = document.createElement('div'); 
    divAside.classList = "col col-4 col-md-4";

    let divItemInfo = document.createElement('div'); // Création de div pour la mise en page des données
    divItemInfo.classList = "divItemInfo";

    let divButton = document.createElement('div');
    divButton.classList = "divButton";

    let divChoice = document.createElement('div');
    divChoice.classList = "divChoice";

    let img = document.createElement('img'); // Création du html avec les données
    img.src = element.img;
    img.innerHTML = element.img;
    img.classList = "apercu-panier";

    let name = document.createElement('h2');
    name.innerHTML = element.name + " '" + element.lenses + "'"; 

    let qty = document.createElement('p');

    let price = document.createElement('p');
    price.classList = "price";
    price.innerHTML = "Prix : " + element.price + " €";

    let itemsPrices = document.createElement('p');
    itemsPrices.classList = "itemsPrices";

    changeHtml(qty, itemsPrices, totalOrder, element, id, lnse);

    addButton.addEventListener('click', function(event) { // Bouton d'ajoute de produit
        event.preventDefault();
        element.qty++;
        changeHtml(qty, itemsPrices, totalOrder, element, id, lnse);
        localStorage.setItem('panier', JSON.stringify(panier));
    });

    delButton.addEventListener('click', function(event){ // Bouton de suppression de produit
        event.preventDefault(); 
        let isDelete = false;
        if (element.qty === 1) {
            element.qty = 0; 
            panierRemove (panier, element);
            changeHtml(qty, itemsPrices, totalOrder, element, id, lnse);
            divRow.classList = "display";
            isDelete = true;
        } 
        if (!isDelete && element.qty >= 1) {
            element.qty--;
            changeHtml(qty, itemsPrices, totalOrder, element, id, lnse);
            isDelete = false;
        }            
        localStorage.setItem('panier', JSON.stringify(panier));        
    }); 

    divImg.appendChild(img);

    divItemInfo.appendChild(name);
    divItemInfo.appendChild(price);
    divMain.appendChild(divItemInfo);

    divChoice.appendChild(qty);
    divButton.appendChild(addButton);
    divButton.appendChild(delButton);
    divChoice.appendChild(divButton);
    divAside.appendChild(divChoice);
    divAside.appendChild(itemsPrices);

    divRow.appendChild(divImg);
    divRow.appendChild(divMain);
    divRow.appendChild(divAside);

    container.appendChild(divRow);

}
///////////////// Intégration du panier ////////////////////////

let totalOrder = document.createElement('p'); // Création html pour le total de la commande
totalOrder.classList = "totalOrder";

panier.forEach(element => {
    let id = element.id;

    let lnse = element.lenses;

    let addButton = document.createElement("button");

    let addImg = document.createElement("img");
    addImg.src = "../backend/images/add.png";

    let delButton = document.createElement("button");

    let delImg = document.createElement("img");
    delImg.src = "../backend/images/del.png";

    addButton.appendChild(addImg);
    delButton.appendChild(delImg);

    setItem(element, id, lnse, container, addButton, delButton);

});

container.appendChild(totalOrder);

////////////////////// Formulaire /////////////////////////

let formContact = document.getElementById('form-contact'); 
let firstName = document.getElementById('firstName');
let lastName = document.getElementById('lastName');
let address = document.getElementById('address');
let city = document.getElementById('city');
let email = document.getElementById('email');



let envoiCommand = document.getElementById('submit-command');

formContact.addEventListener('submit', function(event) { // Envois des données à l'api
    event.preventDefault();
    let contact = {
            firstName: firstName.value,
            lastName: lastName.value,
            address: address.value,
            city: city.value,
            email: email.value
    };
    pushProduct(panier);
    let totalPriceOrder = totalForOrder(panier);
    let order = {contact, products};   
    fetch(url, { // Récuprération de la réponse de l'api
        method:"POST", 
        headers: {
            'Content-Type': 'application/json;charset=UTF-8'
        },
        body:JSON.stringify(order), 
    }).then(response=>{  
            response.json().then(data=>{   
                localStorage.clear();
                localStorage.setItem('orderId', data.orderId);
                localStorage.setItem('contact', JSON.stringify(contact));
                localStorage.setItem('totalOrder', JSON.stringify(totalPriceOrder));
                window.location.href = 'confirmation.html';
            })
    	});
});