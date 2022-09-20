import { DataTypes } from 'sequelize';
import { sequelize } from '../../resources/sequelize';

export const Batch = sequelize.define('batch', {

  userId: DataTypes.INTEGER,
  timestamp: DataTypes.DATE,
  subject: DataTypes.STRING,
  body: DataTypes.STRING,
  
},
{
    indexes: [
      {
        unique: true,
        fields: ['userId']
      }
    ]
});
