const { getDB } = require('./../config/db');
const Register = require('./../models/Register');
const { ObjectId } = require('mongodb');

// Obtener todos los registros
exports.getRegisters = async (req, res) => {
  try {
    const db = getDB();
    const registers = await db.collection('registers').find().toArray();
    res.json({ state: 'exito', code: 200, message: 'Registros obtenidos correctamente', data: registers });
  } catch (err) {
    console.error(err);
    res.status(500).json({ state: 'error', code: 500, message: 'Error del servidor' });
  }
};

// Crear un nuevo registro
exports.createRegister = async (req, res) => {
  const { identification, phone, email, name, birthdate, id_province, address, id_gender, id_commandType, gradeNote } = req.body;
  try {
    const db = getDB();
    const register = new Register(identification, phone, email, name, birthdate, id_province, address, id_gender, id_commandType, gradeNote);
    await db.collection('registers').insertOne(register);
    res.status(201).json({ state: 'exito', code: 201, message: 'Registro creado correctamente', data: register });
  } catch (err) {
    console.error(err);
    res.status(500).json({ state: 'error', code: 500, message: 'Error del servidor' });
  }
};

// Actualizar un registro
exports.updateRegister = async (req, res) => {
  const { id } = req.params;
  const { identification, phone, email, name, birthdate, id_province, address, id_gender, id_commandType, gradeNote } = req.body;
  try {
    const db = getDB();
    const updatedRegister = await db.collection('registers').findOneAndUpdate(
      { _id: new ObjectId(id) },
      { $set: { identification, phone, email, name, birthdate, id_province, address, id_gender, id_commandType, gradeNote } },
      { returnOriginal: false }
    );
    res.json({ state: 'exito', code: 200, message: 'Registro actualizado correctamente', data: updatedRegister.value });
  } catch (err) {
    console.error(err);
    res.status(500).json({ state: 'error', code: 500, message: 'Error del servidor' });
  }
};

// Eliminar un registro
exports.deleteRegister = async (req, res) => {
  const { id } = req.params;
  try {
    const db = getDB();
    await db.collection('registers').deleteOne({ _id: new ObjectId(id) });
    res.json({ state: 'exito', code: 200, message: 'Registro eliminado correctamente' });
  } catch (err) {
    console.error(err);
    res.status(500).json({ state: 'error', code: 500, message: 'Error del servidor' });
  }
};
