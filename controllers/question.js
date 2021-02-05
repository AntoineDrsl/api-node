const {dbConfig} = require('../knexfile');
const knex = require('knex')(dbConfig.development);

class Question {
    static createQuestion(req, res) {

        const errors = [];

        if(!req.body.quizz_id) {
            errors.push("Veuillez référencer un quizz");
        }

        if(!req.body.question || req.body.question.length === 0) {
            errors.push("Veuillez entrer une question valide");
        }

        if(errors.length > 0) {
            return res.status(417).json({errors: errors})
        }

        knex('quizzs').where({id: req.body.quizz_id})
        .then((quizz) => {
            if(quizz.length !== 0) {
                knex('questions').insert({
                    quizz_id: req.body.quizz_id,
                    question: req.body.question
                }).then((result) => {
                    if(result[0]) {
                        knex('questions').where({id: result[0]}).then((question) => {
                            return res.status(201).json({message: "La question a bien été crée",question: question[0]})
                        });
                    }
                    else {
                        return res.status(403).json({errors: ['Votre question n\'a pas pu être créé']});
                    }
                });
            }
            else{
                return res.status(404).json({errors: ['Le quizz référencé n\'existe pas']});
            }
        })

        
    }

    static updateQuestion(req, res) {
        const errors = [];

        if(req.body.quizz_id) {
            errors.push("Vous ne pouvez pas modifier le quizz de référence");
        }

        if(!req.body.question || req.body.question === 0) {
            errors.push("Veuillez entrer une question valide");
        }

        if(errors.length > 0) {
            return res.status(417).json({errors: errors})
        }

        knex('questions').where({id: req.params.id})
        .update({
            quizz_id: req.body.quizz_id,
            question: req.body.question
        }).then((result) => {
            if(result) {
                knex('questions').where({id: req.params.id}).then((question) => {
                    return res.status(201).json({message: "La question a bien été modifiée", question: question[0]})
                });
            } else {
                return res.status(403).json({errors: ['Votre question n\'a pas pu être modifié']});
            }
        });
    }

    static RemoveQuestionById(req, res) {
        knex('questions').where({id: req.params.id}).then((question) => {
            if(question[0]) { 
                knex('questions').where({id: req.params.id})
                .del()
                .then(() => {
                    return res.status(200).json({message: 'La question a bien été supprimée', question: question[0]});
                });
            } else {
                return res.status(404).json({errors: ["La question demandée n'a pas été trouvé"]});
            }
        });
    }

    static getQuestionById(req, res) {
        knex('questions').where({id: req.params.id})
        .then((question) => {
            if(question.length === 0) {
                return res.status(404).json({errors: [`Aucune question trouvé pour cette id: ${req.params.id}`]});
            }
            if(question) {
                return res.status(200).json({question: question[0]});
            }
        });
    }
}

module.exports = Question;