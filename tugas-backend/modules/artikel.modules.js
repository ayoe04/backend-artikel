//Helper db yang dibuat
const mysql = require('../helpers/database')
//validation input
const Joi = require('joi')

class _artikel {
    //create artikel
    addArtikel = async (body) => {
        try {
            const schema = Joi.object({
                judul: Joi.string().required(),
                deskripsi: Joi.string().required(),
                id_user: Joi.number().required()
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
                'INSERT INTO artikel (judul, deskripsi, id_user) VALUES (?, ?, ?)',
                [body.judul, body.deskripsi, body.id_user]
            )

            return {
                status: true,
                data: add
            }
        } catch (error) {
            console.error('addArtikel module error: ', error)

            return {
                status: false,
                error
            }
        }
    }

    //edit artikel
    editArtikel = async (body) => {
        try {
            const schema = Joi.object({
                id_artikel: Joi.number().required(),
                judul: Joi.string().required(),
                deskripsi: Joi.string(),
                id_user: Joi.number().required()
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

            const detail = await mysql.query(
                'SELECT * FROM artikel WHERE (id_artikel = ? AND id_user = ?)',
                [body.id_artikel, body.id_user]
            )

            if (!detail.length > 0) {
                return {
                    status: false,
                    data: 404,
                    error: "Artikel not found"
                }
            }

            const edit = await mysql.query(
                'UPDATE artikel SET judul = ?, deskripsi = ? WHERE id_artikel = ?',
                [body.judul, body.deskripsi, body.id_artikel]
            )

            return {
                status: true,
                data: edit
            }
        } catch (error) {
            console.error('editArtikel module error: ', error)

            return {
                status: false,
                error
            }
        }
    }

    //delete artikel
    deleteArtikel = async (id_artikel) => {
        try {
            const body = { id_artikel }
            const schema = Joi.object({
                id_artikel: Joi.number().required()
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

            const del = await mysql.query(
                'DELETE FROM artikel WHERE id_artikel = ?',
                [id_artikel]
            )

            return {
                status: true,
                data: del
            }
        } catch (error) {
            console.error('deleteArtikel module error: ', error)

            return {
                status: false,
                error
            }
        }
    }
}

module.exports = new _artikel()



