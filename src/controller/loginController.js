const Login = require('../collections/Login');
const crypto = require('crypto');
const uuid = require('uuid');

const loginController = {
    register: async (req, res) => {
        const { email, password } = req.body;
        const salt = uuid.v4();
        const hashedPassword = crypto.createHash('sha256').update(salt + password).digest('hex');

        try {
            newUser = new Login({ email, password: hashedPassword, salt});
            await newUser.save();
            res.status(201).json({ message: 'Se ha registrado exitosamente' });
        } catch (error) {
            res.status(400).json({ message: 'Problemas en el nuevo registro', error });
        }
    },

    login: async (req, res) => {
        const { email, password } = req.body;

        try {
            const user = await Login.findOne({ email });
            if (!user) {
                return res.status(401).json({ message: 'Correo o contraseña invalido' });
            }

            const hashedPassword = crypto.createHash('sha256').update(user.salt + password).digest('hex');
            if (hashedPassword === user.password) {
                res.status(200).json({message: 'Inicio de sesión exitoso', user });
            } else {
                res.status(401).json({ message: 'Correo o contraseña invalido' });
            }
        } catch (error){
            res.status(400).json({message: 'Error al iniciar sesión' });
        }
    }
};

module.exports = loginController;