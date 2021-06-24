let faker = require('faker');
let route = require('../utils/route');

faker.locale = "fr";
export const FakeData = {
    slider: [
        {
            title: faker.commerce.product(),
            description: faker.commerce.productName(),
            buttonText: "Lire plus",
            buttonLink: "#",
            imageUrl: "https://picsum.photos/620/400"
        }, {
            title: faker.commerce.product(),
            description: faker.commerce.productName(),
            buttonText: "Lire plus",
            buttonLink: "#",
            imageUrl: "https://picsum.photos/620/400"
        }, {
            title: faker.commerce.product(),
            description: faker.commerce.productName(),
            buttonText: "Lire plus",
            buttonLink: "#",
            imageUrl: "https://picsum.photos/620/400"
        }, {
            title: faker.commerce.product(),
            description: faker.commerce.productName(),
            buttonText: "Lire plus",
            buttonLink: "#",
            imageUrl: "https://picsum.photos/620/400"
        },
    ],
    posts: [
        {
            title: faker.commerce.product(),
            link: "#",
            date: faker.date.month()
        }, {
            title: faker.commerce.product(),
            link: "#",
            date: faker.date.month()
        }, {
            title: faker.commerce.product(),
            link: "#",
            date: faker.date.month()
        }, {
            title: faker.commerce.product(),
            link: "#",
            date: faker.date.month()
        }
    ],
    posts_menu: [
        {
            title: "Lire plus",
            link: "#"
        }, {
            title: "Lire plus",
            link: "#"
        }, {
            title: "Lire plus",
            link: "#"
        }, {
            title: "Lire plus",
            link: "#"
        }, {
            title: "Lire plus",
            link: "#"
        }, {
            title: "Lire plus",
            link: "#"
        }, {
            title: "Lire plus",
            link: "#"
        }, {
            title: "Lire plus",
            link: "#"
        },
    ],
    blog: [
        {
            rhContentTitle: faker.commerce.product(),
            rhContentDescription: faker.commerce.productName(),
            rhContentImage: "https://picsum.photos/315/180",
            rhContentDatePublish: faker.date.month(),

        }, {
            rhContentTitle: faker.commerce.product(),
            rhContentDescription: faker.commerce.productName(),
            rhContentImage: "https://picsum.photos/315/180",
            rhContentDatePublish: faker.date.month(),

        }, {
            rhContentTitle: faker.commerce.product(),
            rhContentDescription: faker.commerce.productName(),
            rhContentImage: "https://picsum.photos/315/180",
            rhContentDatePublish: faker.date.month(),

        }, {
            rhContentTitle: faker.commerce.product(),
            rhContentDescription: faker.commerce.productName(),
            rhContentImage: "https://picsum.photos/315/180",
            rhContentDatePublish: faker.date.month(),

        }, {
            rhContentTitle: faker.commerce.product(),
            rhContentDescription: faker.commerce.productName(),
            rhContentImage: "https://picsum.photos/315/180",
            rhContentDatePublish: faker.date.month(),

        },
    ],
    publications: [
        {
            title: faker.commerce.product(),
            category: "Lire plus",
            link: route.post.post_detail_test,
            date: faker.date.month(),
            intro: faker.commerce.productName(),
            image: "https://picsum.photos/200/250",
        }, {
            title: faker.commerce.product(),
            category: "Lire plus",
            link: route.post.post_detail_test,
            date: faker.date.month(),
            intro: faker.commerce.productName(),
            image: "https://picsum.photos/200/250",
        }, {
            title: faker.commerce.product(),
            category: "Lire plus",
            link: route.post.post_detail_test,
            date: faker.date.month(),
            intro: faker.commerce.productName(),
            image: "https://picsum.photos/200/250",
        }, {
            title: faker.commerce.product(),
            category: "Lire plus",
            link: route.post.post_detail_test,
            date: faker.date.month(),
            intro: faker.commerce.productName(),
            image: "https://picsum.photos/200/250",
        }, {
            title: faker.commerce.product(),
            category: "Lire plus",
            link: route.post.post_detail_test,
            date: faker.date.month(),
            intro: faker.commerce.productName(),
            image: "https://picsum.photos/200/250",
        },
    ],
    post_widget_data: [
        {
            title: "Récent",
            post: [
                {
                    title: faker.commerce.product(),
                    link: "#",
                }, {
                    title: faker.commerce.product(),
                    link: "#",
                }, {
                    title: faker.commerce.product(),
                    link: "#",
                }, {
                    title: faker.commerce.product(),
                    link: "#",
                }, {
                    title: faker.commerce.product(),
                    link: "#",
                },
            ]
        }, {
            title: "A la une",
            post: [
                {
                    title: faker.commerce.product(),
                    link: "#",
                }, {
                    title: faker.commerce.product(),
                    link: "#",
                }, {
                    title: faker.commerce.product(),
                    link: "#",
                }, {
                    title: faker.commerce.product(),
                    link: "#",
                }, {
                    title: faker.commerce.product(),
                    link: "#",
                },
            ]
        }, {
            title: "Populaire",
            post: [
                {
                    title: faker.commerce.product(),
                    link: "#",
                }, {
                    title: faker.commerce.product(),
                    link: "#",
                }, {
                    title: faker.commerce.product(),
                    link: "#",
                },
            ]
        },
    ],
    comments: [
        {
            title: faker.commerce.product(),
            author: faker.name.findName(),
            date: faker.date.past(),
            description: faker.commerce.productName()
        }, {
            title: faker.commerce.product(),
            author: faker.name.findName(),
            date: faker.date.past(),
            description: faker.commerce.productName()
        }, {
            title: faker.commerce.product(),
            author: faker.name.findName(),
            date: faker.date.past(),
            description: faker.commerce.productName()
        }, {
            title: faker.commerce.product(),
            author: faker.name.findName(),
            date: faker.date.past(),
            description: faker.commerce.productName()
        }, {
            title: faker.commerce.product(),
            author: faker.name.findName(),
            date: faker.date.past(),
            description: faker.commerce.productName()
        }
    ],
    thematique: [
        {
            title: "Santé",
            link: "#"
        }, {
            title: "Personnel",
            link: "#"
        }, {
            title: "Ethique",
            link: "#"
        }, {
            title: "Procédure",
            link: "#"
        },
    ],
    pages: [
        {
            title: "A",
            link: "#"
        }, {
            title: "B",
            link: "#"
        }, {
            title: "C",
            link: "#"
        }, {
            title: "D",
            link: "#"
        }, {
            title: "E",
            link: "#"
        }, {
            title: "F",
            link: "#"
        }, {
            title: "G",
            link: "#"
        }, {
            title: "H",
            link: "#"
        }, {
            title: "I",
            link: "#"
        }, {
            title: "J",
            link: "#"
        }, {
            title: "K",
            link: "#"
        }, {
            title: "K",
            link: "#"
        }, {
            title: "L",
            link: "#"
        }, {
            title: "M",
            link: "#"
        }, {
            title: "N",
            link: "#"
        }, {
            title: "O",
            link: "#"
        }, {
            title: "Q",
            link: "#"
        }

    ],
    glossaire: [
        {
            category: "A",
            items: [
                {
                    title: faker.commerce.product(),
                    description: faker.commerce.productName()
                }, {
                    title: faker.commerce.product(),
                    description: faker.commerce.productName()
                }, {
                    title: faker.commerce.product(),
                    description: faker.commerce.productName()
                },
            ]
        }, {
            category: "B",
            items: [
                {
                    title: faker.commerce.product(),
                    description: faker.commerce.productName()
                }, {
                    title: faker.commerce.product(),
                    description: faker.commerce.productName()
                }, {
                    title: faker.commerce.product(),
                    description: faker.commerce.productName()
                },
            ]
        }, {
            category: "C",
            items: [
                {
                    title: faker.commerce.product(),
                    description: faker.commerce.productName()
                }, {
                    title: faker.commerce.product(),
                    description: faker.commerce.productName()
                }
            ]
        }, {
            category: "D",
            items: [
                {
                    title: faker.commerce.product(),
                    description: faker.commerce.productName()
                }, {
                    title: faker.commerce.product(),
                    description: faker.commerce.productName()
                }, {
                    title: faker.commerce.product(),
                    description: faker.commerce.productName()
                },
            ]
        },

    ],

    faq: [
        {
            title: faker.commerce.product(),
            description: faker.commerce.productName()
        }, {
            title: faker.commerce.product(),
            description: faker.commerce.productName()
        }, {
            title: faker.commerce.product(),
            description: faker.commerce.productName()
        },
        {
            title: faker.commerce.product(),
            description: faker.commerce.productName()
        }, {
            title: faker.commerce.product(),
            description: faker.commerce.productName()
        }, {
            title: faker.commerce.product(),
            description: faker.commerce.productName()
        },
    ]

}
