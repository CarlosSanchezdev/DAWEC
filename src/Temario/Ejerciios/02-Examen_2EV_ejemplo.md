Centro Integrado de Formación Profesional Avilés 
 
Desarrollo de Aplicaciones Web 
Desarrollo Web en Entorno Cliente 
 
PRUEBA PRÁCTICA 2ª EV 
 
Entrega de la prueba 
Exporta el contenido de tu directorio con el código y súbelo a la plataforma en la tarea asignada 
para ello. No incluyas node_modules en el archivo comprimido. 
 
Prueba práctica 
 
Se pide diseñar una aplicación en React llamada SpotifEx en la que se pueden consultar datos de 
canciones de Spotify. El esqueleto de la aplicación te lo puedes bajar de la siguiente URL: 
https://bit.ly/spotifex (descárgalo en la unidad de datos D). 
 
Se piden los siguientes apartados: 
 
1. (2 puntos) Crea un componente SpotiMain el cual contendrá a todos los demás componentes 
a continuación. (Unidad 5). Este componente será el que se visualice al abrir la aplicación. 
2. (2 puntos) Dentro de SpotiMain, diseña una función asíncrona que permita obtener un array 
con todas las canciones del JSON incluido en el proyecto. La ruta para acceder a él es 
/json/Spotify.json (Unidad 8). 
3. (2,5 puntos) Crea un nuevo componente ListadoCanciones que muestre la lista completa de 
canciones con en forma tabular. Debe contener los siguientes campos: Id de la pista, nombre, 
artista, nombre del álbum y duración en segundos. La lista de canciones se le pasará como 
prop. (Pista: para usar la colección en el nuevo componente debe ir desestructurada, es decir, 
encerrada entre llaves). (Unidades 5 y 6).  
4. (2,5 puntos) Crea un componente FiltradoCanciones que contenga un cuadro de texto. En 
este cuadro, se pedirá un nombre de artista y, al ir modificándolo, cargará una lista con sus 
canciones (basta con incluir el título). La lista de canciones también se le pasará como prop 
(Unidad 7). 
5. (1 punto) Crea un componente MasPopular que muestre la canción más popular de la lista. 
También se le pasará la lista de canciones como prop. (Unidades 5 y 6).  
 
Notas de diseño: Es muy recomendable que trabajéis en cada componente con variables de estado.  
 
 
 


