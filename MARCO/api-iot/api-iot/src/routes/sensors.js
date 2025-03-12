import { Router } from 'express'
import sensorModel from '../models/sensorSchema.js';
const router = Router()

/**
 * @swagger
 * /sensoresyactuadores:
 *   get:
 *     summary: Obtiene todos los datos de sensores y actuadores
 *     tags: [Sensores y Actuadores]
 *     responses:
 *       200:
 *         description: Lista de sensores y actuadores
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/SensorActuador'
 *       500:
 *         description: Error en la petición
 */
router.get("/sensoresyactuadores", async (req, res) => {
    try {
        const datos = await sensorModel.find();
        res.json(datos);
    } catch (error) {
        console.error(error);
        res.status(500).send("Error en la petición");
    }
});

/**
 * @swagger
 * /sensoreyactuadores/{id}:
 *   get:
 *     summary: Obtiene un sensor o actuador por su ID
 *     tags: [Sensores y Actuadores]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: ID del sensor o actuador
 *     responses:
 *       200:
 *         description: Datos del sensor o actuador
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/SensorActuador'
 *       404:
 *         description: Dato no encontrado
 *       500:
 *         description: Error al obtener el dato
 */
router.get("/sensoreyactuadores/:id", async (req, res) => {
    try {
        const dato = await sensorModel.findById(req.params.id);
        if (!dato) {
            return res.status(404).send("Dato no encontrado");
        }
        res.json(dato);
    } catch (error) {
        res.status(500).json({ error: "Error al obtener el dato" });
    }
});

/**
 * @swagger
 * /sensoresactuadores/buscar:
 *   get:
 *     summary: Busca sensores o actuadores por tipo y/o nombre
 *     tags: [Sensores y Actuadores]
 *     parameters:
 *       - in: query
 *         name: tipo
 *         schema:
 *           type: string
 *         description: Tipo de dispositivo a filtrar
 *       - in: query
 *         name: nombre
 *         schema:
 *           type: string
 *         description: Nombre del dispositivo a filtrar
 *     responses:
 *       200:
 *         description: Resultados de la búsqueda
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/SensorActuador'
 *       500:
 *         description: Error al buscar los datos
 */
router.get("/sensoresactuadores/buscar", async (req, res) => {
    try {
        const { tipo, nombre } = req.query;
        const filtro = {};
        if (tipo) filtro.tipo = tipo;
        if (nombre) filtro.nombre = nombre;
        
        const resultados = await sensorModel.find(filtro);
        res.json(resultados);
    } catch (error) {
        res.status(500).json({ error: "Error al buscar los datos" });
    }
});

/**
 * @swagger
 * /sensoresactuadores:
 *   post:
 *     summary: Crea un nuevo registro de sensor o actuador
 *     tags: [Sensores y Actuadores]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/SensorActuador'
 *     responses:
 *       201:
 *         description: Registro creado correctamente
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/SensorActuador'
 *       400:
 *         description: Error al crear el dato
 */
router.post("/sensoresactuadores", async (req, res) => {
    try {
        const nuevoRegistro = new sensorModel(req.body);
        await nuevoRegistro.save();
        res.status(201).json(nuevoRegistro);
    } catch (error) {
        res.status(400).json({ error: "Error al crear el dato" });
    }
});

/**
 * @swagger
 * /sensoresactuadores/{id}:
 *   put:
 *     summary: Actualiza un sensor o actuador existente
 *     tags: [Sensores y Actuadores]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: ID del sensor o actuador
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/SensorActuador'
 *     responses:
 *       200:
 *         description: Registro actualizado correctamente
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/SensorActuador'
 *       404:
 *         description: Dato no encontrado
 *       400:
 *         description: Error al actualizar el dato
 */
router.put("/sensoresactuadores/:id", async (req, res) => {
    try {
        const actualizado = await sensorModel.findByIdAndUpdate(req.params.id, req.body, { new: true });
        if (!actualizado) {
            return res.status(404).send("Dato no encontrado");
        }
        res.json(actualizado);
    } catch (error) {
        res.status(400).json({ error: "Error al actualizar el dato" });
    }
});

/**
 * @swagger
 * /sensoresactuadores/{id}:
 *   delete:
 *     summary: Elimina un sensor o actuador
 *     tags: [Sensores y Actuadores]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: ID del sensor o actuador
 *     responses:
 *       200:
 *         description: Registro eliminado correctamente
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 mensaje:
 *                   type: string
 *       404:
 *         description: No encontrado
 *       500:
 *         description: Error al eliminar el dato
 */
router.delete("/sensoresactuadores/:id", async (req, res) => {
    try {
        const eliminado = await sensorModel.findByIdAndDelete(req.params.id);
        if (!eliminado) return res.status(404).json({ error: "No encontrado" });
        io.emit("datoEliminado", eliminado);
        res.json({ mensaje: "Registro Eliminado" });
    } catch (error) {
        res.status(500).json({ error: "Error al eliminar el dato" });
    }
});

export default router;