import getMenu from "./api.js";
import {renderDatailPage, renderNotFound, uiElements, renderLoader, renderMenuCard } from "./ui.js";


//ekran daki html icerigi yuklendikten sonra

document.addEventListener("DOMContentLoaded", async () => {

    //api fonksiyonundan veriyi al
    const menuData = await getMenu()
    console.log("menuData: ", menuData)

    if (window.location.pathname.includes("/index.html")) {
        
        //verileri yuklenirken loading yap
        renderLoader()

        //verileri yukle
        renderMenuCard(menuData)

        //Kategori alanindaki butonlari gez ve her bir tiklanmasini yonet
        uiElements.categoryButtons.forEach((button) => {
            button.addEventListener("click",()=>{

                //tiklanilan button id sine eris
                const selectedCategory = button.id

                //menu de id si ayni olanlari sec ve filteredMenu ye aktar
                const filteredMenu = menuData.filter(
                    (item) => item.category == selectedCategory
                )

                //eger tum secildi ise varsayilan lsiteyi gonder
                if (selectedCategory == "all") {
                    renderMenuCard(menuData)
                } else {
                    //degilse filtrelenmis olani
                    renderMenuCard(filteredMenu)
                }

            })
        })
    } else {

        //url deki parametreye eris

        const params = new URLSearchParams(window.location.search)

        //parametredeki id ye eris
        const itemId = +params.get('id')

        console.log("itemId: ", itemId)

        //menu de ilgili id li urunu bul
        const product = menuData.find((item) => item.id == itemId)

        //urun yoksa
        if (!product) {
            //hata ver
            renderNotFound()
        } else {
            renderDatailPage(product)
            //urunu goster
        }
    }
})