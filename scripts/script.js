/*********************************************************************************
 *                                                                               * 
 *     Fichier qui contient toutes les fonctions utilisées par l'appli web       *
 *                                                                               * 
 ********************************************************************************/

/*              Fonctions principales (création et affichage)                   */

/**
 * Fonction qui permet de créer une tâche et de l'ajouter dans le tableau et l'enregistrer dans le localStorage
 */
function creerTache() {
    try {
        // On récupère sur la page, toutes les valeurs des éléments nécessaires à la création de la tache
        let titre = document.getElementById("index-form-nom-tache").value
        let description = document.getElementById("index-form-description-tache").value
        let date = document.getElementById("index-form-echeance").value
        let priorite = document.getElementById("index-form-priorite").value
        let statut = "En cours"

        // On crée notre objet "Tache"
        let tache = {titre, description, date, priorite, statut}
        
        // Affichage de la tâche
        afficherTache(tache)

        // On sauvegarde la tâche dans le LocalStorage
        let listeTaches = getTachesFromLocalStorage()
        listeTaches.push(tache)
        localStorage.setItem("ListeTaches", JSON.stringify(listeTaches))

        // Réinitialiser le formulaire
        document.getElementById("index-form").reset()

    } catch(erreurCreationTache) {
        console.log("Erreur lors de la creation de la tache") // Gestion de l'erreur pour la création de tâche
    }
}


/**
 * Fonction qui permet d'afficher une tâche, de vérifier les valeurs des champs de la tâche
 * pour appliquer le style correspondant, et l'option pour la supprimer
 * @param {Object} tache 
 */
function afficherTache(tache) {
    // On prépare la nouvelle balise à afficher
    let tacheHTML = document.createElement("tr")
    tacheHTML.classList.add(tache.priorite) // gestion de la classe pour lui appliquer la couleur de fond appropriée
    
    // On créé un élément select à part, pour pouvoir gérer plus facilement le statut
    statutSelect = document.createElement("select")
    statutSelect.classList.add("index-table-statut")
    statutSelect.innerHTML = `
        <option value="En cours">En cours</option>
        <option value="Terminée">Terminée</option>
    `
    // On vérifie si on applique bien les bonnes valeurs de statut et fonds de couleurs au chargement des tâches
    statutSelect.value = tache.statut || "En cours"
    changerFondTacheTerminee(tacheHTML, statutSelect.value, tache.priorite) 

    // On créé la nouvelle balise pour contient la tâche
    tacheHTML.innerHTML = ` 
        <th class="th-titre">${tache.titre}</th>
        <td class="td-desc">${tache.description}</td>
        <td>${tache.date}</td>
        <td>${tache.priorite}</td>
        <td class="index-table-statut"></td>
        <td>
            <div class="div-action">
                <img src="images/poubelle.png" class="btn-suppr-tache" alt="X">
            </div>
        </td>
    `

    // On insère le select avec la bonne valeur
    tacheHTML.querySelector(".index-table-statut").appendChild(statutSelect);

    //Ajout d'un event pour mettre à jour le statut
    statutSelect.addEventListener("change", () => {
        updateTacheTerminee(tache, statutSelect.value)
        changerFondTacheTerminee(tacheHTML, statutSelect.value, tache.priorite) 
    })

    // Ajout d'un event pour supprimer la tâche
    tacheHTML.querySelector(".btn-suppr-tache").addEventListener("click", () => {
        supprTache(tache)
        tacheHTML.remove()
    })

    // On rajoute la tache au tableau
    document.getElementById("index-table-corps").appendChild(tacheHTML)
}


/*                         Stockage et Mise à jour                             */

/**
 * Fonction qui permet de récupérer la liste des tâches stockées localement
 * 
 * @returns Un tableau de Strings
 */
function getTachesFromLocalStorage() {
    return JSON.parse(localStorage.getItem("ListeTaches")) || []
}


/**
 *  Fonction qui permet de charger toutes les tâches stockées dans le LocalStorage
 */
function chargerTaches() {
    let listeDesTaches = getTachesFromLocalStorage()
    listeDesTaches.forEach(element => {
        afficherTache(element)
    })
}


/**
 * Fonctione qui charge la liste par défaut des taches dans le localStorage, 
 * pour qu'elles puissent avoir le même comportement que les autres
 */
function loadTachesDef() {
    let listeTaches = getTachesFromLocalStorage()
    if (listeTaches.length < 3 ) {
        listeTaches.push(tache1)
        listeTaches.push(tache2)
        listeTaches.push(tache3)
        localStorage.setItem("ListeTaches", JSON.stringify(listeTaches))
    }
}


