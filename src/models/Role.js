class Role {
    constructor(id, name, description, estado) {
        this.id = id;
        this.name = name;
        this.description = description;
        this.estado = estado;
    }
}

// 1: verify_data, 2: verify_document, 3: client

module.exports = Role;