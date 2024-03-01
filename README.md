# Proyecto vue 

## Manual de la apliación

Para usar mi aplicación, los usuarios deben crear una cuenta y luego iniciar sesión para acceder a una amplia selección de cómics. Podrán añadirlos al carrito y comprarlos con una interfaz sencilla para ingresar sus datos. También podrán realizar comentarios en los cómics o simplemente verlos para obtener más feedback antes de realizar la compra.

Enlace al video explicativo https://drive.google.com/file/d/1NaYhEzMi3mTPegI2ivvNSvpgrIZIdrxb/view?usp=sharing

He tenido un problema importante con el audio del video debido a un error de drivers de mi portátil y no tenía forma de ponerselo

Como problemas de la aplicación darñia tres : en la validación de la compra debido a que he tenido falta de tiempo, otro problema es que el apartado de ofertas no esta bien programado también debido a el tiempo y como último que no he podido aplicarle el modo noche .

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
