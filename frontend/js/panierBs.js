// let main = document.getElementById("main");
let contain = document.getElementById("container");
let totalRow = document.createElement("div");
totalRow.classList = "row";
totalRow.id = "grid-footer";

let url = new URL("http://localhost:3000/api/cameras/order");

let lpanier = localStorage.getItem('panier');
let panier = JSON.parse(lpanier);

let finalPrice;
let reducer = (accumulator, currentValue) => {
    return accumulator + currentValue
};
let Products = [];

let totalCommande = document.createElement("p");
totalCommande.innerHTML = "Total de votre commande";
totalCommande.id = "totalCmd";

let div = document.createElement("div");
div.classList = "col col-2 bgWhite";
let divTot = document.createElement("div");
divTot.classList = "col col-3 offset-5 bgWhite";
let total = document.createElement("p");
total.innerHTML = calculTotalPanier(panier) + " €";
total.id = choiseBgColor(panier);
divTot.appendChild(totalCommande);
div.appendChild(total);
totalRow.appendChild(divTot);
totalRow.appendChild(div);

panier.forEach(element => {
    let divRow = document.createElement("div");
    divRow.classList = "row";
    let divColImg = document.createElement("div");
    divColImg.id = "divImg";
    divColImg.classList = "col col-2 bgWhite noBg";
    let divColName = document.createElement("div");
    divColName.classList = "col col-2";
    let divColLense = document.createElement("div");
    divColLense.classList = "col col-2 bgWhite";
    let divColQty = document.createElement("div");
    divColQty.classList = "col col-2";
    let divColPrice = document.createElement("div");
    divColPrice.classList = "col col-2 bgWhite";
    let divColDelet = document.createElement("div");
    divColDelet.classList = "col col-2 noBg btnDel";

    let div = document.createElement("div");

    let id = element.id;
    let img = document.createElement("img");
    img.src = element.img;
    img.innerHTML = element.img;
    img.classList = "apercu-panier";
    let name = document.createElement("p");
    name.innerHTML = element.name;
    let lense = document.createElement("p");
    lense.innerHTML = element.lenses;
    let price = document.createElement("p");
    price.innerHTML = element.price + " €";
    let quantite = document.createElement("p");
    quantite.innerHTML = element.qty;

    let imgDelete = document.createElement("img");
    imgDelete.src = "../backend/images/delet.png";
    

    let buttonDelete = document.createElement("button");
//     imgDelete.innerHTML = "../backend/images/delete.svg";
        buttonDelete.innerHTML = " ";
        buttonDelete.classList = "buttonDelete";
        buttonDelete.id = id;
        buttonDelete.addEventListener('click', function(event){
                        event.preventDefault();                       
                        let change = false;
                        if (element.qty === 0) {
                                panier = removePanier(panier);
                        }                          
                        if (element.qty>0 && element.qty >= 1) {
                                element.qty--;
                                quantite.innerHTML = element.qty;
                                change = true;                    
                                if (change===true) {
                                        total.innerHTML = calculTotalPanier(panier) + " €";         
                                        localStorage.setItem('panier', JSON.stringify(panier));                                                                                                   
                                }       
                        }                       
        });

    buttonDelete.appendChild(imgDelete);
    contain.appendChild(divRow);
    divRow.appendChild(divColImg);            
    divRow.appendChild(divColName);            
    divRow.appendChild(divColLense);            
    divRow.appendChild(divColQty);            
    divRow.appendChild(divColPrice);            
    divRow.appendChild(divColDelet);   
    divColImg.appendChild(img);
    divColName.appendChild(name);
    divColLense.appendChild(lense);
    divColQty.appendChild(quantite);
    divColPrice.appendChild(price);
    divColDelet.appendChild(buttonDelete);
    contain.appendChild(totalRow);
});


function choiseBgColor(array) {
    let nbr = Number(array.length);
    if (nbr%2 == 0) {
        total.classList.remove("col col-4 col-2-md offset-4 offset-md-4 bgWhite");
        select = total.classList.add("col col-4 col-2-md offset-4 offset-md-4 bgColored"); 
        return total;
    }
   return total;
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
//  Pour définir les row, function qui fait une div row par produit

function divRowInit(array) {
    for (let index = 0; index < array.length; index++) {
        let element = array[index];
        element = document.createElement("div");
        element.classList = "row";
        return element;
    }
    return element;
}


// Bouton d'envois de commande

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
                        localStorage.setItem('totalprice', finalPrice);
                        window.location.href='confirmation.html';
                })
         });
 
});