module.exports = function (sequelize, DataTypes) {
    var Account = sequelize.define('Account', {

    },
        {
        freezeTableName: true
    }
);
    Account.removeAttribute('id');

    Account.associate = (models) => {
    Account.belongsTo(models.Login, {foreignKey: 'userid', allowNull: false});
    Account.belongsTo(models.Branch, {foreignKey: 'branchid', allowNull: false});
    Account.belongsTo(models.Roles, {foreignKey: 'roleid', allowNull: false});
    }
    return Account;
}