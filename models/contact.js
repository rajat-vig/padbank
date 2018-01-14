module.exports = function (sequelize, DataTypes) {
    var Contact = sequelize.define('Contact', {
        name: DataTypes.STRING,
        mobile: DataTypes.BIGINT,
        timing: DataTypes.STRING
    },
    {
        freezeTableName: true
    }
);
    Contact.removeAttribute('id');

    Contact.associate = (models) => {
    Contact.belongsTo(models.Branch, {foreignKey: 'branchid', allowNull: false});
    }
    return Contact;
}