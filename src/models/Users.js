class Users {
    constructor(name, id_rol, fullName, password, state) {
        this.name = name;
        this.id_rol = id_rol;
        this.fullName = fullName;
        this.password = password;
        this.state = state;
    }
}

module.exports = Users;