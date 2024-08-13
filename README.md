Test technique pour l'entreprise Starteg'in  

1 - Cloner le repository  
git clone <repo>  
  
2 - Installer les dependances:  
npm install  
  
3 - Creer le fichier .env:  
copier le .env envoyé dans le mail, sinon créer une base de donnée avec Atlas sur le site de MongoDB, et mettre dans le .env  
les variables MONGODB_URL avec la connexion string, PORT avec le port d'écoute et JWT_SECRET avec un mot passe pour la signature  
de token par le serveur.
  
4 - Tester les routes  
J'ai pour ma part utilisé PostMan  
  
Pour /register:  
POST http://localhost:8000/register puis dans body en mode raw et JSON:  
{  
  "email": "email@exemple.com",  
  "password": "password"  
}  
Pour /login:  
POST http://localhost:8000/login puis dans body en mode raw et JSON:  
{  
  "email": "email@exemple.com",  
  "password": "password"  
}  
Pour /users:  
GET http://localhost:8000/users puis dans Header:  
Key: "Authorization"  
Value: Le token récupéré avec la route login  