/*                         Actions sur les tâches                              */

/**
 * Fonction qui supprime la tâche du LocalStorage et met à jour ce dernier
 * 
 * @param {Object} tacheASuppr : Notre tâche à supprimer
 */
function supprTache(tacheASuppr) {
    let listeTaches = getTachesFromLocalStorage()
    // On filtre les tâches qui sont toutes les autres que celle que l'on veut supprimer, pour pouvoir les garder
    let updateListeTaches = listeTaches.filter(tache =>
        tache.titre !== tacheASuppr.titre || 
        tache.description !== tacheASuppr.description || 
        tache.date !== tacheASuppr.date || 
        tache.priorite !== tacheASuppr.priorite
    )
    // Mise à jour du stockage
    localStorage.setItem("ListeTaches", JSON.stringify(updateListeTaches))
}


/**
 * Fonction qui gère l'affichage des tâches lorsqu'elles passent de "En cours" à "Terminée"
 * 
 * @param {Object} tache 
 * @param {String} statut 
 * @param {String} priorite 
 */
function changerFondTacheTerminee(tache, statut, priorite) {
    if (statut === "Terminée") {
        tache.classList.remove(priorite)
        tache.classList.add("Terminée")
    } else {
        tache.classList.remove("Terminée")
        tache.classList.add(priorite)
    }
}


/**
 * Fonction qui modifie dans le localStorage la valeur de statut d'une tâche
 * @param {Object} tache 
 * @param {String} nouveauStatut 
 */
function updateTacheTerminee(tacheModifiee, nouveauStatut) {
    let listeTaches = getTachesFromLocalStorage()
    listeTaches.forEach(elem => {
        if (
            tacheModifiee.titre === elem.titre && tacheModifiee.description === elem.description &&
            tacheModifiee.date === elem.date && tacheModifiee.priorite === elem.priorite
        ) {
            elem.statut = nouveauStatut   
            console.log(nouveauStatut) 
        }
    })
    console.log(tacheModifiee)
    localStorage.setItem("ListeTaches", JSON.stringify(listeTaches))
}


/*                              Filtrage et Tri                                */
 
/**
 * Fonction qui permet de trier les tâches selon leur dates d'échéance
 */
function triDate() {
    // On récupère la liste des tâches affichées et leur données stockées pour y appliquer le tri par date
    let listeTaches = getTachesFromLocalStorage()
    let listeAffichée = document.getElementById('index-table-corps')

    // On effectue le tri sur listeTaches en comparant à chaque fois 2 elements du tableau entre  eux
    listeTaches.sort((a,b) => {
        let dateA = new Date(a.date) // On récupère la date de la tâche a
        let dateB = new Date(b.date) // On récupère la date de la tâche b 
        return triAscendant ? dateA - dateB : dateB - dateA // Condition ternaire pour gérer le tri si ascendant ou descendant
        // Suivant l'ordre de tri, on inverse les 2 tâches ou on ne fait rien  
    })

    // On vide la liste affichée avant de la remplir avec les tâches triées
    listeAffichée.innerHTML = "";
    listeTaches.forEach(afficherTache);

    // Mise à jour de la variable globale
    triAscendant = !triAscendant

    // Petite indication visuelle du tri par Echéance
    // triAscendant ? mettreAJourTexteBoutonEcheance(0) : mettreAJourTexteBoutonEcheance(1)
}


/**
 * Fonction qui permet le tri selon les différentes priorités des tâches
 * @param {Number} ordre 
 */
function triPriorite(ordre) {
    // On récupère la liste des tâches affichées et leur données stockées pour y appliquer le filtrage
    let listeTaches = getTachesFromLocalStorage()
    let listeAffichée = document.getElementById('index-table-corps')

    // Changer l'état du tri à chaque clic (0 -> 1 -> 2 -> 0 -> ...)
    // 0 : Pas de tri
    // 1 : Tri de Elevée -> Moyenne -> Basse
    // 2 : Tri de Basse -> Moyenne -> Elevée
    etapeTriPriorite = (ordre + 1) % 3;

    if (ordre === 0) {// Tri par défaut (non trié)
        listeTaches = getTachesFromLocalStorage(); 
    } else { // Tri selon la priorité (ascendant ou descendant)
        // Variable locale pour pouvoir comparer les tâches avec sort()
        const ordrePriorite = ["Elevée", "Moyenne", "Basse"];

        //Sélection des 2 tâches à comparer
        listeTaches.sort((a, b) => {
            let indexA = ordrePriorite.indexOf(a.priorite);
            let indexB = ordrePriorite.indexOf(b.priorite);
            
            // Tri ascendant ou descendant selon la priorité
            return ordre === 1 ? indexA - indexB : indexB - indexA;
        });    
    }

    // On réaffiche la liste triée selon le bon paramètre
    listeAffichée.innerHTML = "";
    listeTaches.forEach(afficherTache);

    // Petite indication visuelle du tri par priorité
    // mettreAJourTexteBoutonPriorite(ordre)
}


