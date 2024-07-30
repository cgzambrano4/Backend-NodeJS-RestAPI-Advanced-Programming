const Login = require('../collections/Login');
const Roles = require('../collections/Roles');
const crypto = require('crypto');

const loginController = {
    register: async (req, res) => {
        const { username, fullname, email, password, _id } = req.body;
        const salt = crypto.randomBytes(16).toString('hex')
        const hashedPassword = crypto.createHash('sha256').update(salt + password).digest('hex');

        try {
            const role = await Roles.findById(_id);
            if(!role) {
                return res.status(400).json({
                    message: 'Rol no encontrado'
                });
            }

            const newLogin = new Login({ username, fullname, email, password: hashedPassword, salt});
            await newLogin.save();
            res.status(201).json({ message: 'Usuario registrado exitosamente' });
        } catch (error) {
            res.status(400).json({ message: 'Error al registrar usuario', error });
        }
    },

    login: async (req, res) => {
        const { email, username, password } = req.body;

        try {
            const user = await Login.findOne({ email }).populate('_id');
            if (!user) {
                return res.status(401).json({ message: 'Correo o contraseña incorrecta' });
            }

            const hashedPassword = crypto.createHash('sha256').update(user.salt + password).digest('hex');
            if (hashedPassword === user.password) {
                const token = jwt.sign({
                    username: login.username, id_rol: login._id
                }, process.env.JWT_SECRET, { expiresIN: '1h'});
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