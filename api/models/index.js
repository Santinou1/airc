const Users = require('./Users');
const Products = require('./Products');
const Orders = require('./Orders');

Products.hasOne(Orders);
Orders.belongsTo(Products);
Users.belongsToMany(Products, { through: 'users_x_products' });
Products.belongsToMany(Users, { through: 'products_x_users' });
Products.belongsTo(Users);
Orders.belongsTo(Users);
Users.belongsTo(Orders);

module.exports = { Users, Products, Orders };
