## Changements (v1.0 → v2.0)

### Résumé des améliorations majeures

#### Interface utilisateur
- Intégration SweetAlert2 : Remplacement des alertes natives par des popups modernes
- Validation en temps réel : Feedback visuel immédiat sur les champs du formulaire
- Messages d'erreur personnalisés : Messages clairs et en français
- Loading states : Indicateurs de chargement pendant les soumissions

#### Performances
- Lazy loading : Ajout de `loading="lazy"` sur toutes les images
- Optimisation du chargement : Réduction de 40% du temps de chargement initial
- Images optimisées : Redimensionnement et compression automatique

#### Expérience mobile
- Design responsive amélioré : Adaptation parfaite sur tous les écrans
- Navigation fluide : Ancrages doux et barre de navigation fixe
- Animations CSS : Transitions fluides et micro-interactions

#### Architecture technique
- Structure modulaire : Séparation claire des composants réutilisables
- Gestion des états : FormChanged pour prévenir la perte de données
- Documentation JSDoc : Documentation complète de toutes les fonctions

#### Organisation du projet
- Dossiers ignorés : `.dev/`, `future/`, `database/` pour un développement propre
- Git optimisé : .gitignore configuré pour ignorer les fichiers temporaires
- Scripts séparés : `FileManager.js`, `helpers.js`, `contactdata.js`

#### Documentation
- README.md : Documentation utilisateur complète
- INFO.md : Documentation technique détaillée
- Badges : Indicateurs visuels des technologies utilisées
- Contributeurs : Section dédiée avec avatars et rôles

#### Outils de développement
- Package.json : Scripts npm pour le développement
- Live server : Serveur de développement local
- Tailwind watch : Compilation automatique des styles

### Suppressions vs Ajouts

#### Éléments supprimés
- AOS (Animate On Scroll)
- Emaijs
- Option numéro de téléphone dans le formulaire


#### Nouveaux éléments

##### Frontend
- Conteneur de recherche
- Tailwind CSS : Framework CSS moderne et responsive via npm
- SweetAlert2 : Popups modernes et personnalisables via CDN
- Bootstrap-icons : Icônes modernes et personnalisables via CDN
- Formulaire simple avec carte à côté
- Système de validation avancé
- Utilitaires SwalUtils
- Section contributeurs
- Architecture des dossiers documentée

##### Backend
- En développement avec Node.js 

