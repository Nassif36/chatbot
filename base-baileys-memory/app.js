const { createBot, createProvider, createFlow, addKeyword } = require('@bot-whatsapp/bot')

const WebWhatsappProvider = require('@bot-whatsapp/provider/baileys')
const MockAdapter = require('@bot-whatsapp/database/mock')

 // Crear el flujo principal
 const flowPrincipal = addKeyword(['hola', 'ole', 'alo'])
 .addAnswer(['Hola Soy Sam tu coach virtual de La Mecca Fitness!! En que puedo ayudarte?'])
 .addAnswer(['Servicios , Clases y Aranceles > Opcion 1', 'Quiero Mi Rutina! > Opcion 2']);

// Opcion 1
const flowOpcion1 = addKeyword('Opcion 1')
 .addAnswer([
   'Opcion 1 Respuesta.',
   'Servicios',
   'Meccas Coffe',
   'Mecca Fitness Shop',
   'Clases y Horarios',
   'Aranceles',
 ]);

// Opcion 2
const flowOpcion2 = addKeyword('Opcion 2')
 .addAnswer(['Opcion 2 Respuesta Que grupo muscular quisieras entrenar?'])
 .addAnswer(['Hombros', 'Pecho', 'Brazos', 'Espalda', 'Cuadriceps', 'Femorales y Gluteos']);

// Hombre o Mujer
const flowHombreMujer = addKeyword(['Hombros', 'Pecho', 'Brazos', 'Espalda', 'Cuadriceps', 'Femorales y Gluteos'])
 .addAnswer(['Hombre o mujer?'])
 .addAnswer(['Intensidad y duracion ?']);



const main = async () => {
  const adapterDB = new MockAdapter();
  const adapterProvider = createProvider(WebWhatsappProvider);
  const adapterFlow = createFlow([flowPrincipal, flowOpcion1, flowOpcion2, flowHombreMujer])

  createBot({
    flow: adapterFlow,
    provider: adapterProvider,
    database: adapterDB,
  });
};

main();
