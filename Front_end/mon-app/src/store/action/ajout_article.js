export const ajout_article = (all_article) => ({
    type: "ENREGISTRE_ARTICLE",
    article: all_article
})

export const creatstorearticle = (storearticle) => ({ //creer une const et un argument (storearticle)
    type: "CREATE_STORE_ARTICLE",// quel type 
    id: storearticle.id_admin,
    payload: storearticle
})

