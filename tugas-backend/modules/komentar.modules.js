//Helper db yang dibuat
const mysql = require('../helpers/database')
//validation input
const Joi = require('joi')

class _komentar {
    //create komentar
    addKomentar = async (body) => {
        try {
            const schema = Joi.object({
                id_user: Joi.number().required(),
                id_artikel: Joi.number().required(),
                isi_komen : Joi.string().required()
            })

            const validation = schema.validate(body)

            if (validation.error) {
                const errorDetails = validation.error.details.map(detail => detail.message)

                return {
                    status: false,
                    code: 422,
                    error: errorDetails.join(', ')
                }
            }

            const add = await mysql.query(
                'INSERT INTO komentar (id_user, id_artikel, isi_komen) VALUES (?, ?,?)',
                [ body.id_user, body.id_artikel, body.isi_komen]
            )

            return {
                status: true,
                data: add
            }
        } catch (error) {
            console.error('addKomentar module error: ', error)

            return {
                status: false,
                error
            }
        }
    }
}

module.exports = new _komentar()