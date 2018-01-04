module.exports = function (sequelize, DataTypes) {
    var Transactions = sequelize.define('Transactions', {
        transactionid: {type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true},
        transactiontype: DataTypes.STRING,
        unitcount: DataTypes.STRING,
        transactiondatetime: DataTypes.DATEONLY
    },
    {
        freezeTableName: true
    }
);

    Transactions.associate = (models) => {
        Transactions.belongsTo(models.Login, {foreignKey: 'userid', allowNull: false});
        Transactions.belongsTo(models.Branch, {foreignKey: 'branchid', allowNull: false});
        Transactions.belongsTo(models.Inventory, {foreignKey: 'inventoryid', allowNull: false});
    }

    return Transactions;
}