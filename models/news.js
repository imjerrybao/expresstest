'use strict'

module.exports = function(sequelize, DataTypes) {
    var News = sequelize.define('News', {
        // title: DataTypes.STRING
    }, {
        tableName: 'paper_news',
        timestamps: false
    });
    return News;
}

// , {
//     associate: function(models) {
//         News.belongsTo(models.NewsData, {
//             onDelete: 'CASCADE',
//             foreignKey: {
//                 allowNull: false
//             }
//         })
//     }
