module.exports = (sequelize, DataTypes) => {
	const SocialNetwork = sequelize.define(
		"SocialNetwork",
		{
			id: {
				type: DataTypes.BIGINT,
				primaryKey: true,
				autoIncrement: true,
			},
			linkedin: {
				type: DataTypes.STRING(100),
				allowNull: false,
			},
			candidate_id: {
				type: DataTypes.BIGINT,
				allowNull: false,
			},
		},
		{
			tableName: "social_networks",
			timestamps: false,
		}
	);

	SocialNetwork.associate = (models) => {
		SocialNetwork.belongsTo(models.Candidate, {
			as: "Candidate",
			foreignKey: "candidate_id",
		});
	};

	return SocialNetwork;
};
