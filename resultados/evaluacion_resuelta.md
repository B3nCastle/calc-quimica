# Evaluación Resuelta: Pensamiento Computacional INGT1048A

**Nombre:** Benjamín Castillo  
**Fecha:** 25-6-25  
**Profesor:** Gastón Rodríguez Wlack  

---

## Instrucciones
- Se transcriben las preguntas y respuestas de la evaluación.
- Se justifica si la respuesta es correcta o incorrecta.
- Se calcula el puntaje total obtenido.

---

## Parte 1: Verdadero o Falso (10 pts c/u)

| Nº | Pregunta | Respuesta dada | Justificación | Correcta | Puntaje |
|----|----------|----------------|---------------|----------|---------|
| 1  | En Arduino Uno, los pines analógicos están numerados como A0, A1, A2, etc. | V | Correcto. Los pines analógicos en Arduino Uno se identifican como A0, A1, etc. | V | 10 |
| 2  | Un float solo permite números enteros. | F | Correcto. Un float permite decimales, no solo enteros. | F | 10 |
| 3  | La función digitalWrite() permite enviar un valor HIGH o LOW a un pin configurado como salida. | V | Correcto. digitalWrite() controla el estado de un pin de salida. | V | 10 |
| 4  | pinMode(OUTPUT, 13); es correcto. | F | Correcto. El orden correcto es pinMode(13, OUTPUT). | F | 10 |
| 5  | El pin 13 en Arduino Uno está conectado a un LED interno. | V | Correcto. El pin 13 tiene un LED interno en la placa Arduino Uno. | V | 10 |
| 6  | Un ciclo while solo se ejecuta una vez. | F | Correcto. El ciclo while se ejecuta repetidamente mientras su condición sea verdadera. | F | 10 |
| 7  | La función Serial.begin(9600); inicializa la comunicación serial a 9600 baudios. | V | Correcto. Así se inicializa la comunicación serial. | V | 10 |
| 8  | La función Serial.print() se usa para mostrar valores en consola. | V | Incorrecto. Serial.print() muestra datos por el puerto serial, no por la consola. | F | 0 |
| 9  | El rango de valores que entrega analogRead() va de 0 a 1023. | V | Correcto. analogRead() entrega valores entre 0 y 1023. | V | 10 |
| 10 | Para convertir una lectura analógica a temperatura, puede usarse una ecuación de la recta. | V | Correcto. Es común usar una ecuación de la recta (y = mx + b) para convertir lecturas analógicas a unidades físicas. | V | 10 |
| 11 | digitalWrite(LED_BUILTIN, HIGH); apaga el LED. | F | Correcto. HIGH enciende el LED, LOW lo apaga. | F | 10 |
| 12 | En for(int = 0; i < 10; i--), el ciclo se ejecuta 10 veces. | F | Correcto. Con i-- el ciclo será infinito ya que i nunca llegará a 10. | F | 10 |
| 13 | analogRead() devuelve un número con decimales. | F | Correcto. analogRead() devuelve un número entero entre 0 y 1023. | F | 10 |
| 13.5 | Los tipos de estado en Arduino incluyen int, float y bool. | V | Incorrecto. Los tipos de datos en Arduino incluyen más que solo int, float y bool (también char, byte, long, etc). | F | 0 |