/**
 * Fonction qui permet le filtrage suivant le statut des tâches
 * @param {String} filtre 
 */
function fliterStatut(filtre){
    // On récupère la liste des tâches affichées et leur données stockées pour y appliquer le filtrage
    let listeTaches = getTachesFromLocalStorage()
    let listeAffichée = document.getElementById('index-table-corps')

    // On vide la liste affichée avant de la remplir à nouveau
    listeAffichée.innerHTML = "" 

    // On applique le nouveau filtre et réaffiche les tâche une à une si elles correspondent au filtre
    if (filtre === "") {
        filtre = "En cours"
        listeTaches.filter(tache =>  tache.statut === filtre).forEach(afficherTache)
    } else if (filtre === "En cours") {
        filtre = "Terminée"
        listeTaches.filter(tache =>  tache.statut === filtre).forEach(afficherTache)
    }  else if (filtre === "Terminée") {
        filtre = ""
        listeTaches.forEach(afficherTache);
    } 
    
    // Mise à jour de la variable globale
    filtreSt = filtre
}


/*                          Amélioration visuelles                             */

/**
 * J'ai commenté cess fonctions et leurs appels, car les filtrages se réinitialisent quand on veut en appliquer d'autres,
 * or le texte lui ne change pas, ce qui induit l'utilisateur en erreur
 */



// /**
//  * Fonction qui modifie le texte du bouton de tri pour un ajouter une indication visuelle
//  * @param {Number} ordre 
//  */
// function mettreAJourTexteBoutonEcheance(ordre) {
//     let textes = ["Tri : Echéance ↑", "Tri : Echéance ↓"];
//     btnTriDate.textContent = textes[ordre];
// }


// /**
//  * Fonction qui modifie le texte du bouton de tri pour un ajouter une indication visuelle
//  * @param {Number} ordre 
//  */
// function mettreAJourTexteBoutonPriorite(ordre) {
//     let textes = ["Priorité", "Tri : Priorité ↑", "Tri : Priorité ↓"];
//     btnTriPriorite.textContent = textes[ordre];
// }



/*********************************************************************************
 *                                                                               * 
 *                             Fonctionement principal                           *
 *                                                                               * 
 ********************************************************************************/

// On charge la liste par défaut des taches
loadTachesDef()


// On charge les tâches qui sont dans le LocalStorage au lancement de l'appli
document.addEventListener("DOMContentLoaded", chargerTaches)


// On veut vérifier quand l'utilisateur appuie sur le bouton pour ajouter une tache 
let form = document.getElementById("index-form")
form.addEventListener("submit", (event) => {
    event.preventDefault() // On empêche le rechargement par défaut de la page, car c'est un event "submit"
    creerTache()
})


// On veut savoir quand l'utilisateur appuie sur le bouton de filtrage par statut
let btnFiltrage = document.getElementById("btn-filtre-statut")
let filtreSt = "" // Variable globale pour savoir sur quel filtre on est
btnFiltrage.addEventListener("click", () => {
    fliterStatut(filtreSt)
})


// On veut savoir quand l'utilisateur clique sur le bouton pour trier par date
let btnTriDate = document.getElementById("btn-tri-date")
let triAscendant = true // Variable globale pour connaître la méthode de tri de la date (du plus récent ou plus ancien)
btnTriDate.addEventListener("click", () => {
    triDate(triAscendant)
})


//On veut savoir quand l'utilisateur clique pour trier selon les différentes priorités
let btnTriPriorite = document.getElementById("btn-tri-priorite")
let etapeTriPriorite = 1 // Variable globale pour connaître la méthode de tri selon la priorité (Elevée ou Moyenne ou Basse ou pas d'ordre)

btnTriPriorite.addEventListener("click", () => {
    triPriorite(etapeTriPriorite)
})