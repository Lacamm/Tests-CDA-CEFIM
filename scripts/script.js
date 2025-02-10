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

        let tache = {titre, description, date, priorite}
        //console.log("Tâche créée :", tache)        

        // On sauvegarde la tâche dans le LocalStorage
        let listeTaches = getTachesFromLocalStorage()
        listeTaches.push(tache)
        localStorage.setItem("ListeTaches", JSON.stringify(listeTaches))

        // Affichage de la tâche
        afficherTache(tache)

        // Réinitialiser le formulaire
        document.getElementById("index-form").reset()

    } catch(erreurCreationTache) {
        console.log("Erreur lors de la creation de la tache")
    }
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
 * Fonction qui permet de récupérer la liste des tâches stockées localement
 * 
 * @returns Un tableau de Strings
 */
function getTachesFromLocalStorage() {
    return JSON.parse(localStorage.getItem("ListeTaches")) || []
}


function afficherTache(tache) {
    //console.log(tache)
    // On créé la nouvelle balise
    let tacheHTML = document.createElement("tr")
    tacheHTML.classList.add(tache.priorite) // gestion de la classe pour lui appliquer la couleur appropriée
    tache.id = tache.id || Date.now(); // Génère un ID unique si inexistant (pour faciliter la gestion des changements de statut)
    tacheHTML.innerHTML = ` 
        <th class="th-titre">${tache.titre}</th>
        <td class="td-desc">${tache.description}</td>
        <td>${tache.date}</td>
        <td>${tache.priorite}</td>
        <td>
            <select class="index-table-statut" id="index-table-statut-${tache.id}">
                <option value="En cours" selected>En cours</option>
                <option value="Terminée">Terminée</option>
            </select>
        </td>
        <td>
            <div class="div-action">
                <img src="images/poubelle.png" class="btn-suppr-tache" alt="X">
            </div>
        </td>
    `

    //Ajout d'un event pour mettre à jour le statut
    tacheHTML.selec

    // Ajout d'un event pour supprimer la tâche
    tacheHTML.querySelector(".btn-suppr-tache").addEventListener("click", function() {
        supprTache(tache)
        tacheHTML.remove()
    })

    // On rajoute la tache au tableau
    document.getElementById("index-table-corps").appendChild(tacheHTML)
}


/**
 * Fonction qui supprime la tâche du LocalStorage et met à jour ce dernier
 * 
 * @param {tache} tacheASuppr : Notre tâche à supprimer
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



/**************************** Fonctionement principal ***************************/

//On charge la liste par défaut des taches
// afficherTache(tache1)
// afficherTache(tache2)
// afficherTache(tache3)

// On charge les tâches qui sont dans le LocalStorage au lancement de l'appli
document.addEventListener("DOMContentLoaded", chargerTaches)

// Ici, on veut vérifier quand l'utilisateur appuie sur le bouton pour ajouter une tache 
let form = document.getElementById("index-form")
form.addEventListener("submit", (event) => {
    event.preventDefault() // On empêche le rechargement par défaut de la page
    creerTache()// Gère la création d'une tâche
})

// On vérifie lorsque le statut d'une tâche a été modifié
document.querySelectorAll(".index-table-statut").forEach(select => {
    console.log("ici")
    select.addEventListener("change", (event) => {
        console.log(`Tâche modifiée : ${event.target.id}, Nouveau statut : ${event.target.value}`)
    })
})
