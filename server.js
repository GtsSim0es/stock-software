const express = require("express");
const session = require('express-session')
const app = express();
const exphbs  = require('express-handlebars');
const bodyParser = require('body-parser');
const Post = require('./models/post');
const multer = require("multer")
const path = require("path")
const sequelize = require('sequelize');
const { Sequelize } = require("./models/db");
const op = Sequelize.Op


var login = 'admin'
var password = '12345'

//CONFIGURAÇÕES
    //SESSION
    app.use(session({secret:'108ISHdnsahk&@#*kSdnjsad'}))   
    //CSS
    app.use(express.static('public'))
    //TEMPLATE ENGINE
    var handle = exphbs.create({
        defaultLayout: 'main'
        });
    app.engine('handlebars', handle.engine);
    app.set('view engine', 'handlebars');
    //BODY PARSER
    app.use(bodyParser.urlencoded({extended:true}));
    app.use(bodyParser.json());
    //MULTER 
    const storage = multer.diskStorage({
        destination: function(req, file, cb){
            cb(null, "public/images/")
        },
        filename: function(req, file, cb){
            cb(null, file.originalname + Date.now() + path.extname(file.originalname))
        }
    })
    const upload = multer({storage})
        //ROTAS

        //tela inicial
    app.post('/', function(req, res){

        if(req.body.password == password && req.body.login == login){
            req.session.login = login
            res.render('estoque')
        }else{
            res.render('loginfail', {layout: 'none'})
        }
    
    })
    
    app.get('/', function(req, res){
        if(req.session.login)
        {
            res.render('estoque')
            console.log("Voce está logado como: " + req.session.login)
        }else
        {
            res.render('login', {layout: 'none'})
        }
        
    })

   /* if(req.session.login)
    {
  
    }else
    {
        res.render('login', {layout: 'none'})
    } 
    */

    //estoques
    app.get('/brincos', function(req, res){
        if(req.session.login)
        {
            Post.findAll({where: {qualificacao: 'brinco'}}).then
            (function(estoquebrinco){res.render('estoqueB', {estoquebrinco:estoquebrinco})})
        }else
        {
            res.render('login', {layout: 'none'})
        } 
    })

    app.get('/aneis', function(req, res){
        if(req.session.login)
    {
            Post.findAll({where: {qualificacao: 'anel'}}).then
            (function(estoqueanel){res.render('estoqueA', {estoqueanel:estoqueanel})})
    }else
    {
        res.render('login', {layout: 'none'})
    } 
        
    })

    app.get('/correntes', function(req, res){
        if(req.session.login)
        {
            Post.findAll({where: {qualificacao: 'corrente'}}).then
            (function(estoquecorrente){res.render('estoqueC', {estoquecorrente:estoquecorrente})})
        }else
        {
            res.render('login', {layout: 'none'})
        } 
        
    })

    app.get('/pingentes', function(req, res){
        if(req.session.login)
        {
            Post.findAll({where: {qualificacao: 'pingente'}}).then
            (function(estoquepingente){res.render('estoqueP', {estoquepingente:estoquepingente})})
        }else
        {
            res.render('login', {layout: 'none'})
        } 
        
    })

    //botao buscar

    app.get('/buscar', function(req, res){if(req.session.login)
        {
            const { term } = req.query;

            Post.findAll({ where: { nome: {[op.like]: '%' + term + '%' }}}).then
            (buscar => res.render('buscar', {buscar})).catch(
            err => res.render('busca_resp', {error: err}))
        }else
        {
            res.render('login', {layout: 'none'})
        } 
       
    })

  //DATABASE
  app.post('/add', upload.single("imagem"),function(req, res){
    if(req.session.login)
    {
        Post.create(
            {
            imagem: req.file.filename,
            nome: req.body.nome,
            grama: req.body.grama,
            codigo: req.body.codigo,
            quilates: req.body.quilates,
            tipo: req.body.tipo,
            qualificacao: req.body.qualificacao
        }).then(function(){
            //Função de sucesso
            res.redirect('/')
            
        }).catch(function(){
            //Função de erro
            res.send('Houve um erro na criação do Post' + erro)
        })
    }else
    {
        res.render('login', {layout: 'none'})
    } 



   
});

        //DELETAR ID
app.get('/deletar/:id', function(req, res){
    if(req.session.login)
    {
        Post.destroy({where: {'id': req.params.id}}).then(function(){
            res.redirect('/')
            }).catch(function(erro){
                res.send('Esta postagem não existe')
            })
    }else
    {
        res.render('login', {layout: 'none'})
    } 
})

//ENCERRAR SESSÃO
    app.get('/sair', function(req, res){
        req.session.login = null
        res.redirect('/')
    })


    //Server connect
app.listen(8082, function(){
    console.log("Servidor rodando na porta 8082")
});