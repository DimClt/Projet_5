let main = document.getElementById("main");
let url = "http://localhost:3000/api/cameras";

let orderId = localStorage.getItem('orderId');

let lTotalPrice = localStorage.getItem('totalprice');
let totalPrice = JSON.parse(lTotalPrice);

let lContact = localStorage.getItem('contact');
let contact = JSON.parse(lContact);

let article = document.createElement('article');
article.classList = "produit-article";

let subTitle = document.createElement('h2');
subTitle.innerHTML = "Merci pour votre commande " + contact.firstName + " " + contact.lastName + ".";
subTitle.classList = "h2-confirm";

let commandeValid = document.createElement('p');
commandeValid.innerHTML = "Votre commande N° : " + orderId + ". A bien été enregistré !";
commandeValid.classList = "index-description";

let orderContent = document.createElement('p');
orderContent.innerHTML = "Pour un prix total de " + totalPrice + " €. Vous recevrez un mail de confirmation dès qu'elle sera expédié.";
orderContent.classList = "index-description";

article.appendChild(subTitle);
article.appendChild(commandeValid);
article.appendChild(orderContent);
main.appendChild(article);

