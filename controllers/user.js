const environment = 'development';
const dbConfig = require('../knexfile')[environment];
const knex = require('knex')(dbConfig);
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');


class User {

    static register(req, res) {
        const errors = [];

        // Check request
        if(!req.body.firstname) {
            errors.push("Veuillez entrer un prénom");
        }

        if(!req.body.lastname) {
            errors.push("Veuillez entrer un nom");
        }

        if(!req.body.email) {
            errors.push("Veuillez entrer un email");
        }

        if(!req.body.password) {
            errors.push("Veuillez entrer un mot de passe");
        }

        // Return errors
        if(errors.length > 0) {
            return res.status(417).json({errors: errors});
        }

        knex('users').where('email', req.body.email).then((sameEmail) => {
            if(sameEmail.length == 0) {
                bcrypt.hash(req.body.password, 10).then((password) => {
                    if(password) {
                        // Insert and return
                        knex('users').insert({
                            firstname: req.body.firstname,
                            lastname: req.body.lastname,
                            email: req.body.email,
                            role: 'user',
                            password: password
                        }).then((userId) => {
                            knex('users').where('id', userId[0]).then((user) => {
                                return res.status(201).json(user[0]);
                            });
                        });
                    } else {
                        return res.status(417).json({errors: ["Une erreur est survenue"]});
                    }
                }, (err) => {
                    return res.status(417).json({errors: ["Une erreur est survenue"]});
                });
            } else {
                res.status(417).json({errors: ["Cette adresse email est déjà utilisée"]});
            }
        });
    }

    static login(req, res) {
        const errors = [];

        if(!req.body.email) {
            errors.push("Veuillez entrer un email");
        }

        if(!req.body.password) {
            errors.push("Veuillez entrer un mot de passe");
        }

        // Return errors
        if(errors.length > 0) {
            return res.status(417).json({errors: errors});
        }

        knex('users').where({email: req.body.email}).then((user) => {
            if(user.length > 0) {
                bcrypt.compare(req.body.password, user[0].password, (err, same) => {
                    if(!err) {
                        if(same) {
                            jwt.sign({user: user[0].id, role: user[0].role}, 'secret', {expiresIn: '10h'}, (err, token) => {
                                if(!err) {
                                    return res.status(200).json({
                                        ... user[0],
                                        token: token
                                    });
                                } else {
                                    return res.status(417).json({errors: ["Connexion impossible"]});
                                }
                            });
                        } else {
                            return res.status(417).json({errors: ["Mauvais mot de passe"]});
                        }
                    } else {
                        console.log(err);
                        return res.status(417).json({errors: ["Une erreur est survenue"]});
                    }
                });
            } else {
                return res.status(404).json({errors: ["Cette adresse email ne fait pas partie de nos services"]});
            }
        });
    }

    static async update(req, res) {
        const errors = [];

        // Check request
        if(!req.params.id) {
            errors.push("Aucun utilisateur trouvé");
        }

        if(!req.body.firstname) {
            errors.push("Veuillez entrer un prénom");
        }

        if(!req.body.lastname) {
            errors.push("Veuillez entrer un nom");
        }

        if(!req.body.email) {
            errors.push("Veuillez entrer un email");
        }

        if(!req.body.password) {
            errors.push("Veuillez entrer un mot de passe");
        }

        // Return errors
        if(errors.length > 0) {
            return res.status(417).json({errors: errors});
        }

        jwt.verify(req.token, 'secret', (err, authData) => {
            if(err) {
                res.sendStatus(403);
            } else {
                if(req.params.id == authData.user) {
                    knex('users').where('email', req.body.email).andWhereNot('id', req.params.id).then((sameEmail) => {
                        if(sameEmail.length == 0) {
                            bcrypt.hash(req.body.password, 10).then((password) => {
                                if(password) {
                                    // Insert and return
                                    knex('users').where({id: req.params.id}).update({        
                                        firstname: req.body.firstname,
                                        lastname: req.body.lastname,
                                        email: req.body.email,
                                        password: password
                                    }).then((userId) => {
                                        knex('users').where('id', req.params.id).then((user) => {
                                            return res.status(201).json(user[0]);
                                        });
                                    });
                                } else {
                                    return res.status(417).json({errors: ["Une erreur est survenue"]});
                                }
                            }, (err) => {
                                return res.status(417).json({errors: ["Une erreur est survenue"]});
                            });
                        } else {
                            res.status(417).json({errors: ["Cette adresse email est déjà utilisée"]});
                        }
                    });
                } else {
                    res.sendStatus(403);
                }
            }
        });
    }

    static destroy(req, res) {
        const errors = [];

        if(!req.params.id) {
            errors.push("Aucun utilisateur trouvé");
        }

        // Return errors
        if(errors.length > 0) {
            return res.status(417).json({errors: errors});
        }

        jwt.verify(req.token, 'secret', (err, authData) => {
            if(err) {
                res.sendStatus(403);
            } else {
                if(req.params.id == authData.user) {    
                    knex('users').where({id: req.params.id}).then((user) => {
                        if(user.length > 0) {
                            knex('users').where({id: user[0].id}).delete().then((del) => {
                                res.status(200).json(user[0]);
                            });
                        } else {
                            res.status(404).json({errors: ["L'utilisateur n'existe pas"]});
                        }
                    });
                } else {
                    res.sendStatus(403);
                }
            }
        });
    }
}

module.exports = User;