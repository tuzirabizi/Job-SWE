const { Sequelize } = require('sequelize');

// Create a mock Sequelize instance for testing
const sequelize = new Sequelize({
  dialect: 'sqlite',
  storage: ':memory:',
  logging: false
});

// Export for use in other files
module.exports = sequelize; 