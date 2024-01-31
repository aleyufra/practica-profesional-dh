module.exports = (sequelize, DataTypes) => {
    const Profession = sequelize.define('Profession', {
        id: {
            type: DataTypes.BIGINT,
            primaryKey: true,
            autoIncrement: true
        },
        profession: {
            type: DataTypes.STRING(100),
            allowNull: false
        },
        candidate_id: {
            type: DataTypes.BIGINT,
            allowNull: false
        }
    }, {
        tableName: 'professions',
        timestamps: false
    })

    Profession.associate = (models) => {
        Profession.belongsTo(models.Candidate, {
            as: 'candidate',
            foreignKey: 'candidate_id'
        })
    }

    return Profession
}