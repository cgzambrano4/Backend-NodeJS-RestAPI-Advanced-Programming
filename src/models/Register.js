class Register {
    constructor(identification, phone, email, name, birthdate, province, address, gender, commandType, gradeNote){
        this.identification = identification;
        this.phone = phone;
        this.email = email;
        this.name = name;
        this.birthdate = birthdate;
        this.province = province;
        this.address = address;
        this.gender = gender;
        this.commandType = commandType;
        this.gradeNote = gradeNote;
    }
}

module.exports = Register;