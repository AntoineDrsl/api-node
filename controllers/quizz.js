const {dbConfig} = require('../knexfile');
const knex = require('knex')(dbConfig.development);

class Quizz {

    static createQuizz(req, res) {

        const error = [];

        if(!req.body.theme || req.body.theme.length === 0) {
            error.push("Veuillez entrer un nom de theme valide");
        }

        if(error.length > 0) {
            return res.status(417).json({status: false, error: error[0]})
        }

        knex('quizzs').insert({
            theme: req.body.theme
        }).then((quizz) => {
            if(quizz) {
                return res.status(201).json({status: true, quizz: quizz})
            }
            else {
                return res.status(403).json({status: false, message: 'Votre quizz n\'a pas pu être créé'});
            }
        });
    }

    static getAllQuizz(req, res) {
        knex('quizzs').then((quizz) => {
            if(quizz) {
                return res.status(200).json({status: true, quizz: quizz})
            }
            else {
                return res.status(404).json({status: false, message: 'Aucun quizz n\'a été créé'});
            }
        })
    }

    static getQuizzById(req, res) {
        knex('quizzs')
        .where({"quizzs.id": req.params.id})
        .join('questions', 'quizzs.id', '=', 'questions.quizz_id')
        .select('questions.id', 'questions.question', 'quizzs.theme')
        .then((quizz) => {
            if(quizz.length === 0 ) {
                return res.status(404).json({status: false, message: `Aucun quizz trouvé pour cette id: ${req.params.id}`});
            }
        
            if(quizz) {

                return res.status(200).json({id:req.params.id, theme: quizz[0].theme, questions: quizz})
            } 
        });
    }

    static UpdateQuizzById(req, res) {
        const error = [];

        if(!req.body.theme || req.body.theme.length === 0) {
            error.push("Veuillez entrer un nom de theme valide");
        }

        if(error.length > 0) {
            return res.status(417).json({status: false, error: error[0]})
        }


        knex('quizzs').where({id: req.params.id})
        .update({theme: req.body.theme})
        .then((quizz) => {
            if(quizz) {
                return res.status(200).json({status: true, quizz: quizz})
            }
            else {
                return res.status(404).json({status: false, message: 'Aucun quizz n\'a été créé'});
            }
        })
    }

    static RemoveQuizzById(req, res) {

        knex('quizzs').where({id: req.params.id})
        .del()
        .then(() => {
            return res.status(200).json({status: true, message: 'Le quizz a bien été supprimé'});
        });
    }

}

module.exports = Quizz;