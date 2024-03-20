module.exports = (sequelize, DataTypes) => {
	const Candidate = sequelize.define(
		"Candidate",
		{
			id: {
				type: DataTypes.BIGINT,
				primaryKey: true,
				autoIncrement: true,
			},
			dni: {
				type: DataTypes.STRING(8),
				unique: true,
				allowNull: false,
			},
			name: {
				type: DataTypes.STRING(50),
				allowNull: false,
			},
			surname: {
				type: DataTypes.STRING(50),
				allowNull: false,
			},
			email: {
				type: DataTypes.STRING(50),
				unique: true,
				allowNull: false,
			},
			phone: {
				type: DataTypes.STRING(30),
				allowNull: true,
			},
			birthday: {
				type: DataTypes.DATE,
				allowNull: false,
			},
			gender: {
				type: DataTypes.STRING(20),
				allowNull: false,
			},
			image: {
				type: DataTypes.STRING(500),
				allowNull: false,
			},
		},
		{
			tableName: "candidates",
			timestamps: false,
		}
	);

	Candidate.associate = (models) => {
		Candidate.hasMany(models.Profession, {
			as: "Profession",
			foreignKey: "candidate_id",
		});
		Candidate.hasOne(models.SocialNetwork, {
			as: "SocialNetwork",
			foreignKey: "candidate_id",
		});
	};

	return Candidate;
};
