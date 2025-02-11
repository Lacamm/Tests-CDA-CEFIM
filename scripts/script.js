/*********************************************************************************
 * 
 * Fichier qui contient toutes les fonctions utilisées par l'appli web
 * 
 *********************************************************************************/



/*********************************** Fonctions ***********************************/

/**
 * Fonction qui permet de créer une tâche et de l'ajouter dans le tableau, avec l'option de pouvoir la supprimer
 */
function creerTache() {
    try {
        // On récupère sur la page, toutes les valeurs des éléments nécessaires à la création de la tache
        let titre = document.getElementById("index-form-nom-tache").value
        let description = document.getElementById("index-form-description-tache").value
        let date = document.getElementById("index-form-echeance").value
        let priorite = document.getElementById("index-form-priorite").value
        let statut = "En cours"

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
        console.log("Erreur lors de la creation de la tache")
    }
}


function afficherTache(tache) {
    // On prépare la nouvelle balise
    let tacheHTML = document.createElement("tr")
    tacheHTML.classList.add(tache.priorite) // gestion de la classe pour lui appliquer la couleur appropriée
    
    statutSelect = document.createElement("select")
    statutSelect.classList.add("index-table-statut")
    statutSelect.innerHTML = `
        <option value="En cours">En cours</option>
        <option value="Terminée">Terminée</option>
    `
    // On vérifie si on applique bien les bonnes valeurs et fonds de couleurs au chargement des tâches
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

    //tacheHTML.querySelector(".index-table-statut").value
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
 * 
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


/**************************** Fonctionement principal ***************************/

// On charge la liste par défaut des taches
loadTachesDef()

// On charge les tâches qui sont dans le LocalStorage au lancement de l'appli
document.addEventListener("DOMContentLoaded", chargerTaches)

// Ici, on veut vérifier quand l'utilisateur appuie sur le bouton pour ajouter une tache 
let form = document.getElementById("index-form")
form.addEventListener("submit", (event) => {
    event.preventDefault() // On empêche le rechargement par défaut de la page
    creerTache()// Gère la création d'une tâche
})
