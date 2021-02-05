const {dbConfig} = require('../knexfile');
const knex = require('knex')(dbConfig.development);
const Quizz = require('./quizz');

class Question {
    static createQuestion(req, res) {

        const error = [];

        if(!req.body.quizz_id) {
            error.push("Veuillez référencer un quizz");
        }

        if(!req.body.question || req.body.question.length === 0) {
            error.push("Veuillez entrer une question valide");
        }

        if(error.length > 0) {
            return res.status(417).json({status: false, error: error.forEach(element => element)})
        }

        knex('quizzs').where({id: req.body.quizz_id})
        .then((quizz) => {
            if(quizz.length !== 0) {
                knex('questions').insert({
                    quizz_id: req.body.quizz_id,
                    question: req.body.question
                }).then((question) => {
                    if(question) {
                        return res.status(201).json({status: true, question: question})
                    }
                    else {
                        return res.status(403).json({status: false, message: 'Votre question n\'a pas pu être créé'});
                    }
                });
            }
            else{
                return res.status(404).json({status: false, message: 'Le Quizz référencé n\'existe pas'});
            }
        })

        
    }

    static updateQuestion(req, res) {
        const error = [];

        if(!req.body.question || req.body.question === 0) {
            error.push("Veuillez entrer une question valide");
        }

        if(error.length > 0) {
            return res.status(417).json({status: false, error: error.forEach(element => element)})
        }

        knex('questions').where({id: req.params.id})
        .update({
            quizz_id: req.body.quizz_id,
            question: req.body.question
        }).then((question) => {
            if(question) {
                return res.status(201).json({status: true, question: question})
            }
            else {
                return res.status(403).json({status: false, message: 'Votre question n\'a pas pu être modifié'});
            }
        });
    }

    static RemoveQuestionById(req, res) {

        knex('questions').where({id: req.params.id})
        .del()
        .then(() => {
            return res.status(200).json({status: true, message: 'La question a bien été supprimé'});
        });
    }

    static getQuestionById(req, res) {
        knex('questions').where({id: req.params.id})
        .then((question) => {
            if(question.length === 0) {
                return res.status(404).json({message: `Aucune question trouvé pour cette id: ${req.params.id}`});
            }
            if(question) {
                return res.status(200).json({question: question});
            }
        });
    }
}

module.exports = Question;