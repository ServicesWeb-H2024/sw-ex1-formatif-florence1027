const Titre = require("../models/titre.model.js");

exports.listeTitre = (req, res) => {
    var page = 1;
    var show_type = 1;
    
    if(!req.query.page || parseInt(req.query.page) < 0){
        res.status(400);
        res.setHeader('Content-Type', 'application/json');
        res.send(JSON.stringify({
            "erreur" : 'La page ' + req.query.page + ' est invalide'
            })
        );
        return;
    }
    else{
        page = parseInt(req.query.page);
    }
    
    if(!req.params.type_titre){
        res.status(400);
        res.setHeader('Content-Type', 'application/json');
        res.send(JSON.stringify({
            "erreur" : 'Le type ' + req.params.type_titre + ' est absent'
            })
        );
        return;
    }
    else{
        show_type = req.params.type_titre;
    }

    //Traduction de show_type 
    if (show_type == "film") {
        show_type = "Movie";
    }
    else if (show_type == "serie") {
        show_type = "TV Show";
    }
    else {
        res.status(400);
        res.setHeader('Content-Type', 'application/json');
        res.send(JSON.stringify({
            "erreur" : 'Le type ' + show_type + ' est invalide'
            })
        );
        return;
    }

    Titre.listeTitre(show_type)
    .then((titre) => {
        // S'il n'y a aucun résultat, on retourne un message d'erreur avec le code 404
        if (!titre[0]) {
            res.status(404);
            res.send({
                message: 'Titres introuvables'
            });
            return;
        }

        var depart = 0;
        if (page > 1) {
            depart = 10 * (page - 1);
        }
        var pageTitre = titre.slice();//Car sinon on copie la référence de la page des titres et on perds les données
        pageTitre = pageTitre.splice(depart,10);

        var urlSuivante = null;
        if (page < Math.ceil(titre.length / 10)) {
            var nbPage = page + 1;
            urlSuivante = "/api/titres/film?page=" + nbPage;
        }
        res.status(200)
        res.setHeader('Content-Type', 'application/json');
        res.send(JSON.stringify({
            "titres" : pageTitre,
            "filtre" : show_type,
            "page" : page,
            "url_page_suivante": urlSuivante
            })
        );
    })
    // S'il y a eu une erreur au niveau de la requête, on retourne un erreur 500 car c'est du serveur que provient l'erreur.
    .catch((erreur) => {
        console.log('Erreur : ', erreur);
        res.status(500)
        res.setHeader('Content-Type', 'application/json');
        res.send(JSON.stringify({
            "erreur" : "Echec lors de la récupération de la liste de des titres"
            })
        );
    });
};