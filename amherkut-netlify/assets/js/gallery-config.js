/**
 * GALLERY CONFIGURATION
 * Lista de imágenes para cada galería
 */

const GALLERY_IMAGES = {
    hakaniemet: [
        '20230428_130831.png',
        '20230429_092109.png',
        '20230513_175657.png',
        'amherkut_post_12_12_2023_3_57_23 PM3256170919734082365.jpg',
        'amherkut_post_12_14_2024_6_32_48 PM3522966602225434274.jpg',
        'amherkut_post_12_14_2024_6_32_48 PM3522966602309341311.jpg',
        'amherkut_post_12_14_2024_6_32_48 PM3522966602334563550.jpg',
        'amherkut_post_12_24_2023_11_30_13 PM3265096146870456722.jpg',
        'amherkut_post_4_29_2023_10_03_47 AM3091468844768798231.jpg',
        'amherkut_post_4_29_2023_10_03_47 AM3091468844768817628.jpg',
        'amherkut_post_4_29_2023_10_03_47 AM3091468844768828419.jpg',
        'amherkut_post_4_29_2023_10_03_47 AM3091468844768950150.jpg',
        'amherkut_post_4_29_2023_10_03_47 AM3091468844777126386.jpg',
        'amherkut_post_4_29_2023_10_03_47 AM3091468844777130428.jpg',
        'amherkut_post_4_29_2023_10_03_47 AM3091468844777265113.jpg',
        'amherkut_post_4_29_2023_10_03_47 AM3091468845079312681.jpg',
        'image (1).png',
        'image.png',
        'unnamed.png'
    ],

    leipomo: [
        'amherkut_reel_1_27_2025_6_17_13 PM3554848386214889185.mp4',
        'amherkut_reel_1_27_2025_6_20_50 PM3554850618045899443.mp4',
        'amherkut_reel_2_8_2025_2_35_08 AM3563071468113069807.mp4',
        'amherkut_reel_3_28_2025_9_53_26 PM3598442201693363186.mp4',
        'amherkut_reel_3_28_2025_9_58_20 PM3598444547592866697.mp4',
        'Untitled video - Made with Clipchamp.mp4'
    ],

    food: [
        // Producto 1 - Piirakat 1
        '1/1.jpg',
        '1/2.jpg',
        // Producto 2 - Piirakat 2
        '2/1.jpg',
        '2/2.jpg',
        // Producto 3 - Piirakat
        '3/1 Piirakat.jpg',
        '3/2 Piirakat.jpg',
        // Producto 4 - Piirakat 3
        '4/1 Piirakat 3 noir.jpg',
        '4/2 Piirakat 3 beige.jpg',
        // Producto 5 - Ronds
        '5/1 Ronds noir1.2.jpg',
        '5/2 Ronds beiges1.jpg',
        // Producto 6 - Triangle
        '6/1 Triangle noir1.2.jpg',
        '6/2 Triangle beige1.jpg',
        // Producto 7 - Karjalapiirakka
        '7/1 Karjalapiirakka noir.jpg',
        '7/2 Karjalapiirakka beige.jpg'
    ],

    bread: [
        // Producto 1 - Pan Artesanal 1
        '1/1.jpg',
        '1/2.jpg',
        // Producto 2 - Pan Artesanal 2
        '2/1.jpg',
        '2/2.jpg',
        // Producto 3 - Pan Artesanal 3
        '3/1.jpg',
        '3/2.jpg',
        // Producto 4 - Pan Artesanal 4
        '4/1.jpg',
        '4/2.jpg',
        // Producto 5 - Pan Artesanal 5
        '5/1.jpg',
        '5/2.jpg',
        '5/3.jpg',
        // Producto 6 - Pan Artesanal 6
        '6/1.jpg',
        '6/2.jpg',
        '6/3.jpg',
        // Producto 7 - Pan Artesanal 7
        '7/1.jpg',
        '7/2.jpg',
        '7/3.jpg',
        // Producto 8 - Pan Artesanal 8
        '8/1.jpg',
        '8/2.jpg',
        // Producto 9 - Crackers
        '9/1.jpg',
        '9/2Crakers beige.jpg',
        // Producto 10 - Croissant
        '10/Croissant beige.jpg',
        '10/Croissant noir.jpg'
    ],

    drinks: [
        // Producto 1 - Chai
        '1chai.png',
        // Producto 2 - Expresso
        '2expresso.png',
        // Producto 3 - Macchiato
        '3macchoato.png'
    ],

    sweet: [
        // Baklava
        'Baklava/Pähkinä Baklava.png',
        'Baklava/Pistaasi Baklava.png',
        // Biscocho 1
        'biscocho/1/20250627213603-6be1974d.png',
        'biscocho/1/20250627213604-5ee4b738.png',
        'biscocho/1/20250627213604-61d230a0.png',
        'biscocho/1/20250627213604-c70be31d.png',
        'biscocho/1/20250627213606-86f0d6bc.png',
        'biscocho/1/20250627213608-f52cfa5f.png',
        'biscocho/1/HCN_8388.jpg',
        // Biscocho 2/1
        'biscocho/2/1/20250627213606-223befd0.png',
        'biscocho/2/1/20250627213609-73a2c471.png',
        // Biscocho 2/2
        'biscocho/2/2/20250702121700-eb24cc0a.jpg',
        'biscocho/2/2/20250702121705-7cdf97f2.jpg',
        // Biscocho 2/3
        'biscocho/2/3/HCN_8387.JPG',
        // Biscocho 2/4
        'biscocho/2/4/20250627213607-0015c272.png',
        // Biscocho 2/5
        'biscocho/2/5/20250702121655-b1eefdd6.jpg',
        // Biscocho 3
        'biscocho/3/1 Les roses noir.jpg',
        'biscocho/3/2 Les roses beige.jpg',
        'biscocho/3/3 20250627213607-f95346ab.png',
        // Chocolate
        'Chocolate/1 Chocolats noir.jpg',
        'Chocolate/2 Chocolats beiger.jpg',
        'Chocolate/3 HCN_8467.jpg',
        'Chocolate/4 HCN_8471.jpg',
        // Chocolate Dubai
        'Chocolate DUBAI/1 Chocolats 1 noir.jpg',
        'Chocolate DUBAI/2 Chocolats 1 beige.jpg',
        // Dulce Moon
        'Dulce/moon/20250627213607-e5a801bc.png',
        'Dulce/moon/HCN_8391.jpg',
        'Dulce/moon/HCN_8396.jpg',
        // Dulce Lautanen
        'Dulce/New folder/Lautanen beige.jpg',
        'Dulce/New folder/Lautanen noir.jpg',
        // Dulce Untitled
        'Dulce/New folder (2)/Untitled-1.jpg',
        'Dulce/New folder (2)/Untitled-1blue.jpg',
        // Dulce Croissant aux amandes
        'Dulce/New folder (4)/Croissant aux amandes beige.jpg',
        'Dulce/New folder (4)/Croissant aux amandes noir.jpg',
        // Dulce Korvapuusti
        'Dulce/New folder (5)/20250702110708-72664fd0.jpg',
        'Dulce/New folder (5)/20250702110714-7c917167.jpg',
        'Dulce/New folder (5)/20250702110721-b3927995.jpg',
        'Dulce/New folder (5)/20250702121710-73fdcfce.jpg',
        'Dulce/New folder (5)/20250702121715-cbff3fd2.jpg',
        'Dulce/New folder (5)/20250706215231-839b0b2b.jpg',
        'Dulce/New folder (5)/20250706215247-cd3618e4.jpg',
        'Dulce/New folder (5)/Korvapuusti beige.jpg',
        'Dulce/New folder (5)/Korvapuusti noir.jpg',
        // Dulce Sweed Sushi
        'Dulce/SWEED SUSHI 3.jpg',
        // Jogurt
        'Jogurt/20250702111554-95e70287.jpg',
        'Jogurt/20250702111558-498a7692.jpg',
        // Pasteles
        'pasteles/20250702121648-f290b313.jpg',
        'pasteles/20250702121649-a1e14207.jpg',
        'pasteles/20250702121650-36b0ad7b.jpg',
        'pasteles/20250702121650-a95ce22d.jpg',
        'pasteles/20250706215157-821adf8b.jpg',
        'pasteles/20250706215224-3dccaffd.jpg',
        'pasteles/Kinuskikakku beige.jpg',
        'pasteles/Kinuskikakku noir.jpg',
        // Porkkana Kinuskikakku
        'Porkkana-kinuskikakku beige SOLO/12Porkkanakakku beige SOLO.jpg',
        'Porkkana-kinuskikakku beige SOLO/1Porkkanakakku noir SOLO.jpg'
    ]
};
