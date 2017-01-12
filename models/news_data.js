'use strict'

module.exports = function(sequelize, DataTypes) {
    var NewsData = sequelize.define('NewsData', {
        content: DataTypes.TEXT,
        appthumb: DataTypes.STRING
    }, {
        tableName: 'paper_news_data',
        timestamps: false
    });
    return NewsData;
}
