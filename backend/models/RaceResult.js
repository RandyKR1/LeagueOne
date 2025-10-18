module.exports = (sequelize, DataTypes) => {
    const RaceResult = sequelize.define('RaceResult', {
        id: {
            type: DataTypes.INTEGER,
            autoIncrement: true,
            primaryKey: true,
        },
        raceId: {
            type: DataTypes.INTEGER,
            allowNull: false,
            references: {
                model: 'Races',
                key: 'id',
            },
            onDelete: 'CASCADE',
        },
        driverId: {
            type: DataTypes.INTEGER,
            allowNull: false,
            references: {
                model: 'Drivers',
                key: 'id',
            },
            onDelete: 'CASCADE',
        },
        position: {
            type: DataTypes.INTEGER,
            allowNull: true,
            validate: {
                min: 1
            }
        },
        status: {
            type: DataTypes.ENUM('DNF', 'DNS', 'CLASSIFIED'),
            allowNull: false,
            defaultValue: 'CLASSIFIED',
        }
    }, {
        tableName: 'RaceResults',
    });

    RaceResult.associate = (models) => {
        RaceResult.belongsTo(models.Race, {
            foreignKey: 'raceId',
            as: 'race',
            onDelete: 'CASCADE',
        });

        RaceResult.belongsTo(models.Driver, {
            foreignKey: 'driverId',
            as: 'driver',
            onDelete: 'CASCADE',
        });
    };

    /**
     * Calculate the points for this result based on the league's scoring system
     */
    RaceResult.prototype.calculatePoints = async function () {
        const race = await this.getRace({ include: ['league'] });
        if (!race || !race.league) return 0;

        const scoringSystem = race.league.scoringSystem || {};
        const pos = this.position?.toString();

        // Return 0 if no position or not found in scoring system
        return pos && scoringSystem[pos] ? scoringSystem[pos] : 0;
    };

    return RaceResult;
};
