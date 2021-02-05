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

        if(!(typeof req.body.isCorrect === 'boolean')) {
            error.push('isCorrect doit être renseigné');
        }

        if(error.length > 0) {
            return res.status(417).json({message: error[0]})
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
                        knex('responses').where({id: response[0]})
                        .then((response) => {
                           return response ?  res.status(201).json({response: response[0]}) :  res.status(404).json({message: 'Impossible de retourner la réponse'})
                        });
                    }
                    else {
                        return res.status(403).json({message: 'Echec lors de la création de la reponse'})
                    }
                });
            }
            else {
                return res.status(404).json({message: 'La Question référencé n\'existe pas'});
            }
        });
        
    }

    

    static updateResponse(req, res) {
        const error = [];

        if(!req.body.response || req.body.response.length === 0) {
            error.push('La réponse ne peut être vide');
        }
        

        if(!(typeof req.body.isCorrect === 'boolean')) {
            error.push('isCorrect doit être renseigné');
        }

        if(error.length > 0) {
            return res.status(417).json({message: error[0]})
        }

        knex('responses').where({id: req.params.id})
        .update({
            response: req.body.response,
            isCorrect: req.body.isCorrect
        }).then((response) => {
            if(response.length > 0) {

                knex('responses').where({id: req.params.id})
                .then((response) => {
                   return response ?  res.status(200).json({response: response[0]}) :  res.status(404).json({message: 'Impossible de retourner la réponse'})
                });
            }
            else {
                return res.status(403).json({message: 'Votre réponse n\'a pas pu être modifié'});
            }
        });
        
    }


    static removeResponseById(req, res) {
        knex('responses').where({id: req.params.id})
        .then((response) => {
            if(response.length > 0) {
                knex('responses').where({id: req.params.id})
                .del()
                .then(() => {
                    return res.status(200).json({message: 'La question a bien été supprimé'});
                });
            }

            else {
                return res.status(404).json({message: 'Impossible de retourner la réponse'});
            }
        })
    }

    static getResponseById(req, res) {
        knex('responses').where({id: req.params.id})
        .then((response) => {
            if(response.length === 1) {
                return res.status(200).json({response: response[0]});
            }
            else {
                return res.status(404).json({message: 'Impossible de retourner la réponse'});
            }
        })
    }
}

module.exports = Response;