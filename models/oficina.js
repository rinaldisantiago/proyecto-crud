const Oficina = (sequelize,Sequelize) =>{
    return sequelize.define("Oficina",{
        oficina: {
            type: Sequelize.STRING,
            allowNull: false,
            unique: true
        },

    }, {
        timestamps: false,
    });
};

module.exports = Oficina;