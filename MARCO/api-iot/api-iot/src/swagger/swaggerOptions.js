// Configuración de Swagger
export const swaggerOptions = {
    definition: {
      openapi: '3.0.0',
      info: {
        title: 'API de Sensores y Actuadores',
        version: '1.0.0',
        description: 'API para gestionar datos de sensores y actuadores IoT',
        contact: {
          name: 'Soporte'
        },
        servers: [
          {
            url: 'http://localhost:9222/api/v1'
          }
        ]
      },
      components: {
        schemas: {
          SensorActuador: {
            type: 'object',
            required: ['tipo', 'nombre', 'valor'],
            properties: {
              tipo: {
                type: 'string',
                description: 'Tipo de dispositivo (sensor o actuador)'
              },
              nombre: {
                type: 'string',
                description: 'Nombre del sensor o actuador'
              },
              valor: {
                type: 'object',
                description: 'Valor registrado por el sensor o actuador (campo flexible)'
              },
              unidad: {
                type: 'string',
                description: 'Unidad de medida del valor'
              },
              fechaHora: {
                type: 'string',
                format: 'date-time',
                description: 'Fecha y hora de la lectura'
              }
            }
          }
        }
      }
    },
    apis: ['./src/routes/*.js'] // Archivo donde se encuentran las rutas
  };