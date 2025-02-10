 - Tests d'amission CDA - Gestionnaire de taches

Cette appli web de gestion de tâches est le test d'admission que j'ai réalisé pour le formation Concepteur Développeur d'applications au CEFIM.

 - Installation

Il faut d'abord extraire les fichiers de l'archive ZIP, puis ouvrir le fichier "index.html" dans un navigateur avec un clic droit, "ouvrir avec".


 - Comment utiliser l'application

Cette appli web permet de faire principalement 2 choses: Interagir avec une liste de tâches et remplir un formulaire pour en créer une nouvelle.

Pour créer une nouvelle tâche, il faut renseigner son titre (obligatoire), une description (optionnelle), une échéance (obligatoire) et une priorité (Moyenne par défaut). On clique sur le bouton "Ajouter" et la tâche est créée.
Concernant la liste des tâches, on peut y consulter toutes les tâche existantes, supprimer celles que l'on ne veut plus dans la liste, passer du statut "En cours" à "Terminé" et inversement si besoin, les filtrées selon leur statut ou leur priorité. Enfin, une indication visuelle nous permet de repérer facilement de quelle priorité est chaque tâche.


 - Expliquer son fonctionnement

Pour ajouter une tâche, on remplit un formulaire. Un titre (input text de 100 caractères max required), une description (textaera de 500 caractères max), une échéance (date required) et un niveau de priorité (select avec "Moyenne" par défaut). Un bouton "Ajouter" permet de :
. Empêcher rechargement de page automatique lorsque l'on utilise le formulaire pour assurer son bon fonctionnement
.


 - Pistes d'améliorations

.Ajouter plus de blocs try/catch avec des pop-ups pour mieux spécifier les erreurs à l'utilisateur

.Modifier le bouton "Ajouter" pour rajouter un symbole + avec une bordure entre le symbole et le texte ? (Faire un logo ?)
EX : 
 _________
|+|Ajouter|
 ––––––––– 

.Soit ajouter une scroll bar si la liste des tâches est trop longue pour le page, soit faire en sorte que le formulaire d'ajout descende dans la page en restant à droite et suis l'utilisateur suivant si il monte ou descend dans la page.



. Création d'une session utilisateur avec login/mdp

. Intégration d'un calendrier


 - Autres choses ?