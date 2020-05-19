const express = require("express")
const router = express.Router()
//data service
const DataService = require("../services/dataService")
const service = new DataService()

router.get("/getAll", async function(req, res) {
    try {
        const entities = await service.getData()
        JSON.stringify(entities)
        res.setHeader("Access-Control-Allow-Origin", "*")
        res.send(entities)
    }
    catch(err) {
        console.log(err)
        res.sendStatus(500)
    }
})
router.get("/getOne", async function(req, res) {
    try {
        const entities = await service.getDataOne(req.query.id)
        JSON.stringify(entities)
        res.setHeader("Access-Control-Allow-Origin", "*")
        res.send(entities)
    }
    catch(err) {
        console.log(err)
        res.sendStatus(500)
    }
})



router.post("/set", async function(req, res) {
    try {
        await service.setData(req.body)
        res.sendStatus(200)
    }
    catch(err) {
        console.log(err)
        res.sendStatus(500)
    }

})

module.exports = router
