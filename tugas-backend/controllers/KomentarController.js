const { Router } = require('express')
const m$blog = require('../modules/komentar.modules')
const response = require('../helpers/response')
const KomentarControlller = Router()

/**
 * Add Komentar
 * @param {number} id_user
 * @param {number} id_artikel
 * @param { string} isi_komen
 */
 KomentarControlller.post('/', async (req, res, next) => {
    const add = await m$blog.addKomentar(req.body)

    response.sendResponse(res, add)
})

module.exports = KomentarControlller