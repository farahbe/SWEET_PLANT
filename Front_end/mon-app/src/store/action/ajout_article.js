export const ajout_article = (all_article) => ({
    type: "ENREGISTRE_ARTICLE",
    article: all_article
})

export const creatstorearticle = (storearticle,admin) => ({ //creer une const et un argument (storearticle)
    type: "CREATE_STORE_ARTICLE",// quel type 
    createarticleforstore: storearticle, // createarticleforstore recoit storearticle
    id: admin.id,
    payload: storearticle
})

