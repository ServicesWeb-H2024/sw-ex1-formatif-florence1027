// À ajuster selon la structure
const sql = require("../config/db.js");

// constructeur
const Titre = (titre) => {
    this.show_id = titre.show_id;
    this.show_type = titre.show_type;
    this.title = titre.title;
};

Titre.listeTitre = (show_type) => {
    return new Promise((resolve, reject) => {
        const requete = 'SELECT show_id, title FROM netflix_titles WHERE show_type = ?';
        const params = [show_type];

        sql.query(requete, params, (erreur, resultat) => {
            if (erreur) {
                // S'il y a une erreur, je la retourne avec reject()
                reject(erreur);
            }
            // Sinon je retourne le résultat sans faire de validation, c'est possible que le résultat soit vide
            resolve(resultat);
        });
    });
}


module.exports = Titre;