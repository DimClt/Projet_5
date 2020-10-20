let main = document.getElementById("main");
let queryString=window.location.search;
let id= new URLSearchParams(queryString).get('id');
let url = "http://localhost:3000/api/cameras/"+id;



fetch(url)
.then((response)=>{
        if (response.status !== 200) {
                console.log('Looks like there was a problem. Status Code: ' +
                  response.status);
                return;
        }
        response.json().then((element_id)=> {
                console.log(element_id.lenses);
                let title=document.createElement("h1");
                title.innerHTML=element_id.name;
                title.classList = "index-a";

                let img=document.createElement("img");
                img.innerHTML=element_id.imageUrl;
                img.src=element_id.imageUrl;
                img.classList = "produit-img";

                let p=document.createElement("p");
                p.innerHTML=element_id.description;
                p.classList = "index-description"

               
                let lense=document.getElementById('lense');
                let lenses=element_id.lenses;
                lenses.forEach(data=>{
                        let option=document.createElement('option');
                        option.value=data;
                        option.innerHTML=data;
                        lense.appendChild(option);
                })


                let price=document.createElement("p");
                price.innerHTML=element_id.price + " €";
                price.classList = "index-price";

                let ajoutPanier = document.getElementById('submit-form');
                ajoutPanier.innerHTML = "Ajouter au panier";
                ajoutPanier.addEventListener('click', function(event){
                        event.preventDefault();
                        let panier=[];
                        let lpanier=localStorage.getItem('panier');
                        let isPresent=false;
                        if(lpanier){
                                panier=JSON.parse(lpanier);
                                panier.forEach(element=>{
                                        if(element.id==id && element.lenses==lense.value){
                                                element.qty=element.qty+1;
                                                isPresent=true;
                                        }
                                })
                        }
                        if(!isPresent){
                                let camera={
                                        id:element_id._id,
                                        img:element_id.imageUrl,
                                        name:element_id.name,
                                        lenses:lense.value,
                                        price:element_id.price,
                                        qty: 1,              
                                }
                                panier.push(camera)
                        }
                        

                        alert("Votre article a été ajouté au panier !");

                        localStorage.setItem('panier', JSON.stringify(panier));

                        
                      
                })


                let article=document.createElement("article");
                article.classList = "produit-article";

                article.appendChild(title);
                article.appendChild(img);
                article.appendChild(p);
                article.appendChild(price);
                article.appendChild(lense);
                article.appendChild(ajoutPanier);
                
                main.appendChild(article);
        })      
})






