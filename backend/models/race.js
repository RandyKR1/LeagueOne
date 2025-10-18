module.exports = (sequelize, DataTypes) => {
    const Race = sequelize.define('Race', {
        id: {
            type: DataTypes.INTEGER,
            autoIncrement: true,
            primaryKey: true,
        },
        leagueId: {
            type: DataTypes.INTEGER,
            allowNull: false,
            references: {
                model: 'Leagues',
                key: 'id',
            },
            onDelete: 'CASCADE',
        },
        name: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        round: {
            type: DataTypes.INTEGER,
            allowNull: false,
        },
        date: {
            type: DataTypes.DATE,
            allowNull: false,
        },
        location: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        status: {
            type: DataTypes.ENUM('Scheduled', 'Completed'),
            allowNull: false,
            defaultValue: 'Scheduled',
        }
    }, {
        tableName: 'Races'
    });

    Race.associate = (models) => {
        Race.belongsTo(models.League, {
            as: 'league',
            foreignKey: 'leagueId'
        }),

            Race.hasMany(models.RaceResult, {
                foreignKey: 'raceId',
                as: 'results',
                onDelete: 'CASCADE',
            });
    }

    return Race;
};