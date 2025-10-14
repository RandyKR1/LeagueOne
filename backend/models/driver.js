module.exports = (sequelize, DataTypes) => {
    const Driver = sequelize.define('Driver', {
        id: {
            type: DataTypes.INTEGER,
            autoIncrement: true,
            primaryKey: true,
        },
        name: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        teamId: {
            type: DataTypes.INTEGER,
            allowNull: true,
            references: {
                model: 'Teams',
                key: 'id',
            },
            onDelete: 'SET NULL'
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
        userId: {
            type: DataTypes.INTEGER,
            allowNull: true,
            references: {
                model: 'Users',
                key: 'id',
            },
            onDelete: 'SET NULL',
        },
        isAI: {
            type: DataTypes.BOOLEAN,
            allowNull: false,
            defaultValue: false,
        },
    }, {
        tableName: 'Drivers',
    });

    Driver.associate = (models) => {
        Driver.belongsTo(models.Team, {
            foreignKey: 'teamId',
            as: 'team',
        });

        Driver.belongsTo(models.League, {
            foreignKey: 'leagueId',
            as: 'league',
            onDelete: 'CASCADE',
        });

        Driver.belongsTo(models.User, {
            foreignKey: 'userId',
            as: 'user',
            onDelete: 'SET NULL',
        });

        Driver.hasMany(models.RaceResult, {
            foreignKey: 'driverId',
            as: 'results',
            onDelete: 'CASCADE',
        });

        Driver.hasOne(models.DriverStanding, {
            foreignKey: 'driverId',
            as: 'standing',
            onDelete: 'CASCADE',
        });
    };

    return Driver;
}