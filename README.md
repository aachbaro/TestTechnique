Test technique pour l'entreprise Starteg'in  

1 - Cloner le repository  
git clone git@github.com:aachbaro/TestTechnique.git


Côté backend :  
1 - Installer les dependances:  
npm install  
  
2 - Creer le fichier .env:  
copier le .env envoyé dans le mail, sinon créer une base de donnée avec Atlas sur le site de MongoDB, et mettre dans le .env  
les variables MONGODB_URL avec la connexion string, PORT avec le port d'écoute et JWT_SECRET avec un mot passe pour la signature  
de token par le serveur.

3 - Lancer le serveur:
npm start

Côté frontend :  
1 - Installer les dependances:   
npm install  
  
2 - Lancer le serveur:  
npm start  
