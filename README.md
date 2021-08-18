# Api de de la app de pizzeria

### Descripcion:

Esta api se encarga de servir las rutas a la apliacacion de pizzeria para que esta
pueda logearse, registrarse, cambiar su contraseña entre otros.

Que cosas necesitas para correr el **Proyecto**:

* NodeJs => v12.18.3;
* NPM => v6.14.5;

### Instalación :wrench:

En el directorio del proyecto, puede ejecutar:

#### ``npm install``

Ejecuta la aplicación en modo de desarrollo.
#### ``npm run nodemon o npm start``
Corre en el puerto _**http://localhost:5000**_.

### Estructura de carpeta

~~~
├── public
      ├── assets
      ├── uploads
├── server
      ├── class
            ├── store.js
            ├── stores.js
      ├── config
            ├── config.js
            ├── db.js
            ├── mailer.js
      ├── controller
            ├── authController.js
            ├── editUserController.js
            ├── pizzeriaController.js
            ├── resetPasswordController.js
            ├── userController.js
      ├── middleware
            ├── auth.js
      ├── models
            ├── user.js
      ├── routes
            ├── index.js
      ├── views
            ├── reset-password.hbs
            ├── respChangePassword.hbs
      ├── index.js
├── .gitignore
├── package-lock.json
├── package.json
~~~

### Autor [:octocat:](https://github.com/OmarVargas235)

**_Omar Vargas_**
