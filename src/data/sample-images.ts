
export const sampleImages = [
    {
        img: 'https://images.unsplash.com/photo-1565299624946-b28f40a0ae38?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=MnwzODg2NDR8MHwxfHNlYXJjaHw2fHxmb29kfGVufDB8fHx8MTY3MTg3MDI0Ng&ixlib=rb-4.0.3&q=80&w=1080',
        author: '@briewilly',
        authorLink: 'https://unsplash.com/@briewilly'
    },
    {
        img: 'https://images.unsplash.com/photo-1513862153653-f8b7324e1779?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=673&q=80',
        author: '@moniqa',
        authorLink: 'https://unsplash.com/@moniqa'
    },
    {
        img: 'https://images.unsplash.com/photo-1607269832078-1a3bd22a306d?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=687&q=80',
        author: '@rabbit_in_blue',
        authorLink: 'https://unsplash.com/@rabbit_in_blue'
    },
    {
        img: 'https://images.unsplash.com/photo-1637361973734-5faf9b1e923e?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=687&q=80',
        author: '@lucaslobak',
        authorLink: 'https://unsplash.com/@lucaslobak'
    },
    {
        img: 'https://images.unsplash.com/photo-1562007908-17c67e878c88?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=687&q=80',
        author: '@dilja96',
        authorLink: 'https://unsplash.com/@dilja96'
    },
    {
        img: 'https://images.unsplash.com/photo-1574926054530-540288c8e678?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=687&q=80',
        author: '@victoriakosmo',
        authorLink: 'https://unsplash.com/@victoriakosmo'
    },
    {
        img: 'https://images.unsplash.com/photo-1484723091739-30a097e8f929?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=749&q=80',
        author: '@miracletwentyone',
        authorLink: 'https://unsplash.com/@miracletwentyone'
    },
    {
        img: 'https://images.unsplash.com/photo-1604504573541-bb5f1c53c20f?q=80&w=800&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
        author: '@eugene_kuznetsov',
        authorLink: 'https://unsplash.com/@eugene_kuznetsov'
    }
].map((si) => {
    return {
        ...si,
        imgForSubmit: si.img
    }
});

export const defaultImage = sampleImages[7]