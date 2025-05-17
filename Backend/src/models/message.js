'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Message extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      Message.belongsTo(models.User, { foreignKey: 'senderId', as: 'Sender', onDelete: 'CASCADE' });
      Message.belongsTo(models.User, { foreignKey: 'receiverId', as: 'Receiver', onDelete: 'CASCADE' });
    }
  };
  Message.init({
    senderId: DataTypes.INTEGER,
    receiverId: DataTypes.INTEGER,
    message: DataTypes.TEXT,
    sentAt: DataTypes.DATE,
    isRead: DataTypes.BOOLEAN
  }, {
    sequelize,
    modelName: 'Message',
  });
  return Message;
};