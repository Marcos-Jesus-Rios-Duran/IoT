import mongoose from "mongoose";
const { Schema, model } = mongoose;

const actuadoresSensoresSchema = new Schema({
    tipo: String,
    nombre: String,
    valor: mongoose.Schema.Types.Mixed,
    unidad: String,
    fechaHora: { type: Date, default: Date.now }
});

const sensorModel = model('sensorActuador', actuadoresSensoresSchema);

export default sensorModel