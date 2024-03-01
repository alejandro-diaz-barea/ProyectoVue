# Proyecto vue 

## Manual de la apliación

Para usar mi aplicación, los usuarios deben crear una cuenta y luego iniciar sesión para acceder a una amplia selección de cómics. Podrán añadirlos al carrito y comprarlos con una interfaz sencilla para ingresar sus datos. También podrán realizar comentarios en los cómics o simplemente verlos para obtener más feedback antes de realizar la compra.

aqui enlace video

## Despliegue

Para el despliegue he utilizado netlify por lo comodo que resulta subir ahi la aplicación

Enlace del despliegue : https://65e220edffad9200a8180192--fascinating-madeleine-f5d7b4.netlify.app/#/

Para realizarlo localmente debes de:

    clonar el repositorio : https://github.com/alejandro-diaz-barea/ProyectoVue/tree/main

    npm install

    Por último "npm run dev" 

PD: Se debe de tener las depenedencias instaladas en el proyecto : Pinia y Vue router


Para desplegar el backend , que se realiza de manera local deberiamos de :

    clonar el repositorio : https://github.com/alejandro-diaz-barea/laravel

    chmod -R 775 storage
    chmod -R 775 bootstrap/cache

    Eso es para los permisos de la API, en cuanto a la realizacion debes de migrar y ejecutar los seeders con los siguientes comandos:

    ./vendor/bin/sail artisan migrate
    ./vendor/bin/sail artisan db:seed --class=NewsSeeder
    ./vendor/bin/sail artisan db:seed --class=ComicsSeeder


## Enlace a FIGMA

https://www.figma.com/file/pm1ixXHJoNlVaEwhdzCLwm/Untitled?type=design&node-id=0-1&mode=design&t=8k6n6aQ89kakLLAn-0
