const {dbConfig} = require('../knexfile');
const knex = require('knex')(dbConfig.development);
const jwt = require('jsonwebtoken');

class Quizz {

    static createQuizz(req, res) {

        const error = [];

        if(!req.body.theme || req.body.theme.length === 0) {
            error.push("Veuillez entrer un nom de theme valide");
        }

        if(error.length > 0) {
            return res.status(417).json({errors: error})
        }

        knex('quizzs').insert({
            theme: req.body.theme
        }).then((response) => {
            if(response.length > 0) {
                knex('quizzs').where({id: response[0]}).then((quizz) => {
                    return res.status(200).json({message: "Le quizz a bien été créé", quizz: quizz[0]})
                });
            } else {
                return res.status(403).json({message: 'Votre quizz n\'a pas pu être créé'});
            }
        });
    }

    static getQuizzById(req, res) {
        knex('quizzs').where({id: req.params.id})
        .then((quizz) => {
            if(quizz.length === 0) {
                return res.status(404).json({message: `Aucun quizz trouvé pour cette id: ${req.params.id}`});
            }
            if(quizz) {
                return res.status(200).json({quizz: quizz});
            }
        })
    }

    static getAllQuizzs(req, res) {
        knex('quizzs').then((quizz) => {
            if(quizz.length > 0) {
                return res.status(200).json({quizz: quizz})
            }
            else {
                return res.status(404).json({message: 'Aucun quizz n\'a été créé'});
            }
        })
    }

    static UpdateQuizzById(req, res) {
        const error = [];

        if(!req.body.theme || req.body.theme.length === 0) {
            error.push("Veuillez entrer un nom de theme valide");
        }

        if(error.length > 0) {
            return res.status(417).json({errors: error})
        }


        knex('quizzs').where({id: req.params.id})
        .update({theme: req.body.theme})
        .then((response) => {
            if(response) {
                knex('quizzs').where({id: req.params.id}).then((quizz) => {
                    return res.status(200).json({message: "Le quizz a bien été modifié", quizz: quizz[0]})
                });
            } else {
                return res.status(404).json({message: 'Aucun quizz n\'a été modifié'});
            }
        })
    }

    static RemoveQuizzById(req, res) {

        jwt.verify(req.token, 'secret', (err, authData) => {
            if(err) {
                res.sendStatus(403);
            } else {
                if(authData.role === 'admin') {
                    knex('quizzs').where({id: req.params.id}).then((quizz) => {
                        knex('quizzs').where({id: req.params.id})
                        .del()
                        .then(() => {
                            return res.status(200).json({message: 'Le quizz a bien été supprimé', quizz: quizz[0]});
                        });
                    });
                } else {
                    res.sendStatus(403);
                }
            }
        });

    }

    // All quizz

    static createAllQuizz(req, res) {
        const error = [];

        if(!req.body.theme || req.body.theme.length === 0) {
            error.push("Veuillez entrer un nom de theme valide");
        }

        if(!req.body.questions || req.body.questions.length === 0 || !Array.isArray(req.body.questions)) {
            error.push("Veuillez entrer au moins une question");
        } else {

            for(let i = 0; i < req.body.questions.length; i++) {
                if(!req.body.questions[i] || !req.body.questions[i].question) {
                    error.push("Veuillez entrer une question");
                }
            }

        }

        if(error.length > 0) {
            return res.status(417).json({errors: error})
        }

        knex('quizzs').insert({
            theme: req.body.theme
        }).then((quizz) => {
            if(quizz.length > 0) {
                const questions = [];
                for(let i = 0; i < req.body.questions.length; i++) {
                    questions.push({
                        question: req.body.questions[i].question,
                        quizz_id: quizz[0]
                    });
                }
                knex('questions').insert(questions).then((question) => {
                    if(question.length > 0) {
                        return res.status(201).json({message: 'Votre quizz a bien été enregistré.'})
                    } else {
                        return res.status(403).json({message: 'Votre quizz n\'a pas pu être créé'});
                    }
                });
            } else {
                return res.status(403).json({message: 'Votre quizz n\'a pas pu être créé'});
            }
        });
    }

    static getAllQuizzById(req, res) {
        knex('quizzs')
        .where({"quizzs.id": req.params.id})
        .leftJoin('questions', 'quizzs.id', '=', 'questions.quizz_id')
        .leftJoin('responses', 'questions.id', '=', 'responses.question_id')
        .select('*', 'quizzs.id as quizzId', 'questions.id as questionId', 'responses.id as responseId')
        .groupBy('responses.id')
        .then((quizzs) => {
            if(quizzs.length > 0) {
                var result = {};
                result.questions = [];

                quizzs.forEach(quizz => {
                    result.id = quizz.quizzId;
                    result.theme = quizz.theme;
                    
                    if(quizz.questionId) {
                        if(result.questions[quizz.questionId] === undefined) {
                            result.questions[quizz.questionId] = {
                                id: quizz.questionId,
                                question: quizz.question
                            }
                        }

                        if(result.questions[quizz.questionId].responses === undefined) {
                            result.questions[quizz.questionId].responses = [];
                        }
                    }
                    if(quizz.responseId) {
                        result.questions[quizz.questionId].responses[quizz.responseId] = {
                            id: quizz.responseId,
                            response: quizz.response,
                            isCorrect: quizz.isCorrect
                        }
                    }
                });

                result.questions = result.questions.filter((n) => {return n});
                result.questions.forEach(question => {
                    question.responses = question.responses.filter((n) => {return n});
                });

                if(result.questions.length === 0) {
                    result.questions = null;
                } else {
                    result.questions.map((question) => {
                        if(question.responses.length === 0) {
                            question.responses = null;
                        }
                    });
                }

                return res.status(200).json(result);
            } else {
                return res.status(404).json({message: `Aucun quizz trouvé pour cette id: ${req.params.id}`});
            }
        });
    }
}

module.exports = Quizz;