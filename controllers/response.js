const environment = 'development';
const dbConfig = require('../knexfile')[environment];
const knex = require('knex')(dbConfig);
class Response {

    static createResponse(req, res) {
        const errors = [];

        if(!req.body.question_id){
            errors.push('Il faut référencer la question');
        }

        if(!req.body.response || req.body.response.length === 0) {
            errors.push('La réponse ne peut être vide');
        }

        if(!(typeof req.body.isCorrect === 'boolean')) {
            errors.push('isCorrect doit être renseigné');
        }

        if(errors.length > 0) {
            return res.status(417).json({errors: errors})
        }

        knex('questions').where({id: req.body.question_id})
        .then((question) => {
            if(question.length !== 0) {
                knex('responses').insert({
                    question_id: req.body.question_id,
                    response: req.body.response,
                    isCorrect: req.body.isCorrect
                }).then((result) => {
                    if(result[0]) {
                        knex('responses').where({id: result[0]}).then((response) => {
                           return res.status(201).json({message: "La réponse a bien été créée", response: response[0]});
                        });
                    }
                    else {
                        return res.status(403).json({errors: ['Echec lors de la création de la reponse']})
                    }
                });
            }
            else {
                return res.status(404).json({errors: ['La question référencée n\'existe pas']});
            }
        });
        
    }

    static updateResponse(req, res) {
        const errors = [];

        if(req.body.question_id) {
            errors.push('Vous ne pouvez pas changer la question de référence');
        }

        if(!req.body.response || req.body.response.length === 0) {
            errors.push('La réponse ne peut être vide');
        }

        if(!(typeof req.body.isCorrect === 'boolean')) {
            errors.push('isCorrect doit être renseigné');
        }

        if(errors.length > 0) {
            return res.status(417).json({errors: errors})
        }

        knex('responses').where({id: req.params.id})
        .update({
            response: req.body.response,
            isCorrect: req.body.isCorrect
        }).then((result) => {
            if(result) {
                knex('responses').where({id: req.params.id}).then((response) => {
                   return res.status(200).json({message: "La réponse a bien été modifiée", response: response[0]})
                });
            } else {
                return res.status(403).json({errors: ['Votre réponse n\'a pas pu être modifié']});
            }
        });
        
    }

    static removeResponseById(req, res) {
        knex('responses').where({id: req.params.id}).then((response) => {
            if(response[0]) { 
                knex('responses').where({id: req.params.id})
                .del()
                .then(() => {
                    return res.status(200).json({message: 'La réponse a bien été supprimée', response: response[0]});
                });
            } else {
                return res.status(404).json({errors: ["La question demandée n'a pas été trouvé"]});
            }
        });
    }

    static getResponseById(req, res) {
        knex('responses').where({id: req.params.id})
        .then((response) => {
            if(response[0]) {
                return res.status(200).json({response: response[0]});
            }
            else {
                return res.status(404).json({errors: ['Impossible de retourner la réponse']});
            }
        })
    }
}

module.exports = Response;