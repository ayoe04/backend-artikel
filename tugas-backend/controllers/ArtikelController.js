const { Router } = require('express')
const m$blog = require('../modules/artikel.modules')
const response = require('../helpers/response')
const userSession = require('../helpers/middleware')

const ArtikelController = Router()

/**
 * Add Artikel
 * @param {string} judul
 * @param {string} deskripsi
 */
 ArtikelController.post('/', userSession, async (req, res, next) => {
    const add = await m$blog.addArtikel(req.body)

    response.sendResponse(res, add)
})

/**
 * Edit Artikel
 * @param {number} id_artikel
 * @param {string} judul
 * @param {string} deskripsi
 * @param {number} id_user
 */
 ArtikelController.put('/', userSession, async (req, res, next) => {
    const add = await m$blog.editArtikel(req.body)

    response.sendResponse(res, add)
})

/**
 * Delete Artikel
 * @param {number} id_artikel
 */
 ArtikelController.delete('/:id', userSession, async (req, res, next) => {
    const add = await m$blog.deleteArtikel(req.params.id)

    response.sendResponse(res, add)
})

module.exports = ArtikelController