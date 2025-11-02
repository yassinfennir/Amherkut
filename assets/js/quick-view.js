document.addEventListener('DOMContentLoaded', function() {
    const quickViewBtns = document.querySelectorAll('.quick-view-btn');
    const modal = document.getElementById('quick-view-modal');
    const closeBtn = modal.querySelector('.close-btn');
    const modalImage = modal.querySelector('.modal-image img');
    const modalTitle = modal.querySelector('.product-title');
    const modalDescription = modal.querySelector('.product-description');
    const modalPrice = modal.querySelector('.product-price');

    const products = {
        1: {
            image: 'assets/images/20230519_150338.png',
            title: 'Marokkolainen Khobz',
            description: 'Perinteinen marokkolainen leipä, joka on valmistettu hienoimmista jauhoista ja leivottu rapeaksi. Täydellinen kumppani couscousille, tagineille tai sellaisenaan nautittavaksi. Tämä leipä on marokkolaisen keittiön sielu, ja sen tuoksu täyttää kotisi lämmöllä ja perinteillä.',
            price: '€4.50'
        },
        2: {
            image: 'assets/images/20230610_110553.jpg',
            title: 'Mediterraaninen Focaccia',
            description: 'Italialainen klassikko, joka on maustettu laadukkaalla oliiviöljyllä, tuoreella rosmariinilla ja ripauksella merisuolaa. Pehmeä ja ilmava sisältä, rapea ja kultainen ulkoa. Täydellinen antipastien, salaattien tai keittojen kanssa, tai yksinkertaisesti dippaamalla oliiviöljyyn.',
            price: '€5.80'
        },
        3: {
            image: 'assets/images/2025-10-11.png',
            title: 'Baklava-kakku',
            description: 'Ylellinen ja makea herkku, joka on täynnä rapeita pähkinöitä, filotaikinaa ja makeaa hunajasiirappia. Tämä marokkolainen versio klassisesta baklavasta on täydellinen jälkiruoka tai kahviherkku. Jokainen pala on makujen sinfonia, joka vie sinut suoraan Marrakechin markkinoille.',
            price: '€28.00'
        },
        4: {
            image: 'assets/images/IMG_20230506_094126_784.jpg',
            title: 'Marokkolainen Kaak',
            description: 'Perinteiset marokkolaiset keksit, jotka on maustettu lämpimillä mausteilla, kuten kanelilla, neilikalla ja aniksella. Nämä rapea ja makeat keksit ovat täydellinen kumppani minttuteelle tai kahville. Nauti palaa marokkolaista perinnettä.',
            price: '€3.50'
        },
        5: {
            image: 'assets/images/IMG-20230613-WA0043.jpg',
            title: 'Mediterraaninen Ciabatta',
            description: 'Italialainen ciabatta, jolla on rapea kuori ja ilmava, pehmeä sisus. Täydellinen voileipien, bruschettojen tai antipastien kanssa. Tämä monipuolinen leipä on valmistettu laadukkaista raaka-aineista ja perinteisellä italialaisella reseptillä.',
            price: '€4.20'
        },
        6: {
            image: 'assets/images/unnamed (2).png',
            title: 'Marokkolainen M\'semen',
            description: 'Perinteinen marokkolainen ohutleipä, joka on valmistettu kerroksittain ja paistettu pannulla. M\'semen on täydellinen aamupalaksi hunajan, voin tai hillon kanssa, tai suolaisena versiona täytettynä liha- tai kasvisseoksella. Koe aito marokkolainen aamiainen.',
            price: '€3.80'
        }
    };

    quickViewBtns.forEach(btn => {
        btn.addEventListener('click', function(e) {
            e.preventDefault();
            const productId = this.dataset.productId;
            const product = products[productId];

            modalImage.src = product.image;
            modalTitle.textContent = product.title;
            modalDescription.textContent = product.description;
            modalPrice.textContent = product.price;

            modal.style.display = 'block';
        });
    });

    closeBtn.addEventListener('click', function() {
        modal.style.display = 'none';
    });

    window.addEventListener('click', function(e) {
        if (e.target == modal) {
            modal.style.display = 'none';
        }
    });
});
