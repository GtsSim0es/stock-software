const db = require('./db')

const Post = db.sequelize.define('estoks', {
    imagem: {
        type: db.Sequelize.STRING
    },
    nome: {
        type: db.Sequelize.TEXT,
        allowNull: false
    },
    grama: {
        type: db.Sequelize.FLOAT,
        allowNull: false
    },
    codigo: {
        type: db.Sequelize.FLOAT,
        allowNull: false
    },
    quilates: {
        type: db.Sequelize.FLOAT,
        allowNull: false
    },
    tipo: {
        type: db.Sequelize.TEXT,
        allowNull: false
    },
    qualificacao: {
        type: db.Sequelize.CHAR,
        allowNull: false
    }
});

Post.sync({ force: true })

module.exports = Post;