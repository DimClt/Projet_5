let main = document.getElementById("main");
let url = "http://localhost:3000/api/cameras/";
let quantite = document.getElementById("quantite");

let tableBody = document.getElementById("tableBody");
// Récupérer le local storage pour en faire un tableau
let lpanier = localStorage.getItem('panier');
let panier = JSON.parse(lpanier);
console.log(panier);



/* 
Pour chaque élément sélectionner l'id

si l'id n'est pas défénis inclure le produit au tableau avec quantité 1

sinon, modifier la quantité++
*/

panier.forEach(element => {
        let produit = {
                id : element.id,
                img : element.img,
                name : element.name,
                lense : element.lenses,
                price : element.price,
                quantite : 1,
        }
        console.log(produit)
        
        for (const id in produit) {
                if (produit.hasOwnProperty(id)) {
                        const element = produit[id];
                        console.log(element);

                        
                }
        }
});























// panier.forEach((element) => {  
//         let id = element.id;


//         let tr = document.createElement("tr");
//         let tdImg = document.createElement("td");

//         let img = document.createElement("img");
//         img.src = element.img;
//         img.innerHTML = element.img;
//         img.classList = "apercu-panier";

//         let name = document.createElement("td");
//         name.innerHTML = element.name;

//         let lense = document.createElement("td");
//         lense.innerHTML = element.lenses;

//         let price = document.createElement("td");
//         price.innerHTML = element.price;



//         tableBody.appendChild(tr);
//         tr.appendChild(tdImg);
//         tdImg.appendChild(img);
//         tr.appendChild(name);
//         tr.appendChild(lense);
//         tr.appendChild(price);

// });



        