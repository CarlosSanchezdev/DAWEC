 
 
 
 
 
 
 
 
 
 
 
 
 
 
Centro Integrado de Formación Profesional 
AVILÉS 
Principado de Asturias 
 
 
 
 
 
ACTIVIDAD INDIVIDUAL  
PRIMERA EVALUACIÓN 
 
 
 
 
 
 
 
 
DISEÑO WEB EN ENTORNO CLIENTE 
 
2º CURSO 
C.F.G.S. DESARROLLO DE APLICACIONES WEB (DISTANCIA) 
 
Centro Integrado de Formación Profesional Avilés 
 
Desarrollo Web en Entorno Cliente (Distancia) 
Actividad individual – 1ª evaluación 
 
 
 
 
1 
 
1. RESULTADOS DE APRENDIZAJE QUE SE TRABAJAN EN ESTA ACTIVIDAD 
 
[RA2] Escribe sentencias simples, aplicando la sintaxis del lenguaje y verificando su ejecución sobre 
navegadores web. 
[RA3] Escribe código, identificando y aplicando las funcionalidades aportadas por los objetos 
predefinidos del lenguaje. 
[RA6] Desarrolla aplicaciones web analizando y aplicando las características del modelo de objetos 
del documento. 
 
2. INTRODUCCIÓN 
 
MaderAvilés es una carpintería de maderas al corte donde los clientes acuden para hacer pedidos 
de piezas de madera que son cortadas en el almacén a las medidas indicadas por el cliente. El 
procedimiento habitual es el siguiente: el cliente llega con un pedido de varias piezas para cortar y 
el empleado introduce el pedido en el programa. Cada pedido se identifica con un número. 
3. TIPOS DE DATOS 
 
De un modo general, la aplicación manejará los siguientes datos: 
 Pedidos almacenará pedidos realizados por los clientes. Se deben utilizar los tipos de datos 
más adecuados a cada campo (entero, decimal, booleano, cadena, etc.). Debe incluir la 
siguiente información: 
o Número de pedido: el número único que identifica al pedido. 
o Cliente: nombre y apellidos del cliente, que permitirá al menos 50 caracteres. 
o Fecha de pedido: la fecha de realización del pedido.  
o Procesado: que indicará si el pedido ya ha sido procesado de forma completa 
o Servido: que indicará si el pedido ya ha sido servido al cliente.  
 Piezas. En este tipo de datos se recogen las piezas que pueden servirse en un pedido. Debe 
incluir la siguiente información: 
o Número de pieza. Aunque son piezas al corte, se identificará cada una de ellas de 
forma única con un número entero. 
o Número de pedido. Pedido al que está asociada la pieza. Al ser a medida, cada pieza 
solo puede pertenecer a un pedido. 
o Largo: el largo de la pieza en cm. 
o Ancho: el ancho de la pieza en cm.  
o Grosor: el grosor de la pieza en cm.  
o Color: el color del chapeado de la pieza. Si se guarda con el color “Natural” quiere 
decir que no lleva chapeado.  
o AmbasCaras: si deben estar chapeadas las dos caras  
o Cortada: que indicará si la pieza ya ha sido cortada 
 
 
Centro Integrado de Formación Profesional Avilés 
 
Desarrollo Web en Entorno Cliente (Distancia) 
Actividad individual – 1ª evaluación 
 
 
 
 
2 
 
4. FUNCIONALIDAD JAVASCRIPT 
 
Como ya se ha explicado antes, la aplicación será capaz de gestionar la carpintería MaderAvilés. 
Existirá una página principal desde la que se podrán abrir cada una de las páginas correspondientes 
a cada apartado: pedidos, piezas y detalles de pedido. 
4.1. GESTIÓN DE PEDIDOS 
 
Se permitirá dar de alta, baja, modificar y consultar pedidos. Se deberá comprobar lo siguiente: 
a) Que no se intenta dar de alta un número de pedido ya existente y que este es mayor o igual 
que 1 no admitiendo decimales. 
b) Que los tipos son adecuados a cada campo. 
c) Que la fecha de pedido tiene un formato correcto. 
d) Que la fecha de pedido no es posterior al día en el que se registra. 
4.2. GESTIÓN DE PIEZAS 
 
La aplicación permitirá dar de alta, baja, modificar y consultar piezas de carpintería. Se deberá 
comprobar lo siguiente: 
a) Que no se intenta dar de alta un número de pieza ya existente y que este es mayor o igual 
que 1 no admitiendo decimales. 
b) Que el número de pedido introducido ya existe en la lista de pedidos. 
c) Que los tipos son adecuados a cada campo. 
d) Que se tienen en cuenta los límites inferiores de los campos numéricos (en medidas, que sean 
mayores que 0). 
4.3. DETALLE DE PEDIDO 
 
El sistema permitirá consultar el detalle de un pedido. Este contendrá el listado de piezas 
correspondiente a un pedido dado su número. Además, mostrará dos datos: superficie y volumen. 
Un ejemplo de tabla sería el siguiente: 
 
Num. Pieza 
Largo 
Ancho 
Grosor 
Color 
Superficie 
Volumen 
 
 
 
 
 
 
 
 
 
 
 
 
 
 
 
 
 
 
 
 
 
 
 
 
 
 
 
 
 
4.4. PERSISTENCIA DE DATOS 
 
El sistema permitirá almacenar los datos usando LocalStorage. Al arrancar el sistema se pueden 
cargar una serie de registros de ejemplo si así se desea. 
Centro Integrado de Formación Profesional Avilés 
 
Desarrollo Web en Entorno Cliente (Distancia) 
Actividad individual – 1ª evaluación 
 
 
 
 
3 
 
5. RECOMENDACIONES DE DISEÑO 
 
Se valorará positivamente la separación lógica del código JavaScript en ficheros .js dejando que el 
código HTML contenga solo la parte imprescindible de marcado junto con los scripts mínimos 
necesarios. También aspectos de diseño (desplegables en datos como el número de pedido, color, 
etc.).  
6. ENTREGA DE LA PRÁCTICA 
 
La práctica estará completamente alojada en un repositorio de GitHub, aunque también se podrá 
entregar como un archivo zip que contenga la solución. Formará parte de la evaluación el trabajo 
realizado sobre esta plataforma. La actividad puede estar subida progresivamente al repositorio 
para poder ver el trabajo realizado durante toda la evaluación. 
7. EVALUACIÓN 
 
Elemento 
% sobre calificación 
Unidades 
Tipos de datos 
5% RA3: 5% 
CRUD en Pedidos 
25% RA2: 9%, RA3: 8%, RA6: 8% 
Validación en Pedidos 
10% RA2: 4%, RA3: 3%, RA6: 3% 
CRUD en Piezas 
25% RA2: 9%, RA3: 8%, RA6: 8% 
Validación en Piezas 
10% RA2: 4%, RA3: 3%, RA6: 3% 
Detalle de pedido 
15% RA2: 5%, RA3: 5%, RA6: 5% 
Diseño (recomendaciones) 
10% RA2: 4%, RA3: 4%, RA6: 2% 
 
