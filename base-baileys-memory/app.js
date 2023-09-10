const { createBot, createProvider, createFlow, addKeyword } = require('@bot-whatsapp/bot')

const WebWhatsappProvider = require('@bot-whatsapp/provider/baileys')
const MockAdapter = require('@bot-whatsapp/database/mock')

 // Crear el flujo principal
 const flowPrincipal = addKeyword(EVENTS.WELCOME)
 .addAnswer(['Hola Soy Sam tu coach virtual de La Mecca Fitness!! En que puedo ayudarte?'])
 .addAnswer(['Servicios , Clases y Aranceles.', 'Quiero Mi Rutina']);

// Opcion 1
const flowOpcion1 = addKeyword('servicios', 'clases', 'aranceles')
 .addAnswer([
   'Meccas Coffe',
   'Mecca Fitness Shop',
   'Clases y Horarios',
   'Aranceles',
 ]);

// Opcion 2
const flowOpcion2 = addKeyword('quiero', 'rutina', 'ejercitar')
 .addAnswer(['Que grupo muscular quisieras entrenar?'])
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
