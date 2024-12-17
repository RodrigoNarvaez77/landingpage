const express = require('express');
const { OpenAI } = require('openai'); // Asegúrate de usar `OpenAI`, no `OpenAIApi`
const router = express.Router();

// Configuración de OpenAI
const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY, // Tu API Key desde el archivo .env
});

//console.log('API Key:', process.env.OPENAI_API_KEY);

// Ruta para manejar el asistente virtual
router.post('/ask-assistant', async (req, res) => {
  const { prompt } = req.body;

  if (!prompt) {
    return res.status(400).json({ error: 'El prompt es obligatorio' });
  }

  try {
    const response = await openai.chat.completions.create({
      model: 'gpt-3.5-turbo', // O usa 'gpt-4' si tienes acceso
      messages: [{ role: 'user', content: prompt }],
      max_tokens: 100, // Ajusta el límite de tokens si es necesario
      temperature: 0.7, // Controla la creatividad
    });

    const assistantResponse = response.choices[0].message.content;
    res.json({ response: assistantResponse });
  } catch (error) {
    console.error('Error al consultar OpenAI:', error.message);
    res.status(500).json({ error: 'Hubo un problema con la solicitud a OpenAI' });
  }
});

module.exports = router;
