const {dbConfig} = require('../knexfile');
const knex = require('knex')(dbConfig.development);

class Response {

    static createResponse(req, res) {
        const error = [];

        if(!req.body.question_id){
            error.push('Il faut référencer la question');
        }

        if(!req.body.response || req.body.response.length === 0) {
            error.push('La réponse ne peut être vide');
        }

        if(!req.body.isCorrect) {
            error.push('isCorrect doit être renseigné');
        }

        knex('questions').where({id: req.body.question_id})
        .then((question) => {
            if(question.length !== 0) {
                knex('responses').insert({
                    question_id: req.body.question_id,
                    response: req.body.response,
                    isCorrect: req.body.isCorrect
                }).then((response) => {
                    if(response) {
                        return res.status(201).json({response: response})
                    }
                    else {
                        return res.status(403).json({message: 'Echec lors de la création de la reponse'})
                    }
                });
            }
            else {
                return res.status(404).json({status: false, message: 'La Question référencé n\'existe pas'});
            }
        })
        
    }

}

module.exports = Response;