| 14 | El pin 0 del Arduino Uno no puede usarse para nada. | F | Correcto. El pin 0 puede usarse, aunque tiene funciones especiales (RX). | F | 10 |
| 15 | Si a = 5, se compara si a es igual a 5. | V | Correcto. La comparación es válida. | V | 10 |
| 16 | bool estado = true; es una declaración válida en Arduino. | V | Correcto. Es una declaración válida. | V | 10 |
| 17 | Los pines A0 a A5 pueden usarse solo como salidas digitales. | F | Incorrecto. Pueden usarse como entradas/salidas digitales y como entradas analógicas. | F | 10 |
| 18 | La instrucción pinmode(13, OUTPUT); es válida. | F | Correcto. La función correcta es pinMode() con M mayúscula, no pinmode(). | F | 10 |
| 19 | La función loop() se ejecuta infinitamente después del setup(). | V | Correcto. loop() se ejecuta en bucle tras setup(). | V | 10 |
| 19.5 | La función setup() se ejecuta una sola vez al encender el Arduino. | V | Correcto. setup() se ejecuta una única vez al iniciar el programa. | V | 10 |
| 20 | Serial.begin() debe ir dentro de loop() para funcionar. | F | Correcto. Serial.begin() debe ir en setup(), no en loop(). | F | 10 |
| 21 | Serial.print() se usa para mostrar texto por serial. | V | Correcto. Serial.print() muestra texto por el puerto serial. | V | 10 |
| 22 | La lectura de un sensor análogo entrega un valor entre 0 y 255. | F | Correcto. El rango es 0 a 1023 en Arduino Uno. | F | 10 |
| 23 | La frecuencia mínima para evitar que parpadee un LED es de aproximadamente 50 Hz. | V | Correcto. La frecuencia de parpadeo mínima para que el ojo humano perciba una luz continua es aproximadamente 50 Hz. | V | 10 |
| 24 | analogRead() funciona solo con pines digitales. | F | Correcto. analogRead() solo funciona con pines analógicos (A0-A5), no con pines digitales. | F | 10 |
| 25 | digitalRead(A0); se usa para leer sensores análogos. | F | Correcto. Para leer sensores análogos se usa analogRead(A0). | F | 10 |
| 26 | El setup() se ejecuta una vez por segundo. | F | Correcto. setup() se ejecuta solo una vez al inicio. | F | 10 |
| 27 | La conversión de análogo a digital en Arduino usa una resolución de 10 bits. | V | Correcto. La resolución es de 10 bits (0-1023). | V | 10 |
| 28 | No es necesario usar resistencia con los LEDs en Arduino. | F | Correcto. Siempre se recomienda usar resistencia para proteger el LED. | F | 10 |
| 29 | La declaración float valor = "3.5"; es válida. | F | Correcto. No es válida, debe ser float valor = 3.5; | F | 10 |
| 30 | int x = analogRead(10); es correcto para leer un sensor análogo. | F | Incorrecto. El pin 10 no es analógico, debe ser A0-A5. | F | 10 |
| 31 | La fórmula 2^n - 1 permite calcular el valor máximo del ADC. | V | Correcto. Es la fórmula para el valor máximo de un ADC de n bits. | V | 10 |
| 32 | El uso de for no permite controlar repeticiones. | F | Correcto. El for sí permite controlar repeticiones. | F | 10 |
| 33 | El valor LOW equivale a 5V. | F | Correcto. LOW equivale a 0V, HIGH a 5V. | F | 10 |
| 34 | En un pull-up, al presionar el botón se lee un 1. | F | Correcto. Se lee 0 al presionar el botón en pull-up. | F | 10 |
| 35 | La función delay(1000); detiene el programa por 1 segundo. | V | Correcto. delay(1000) detiene el programa por 1000 ms (1 s). | V | 10 |
| 36 | bool solo puede valer 0 o 2. | F | Correcto. bool solo puede valer 0 (false) o 1 (true). | F | 10 |
| 37 | El uso de for permite controlar repeticiones. | V | Correcto. El bucle for se usa para repetir instrucciones un número determinado de veces. | V | 10 |
| 38 | El valor LOW equivale a 5V. | F | Correcto. LOW equivale a 0V. | F | 10 |
| 39 | En un pull-up, al presionar el botón se lee un 1. | F | Correcto. Se lee 0 al presionar el botón en pull-up. | F | 10 |
| 40 | La función delay(1000); detiene el programa por 1 segundo. | V | Correcto. delay(1000) detiene el programa por 1000 ms (1 s). | V | 10 |

### Puntaje total sección Verdadero/Falso: **400/400**

---

## Parte 2: Preguntas de desarrollo y alternativas

### 1. Describe en tus propias palabras qué es una señal PWM y dos de sus usos.

**Respuesta dada:**
(No se observa respuesta escrita en la hoja)

**Justificación:**
No se entregó respuesta, por lo tanto no se otorgan puntos en esta pregunta.

**Correcta:**
Una señal PWM (modulación por ancho de pulso) es una señal digital que varía el tiempo en que permanece en estado alto (duty cycle) para simular un valor analógico. Se usa, por ejemplo, para controlar la velocidad de motores o la intensidad de LEDs.

**Puntaje:** 0/5

### 2. ¿Qué voltaje representa LOW en Arduino Uno?

**Respuesta dada:** a- 1V

**Justificación:**
Incorrecto. LOW en Arduino Uno representa 0V, no 1V.

**Correcta:** c- 0V

**Puntaje:** 0/5

### 3. ¿Para qué sirve una resistencia en un circuito con LED?

**Respuesta dada:** b- Disminuir corriente

**Justificación:**
Correcto. La resistencia limita la corriente que pasa por el LED para evitar que se queme.

**Correcta:** b- Disminuir corriente

**Puntaje:** 5/5

### 4. ¿Cuál de estos comandos tiene error sintáctico?

**Respuesta dada:** c- analogRead(A1;)

**Justificación:**
Correcto. Falta el paréntesis de cierre, la sintaxis correcta es analogRead(A1);

**Correcta:** c- analogRead(A1;)

**Puntaje:** 5/5

### 5. ¿Qué tipo de valor devuelve digitalRead()?

**Respuesta dada:** a- verdadero o falso

**Justificación:**
Correcto. digitalRead() retorna HIGH o LOW, que pueden interpretarse como verdadero (1) o falso (0).

**Correcta:** a- verdadero o falso

**Puntaje:** 5/5

### 6. ¿Qué ocurre si se escribe pinMode(7 OUTPUT);?

**Respuesta dada:** b- El compilador da error

**Justificación:**
Correcto. Falta la coma entre los argumentos, por lo que el compilador arroja error de sintaxis.

**Correcta:** b- El compilador da error

**Puntaje:** 5/5

### 7. ¿Qué función se usa para mostrar texto por serial?

**Respuesta dada:** a- Serial.print()

**Justificación:**
Correcto. Serial.print() es la función para mostrar texto por el puerto serial.

**Correcta:** a- Serial.print()

**Puntaje:** 5/5

### Puntaje total sección Alternativas: **25/35**

---

## Puntaje Final Evaluación

- Verdadero/Falso: 400/400
- Alternativas: 25/35
- Desarrollo: 0/5

**Puntaje total:** 425/440

**Escala:** 100 puntos equivalen a nota 7.0

**Nota estimada:** 6.76

---

# Comentarios
- Excelente desempeño en la sección de verdadero/falso.
- Reforzar conceptos de PWM y repasar detalles de voltajes y sintaxis en Arduino.
