const data = {
    users: [
        {
            name: 'shumon sharkar',
            email: 'shumon@gmail.com',
            password: '123456',
            phone: '2837347',
            address: 'Dhaka,Bangladesh',
        },
        {
            name: 'mustafizur rahman',
            email: 'mustafiz@gmail.com',
            password: '123456',
            phone: '2837347',
            address: 'Dhaka,Bangladesh',

        }
    ],

    products: [
        {
            name: "Samsung Galaxy S10",
            slug: "samsung-galaxy-s10",
            description: "The powerful Samsung Galaxy S10 boasts a stunning display, innovative camera features like wide-angle and telephoto lenses, and a long-lasting battery for all-day use.",
            price: "100000",
            category: "samsung-phone",
            image: 'https://fdn2.gsmarena.com/vv/bigpic/samsung-galaxy-s10.jpg',
            sold: 20,
            quantity: 80,
            shipping: 0,
            categoryId: "663d2fec1d95e94e082bf8a5"
        },
        {
            name: "Samsung Galaxy S21",
            slug: "samsung-galaxy-s21",
            description: "The Samsung Galaxy S21 delivers next-level performance with a lightning-fast processor for seamless multitasking, an advanced camera system with superior low-light photography, and a sleek design that stands out.",
            price: "120000",
            category: "samsung-phone",
            image: 'https://fdn2.gsmarena.com/vv/bigpic/samsung-galaxy-s21-ultra-5g-.jpg',
            sold: 15,
            quantity: 90,
            shipping: 0,
            categoryId: "663d2fec1d95e94e082bf8a5"
        },
        {
            name: "Samsung Galaxy S22",
            slug: "samsung-galaxy-s22",
            description: "The Samsung Galaxy S22 offers a compact and lightweight design, a powerful camera with incredible night photography capabilities for capturing stunning details even in low-light conditions, and a long-lasting battery to keep you connected throughout the day.",
            price: "135000",
            category: "samsung-phone",
            image: 'https://fdn2.gsmarena.com/vv/bigpic/samsung-galaxy-s22-ultra-5g.jpg',
            sold: 10,
            quantity: 75,
            shipping: 0,
            categoryId: "663d2fec1d95e94e082bf8a5"
        },
        {
            name: "Samsung Galaxy A53",
            slug: "samsung-galaxy-a53",
            description: "The Samsung Galaxy A53 provides excellent value for the price with a large display for immersive viewing, a versatile quad-camera system to capture a variety of shots, and a long-lasting battery for extended use.",
            price: "40000",
            category: "samsung-phone",
            image: 'https://fdn2.gsmarena.com/vv/bigpic/samsung-galaxy-a53-5g-.jpg',
            sold: 40,
            quantity: 60,
            shipping: 0,
            categoryId: "663d2fec1d95e94e082bf8a5"
        },
        {
            name: "Samsung Galaxy A73",
            slug: "samsung-galaxy-a73",
            description: "The Samsung Galaxy A73 boasts a large, high-resolution display for an exceptional viewing experience, a powerful camera system with a long-lasting battery for capturing memories on the go.",
            price: "55000",
            category: "samsung-phone",
            image: 'https://fdn2.gsmarena.com/vv/bigpic/samsung-galaxy-a73-5g.jpg',
            sold: 30,
            quantity: 50,
            shipping: 20,
            categoryId: "663d2fec1d95e94e082bf8a5"
        },
        {
            name: "Samsung Galaxy Fold4",
            slug: "samsung-galaxy-fold4",
            description: "The Samsung Galaxy Fold4 redefines the smartphone experience with its innovative foldable display and multitasking capabilities, perfect for power users who demand the best.",
            price: "180000",
            category: "samsung-phone",
            image: 'https://fdn2.gsmarena.com/vv/bigpic/samsung-galaxy-z-fold4.jpg',
            sold: 5,
            quantity: 20,
            shipping: 10,
            categoryId: "663d2fec1d95e94e082bf8a5"
        },
        {
            name: "Samsung Galaxy M53",
            slug: "samsung-galaxy-m53",
            description: "The Samsung Galaxy M53 delivers exceptional battery life for users who demand all-day performance, along with a triple-camera system for capturing everyday moments.",
            price: "30000",
            category: "samsung-phone",
            image: 'https://fdn2.gsmarena.com/vv/bigpic/samsung-galaxy-m53-5g.jpg',
            sold: 5,
            quantity: 20,
            shipping: 0,
            categoryId: "663d2fec1d95e94e082bf8a5"
        },
        {
            name: "IPhone 13",
            slug: "iphone-13",
            description: "The powerful iPhone 13 boasts an improved dual-camera system, a long-lasting battery, and a superfast A15 Bionic chip for exceptional performance.",
            price: "80000",
            category: "apple-phone",
            image: "https://fdn2.gsmarena.com/vv/bigpic/apple-iphone-13.jpg",
            sold: 80,
            quantity: 100,
            shipping: 0,
            categoryId: "66392e62d0cbf86c9966dc7c"
        },
        {
            name: "IPhone 13 Pro",
            slug: "iphone-13-pro",
            description: "The iPhone 13 Pro takes mobile photography to a new level with its advanced triple-camera system, a stunning ProMotion display, and a powerful A15 Bionic chip.",
            price: "100000",
            category: "apple-phone",
            image: "https://fdn2.gsmarena.com/vv/bigpic/apple-iphone-13-pro.jpg",
            sold: 60,
            quantity: 70,
            shipping: 0,
            categoryId: "66392e62d0cbf86c9966dc7c"
        },
        {
            name: "IPhone 13 Pro Max",
            slug: "iphone-13-pro-max",
            description: "The iPhone 13 Pro Max delivers the ultimate iPhone experience with its massive display, incredible camera system, and long-lasting battery, powered by the A15 Bionic chip.",
            price: 120000,
            category: "apple-phone",
            image: "https://fdn2.gsmarena.com/vv/bigpic/apple-iphone-13-pro-max.jpg",
            sold: 45,
            quantity: 50,
            shipping: 0,
            categoryId: "66392e62d0cbf86c9966dc7c"
        },
        {
            name: "IPhone 12",
            slug: "iphone-12",
            description: "The iPhone 12 offers a sleek design, a powerful A14 Bionic chip, and a versatile dual-camera system, making it a great choice for those who want a premium iPhone experience.",
            price: 60000,
            category: "apple-phone",
            image: "https://fdn2.gsmarena.com/vv/bigpic/apple-iphone-12.jpg",
            sold: 100,
            quantity: 30,
            shipping: 0,
            categoryId: "66392e62d0cbf86c9966dc7c"
        },
        {
            name: "IPhone 11",
            slug: "iphone-11",
            description: "The iPhone 11 provides excellent value for the price with a powerful A13 Bionic chip, a great dual-camera system, and a long-lasting battery.",
            price: 40000,
            category: "apple-phone",
            image: "https://fdn2.gsmarena.com/vv/bigpic/apple-iphone-11.jpg",
            sold: 150,
            quantity: 10,
            shipping: 0,
            categoryId: "66392e62d0cbf86c9966dc7c"
        },
        {
            name: "IPhone XR",
            slug: "iphone-xr",
            description: "The iPhone XR provides a colorful and large display, a powerful A12 Bionic chip, and a long-lasting battery, making it a great value option.",
            price: 30000,
            category: "apple-phone",
            image: "hhttps://fdn2.gsmarena.com/vv/bigpic/apple-iphone-xr-new.jpg",
            sold: 200,
            quantity: 5,
            shipping: 0,
            categoryId: "66392e62d0cbf86c9966dc7c"
        },
        {
            name: "IPhone X",
            slug: "iphone-x",
            description: "The iPhone X marked a turning point with its edge-to-edge display, Face ID technology, and a powerful A11 Bionic chip.",
            price: 45000,
            category: "apple-phone",
            image: "https://fdn2.gsmarena.com/vv/bigpic/apple-iphone-x.jpg",
            sold: 120,
            quantity: 30,
            shipping: 0,
            categoryId: "66392e62d0cbf86c9966dc7c"
        },
        {
            name: "IPhone 14 (rumored)",
            slug: "iphone-14-rumored",
            description: "The upcoming iPhone 14 is rumored to feature a redesigned notch, improved cameras, and a powerful A16 Bionic chip. (subject to change based on official announcement)",
            price: "90000",
            category: "apple-phone",
            image: "https://placehold.it/200x200?text=iPhone+14+ (Rumored)",
            sold: 0,
            quantity: 47,
            shipping: 0,
            categoryId: "66392e62d0cbf86c9966dc7c"
        },
        {
            name: "IPhone 14 Pro",
            slug: "iphone-14-pro",
            description: "The upcoming iPhone 14 Pro is expected to offer even more advanced features compared to the standard iPhone 14, possibly including a new camera system and a faster refresh rate display. (subject to change based on official announcement)",
            price: "110000",
            category: "apple-phone",
            image: "https://fdn2.gsmarena.com/vv/bigpic/apple-iphone-14-pro.jpg",
            sold: 0,
            quantity: 55,
            shipping: 0,
            categoryId: "66392e62d0cbf86c9966dc7c"
        },
        {
            name: "IPhone SE (2nd generation)",
            slug: "iphone-se-2nd-generation",
            description: "The iPhone SE (2nd generation) offered a powerful A13 Bionic chip in a familiar design at a more affordable price point.",
            price: 35000,
            category: "apple-phone",
            image: "https://fdn2.gsmarena.com/vv/bigpic/apple-iphone-5se-ofic.jpg",
            sold: 180,
            quantity: 2,
            shipping: 0,
            categoryId: "66392e62d0cbf86c9966dc7c"
        }

    ]
}


module.exports = data;