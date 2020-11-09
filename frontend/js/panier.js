let container = document.getElementById("container");
let url = new URL("http://localhost:3000/api/cameras/order");

let lpanier = localStorage.getItem('panier');
let panier = JSON.parse(lpanier);

let reducer = (accumulator, currentValue) => {
        return accumulator + currentValue
};

let finalPrice; 
let divTotal = document.createElement("div");
divTotal.classList = "divTotal";
let total = document.createElement("p");
total.id = "totalCommande";
/////////////// Pour les articles /////////////////////////////
panier.forEach(element => {
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

                let addProduct = document.createElement("button");
                addProduct.innerHTML = " ";
                addProduct.classList = "addButton";
                addProduct.setAttribute("aria-label", "Ajouter un produit au panier");
                addProduct.appendChild(addImg);
                addProduct.addEventListener('click', function(event){
                        event.preventDefault();
                        let qty;
                        qty = element.qty++;
                        quantite.innerHTML = "Quantité : " + element.qty;
                        totalObject.innerHTML = "Sous-total : " + calculItemTotal(panier, id, lnse) + " €";
                        total.innerHTML = "Total commande : " + calculTotalPanier(panier) + " €";         
                        localStorage.setItem('panier', JSON.stringify(panier)); 
                });  
                
                let totalObject = document.createElement("p");
                totalObject.classList = "totalObject";
                totalObject.innerHTML = "Sous-total : " + calculItemTotal(panier, id, lnse) + " €";

                let imgDelete = document.createElement("img");
                imgDelete.src = "../backend/images/delet.png";
                imgDelete.id = "imgDelete";
                
                let buttonDelete = document.createElement("button");
                buttonDelete.innerHTML = "";
                buttonDelete.classList = "buttonDelete";
                buttonDelete.setAttribute("aria-label", "Retirer un produit au panier");
                buttonDelete.id = id;
                buttonDelete.addEventListener('click', function(event){
                        event.preventDefault();                       
                        let change = false;                    
                        if (element.qty>0 && element.qty >= 1) {
                                element.qty--;
                                quantite.innerHTML = element.qty;
                                change = true;                    
                                if (change===true) {
                                        quantite.innerHTML = "Quantité : " + element.qty;
                                        totalObject.innerHTML = "Sous-total : " + calculItemTotal(panier, id, lnse) + " €";
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

////////// Fonction de calcule des prix ///////////////////

function calculItemTotal(array, id, lnse) {
        let totalElement;
        array.forEach(element => {
                if (element.id == id && element.lenses == lnse) {
                let price = element.price;
                let qty = element.qty;
                totalElement = Number(price * qty);
                return totalElement;
                }
        return totalElement;
        });
        return totalElement;
}
function calculTotalPanier(array) {
        let totalPanierAdd;
        let totalByitem;
        let totalOfItem = [];
        array.forEach(element => {
                price = element.price;
                let qty = element.qty;
                totalByitem = price * qty;
                totalOfItem.push(totalByitem);
                totalPanierAdd = addAllPrice(totalOfItem);
                function addAllPrice(totalOfItem) {
                        totalPanierAdd = totalOfItem.reduce(reducer);               
                        return totalPanierAdd;
                }      
                return totalPanierAdd;
        });   
        return totalPanierAdd;
}


divTotal.appendChild(total);
container.appendChild(divTotal);
total.innerHTML = "Total commande : " + calculTotalPanier(panier) + " €";
let totalPrice = calculTotalPanier(panier);

let products = [];

function pushSelectedProduct(array) {
        array.forEach(element => {
                let qty = element.qty; 
                if (qty > 0) {
                        let id = element.id;
                        products.push(id);
                }
        });
}

///////////// Formulaire de commande ////////////////////

let formContact = document.getElementById('form-contact');
let firstName = document.getElementById('firstName');
let lastName = document.getElementById('lastName');
let address = document.getElementById('address');
let city = document.getElementById('city');
let email = document.getElementById('email');

let envoiCommand = document.getElementById('submit-command')
formContact.addEventListener('submit', function(event){
        event.preventDefault();
        let contact = {
                firstName: firstName.value,
                lastName: lastName.value,
                address: address.value,
                city: city.value,
                email: email.value
        };
        pushSelectedProduct(panier);
        let order = {contact, products};   
        fetch(url, {
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
                        localStorage.setItem('totalprice', totalPrice);
                        window.location.href='confirmation.html';
                })
         });
 
});