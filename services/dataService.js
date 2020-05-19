const Redis = require("ioredis")
//dto
const Entity = require("../dto/Entity")

Redis.Command.setReplyTransformer("hgetall", function (result) {
    let arr = []
    for (let i = 0; i < result.length; i += 2) {
        arr.push([result[i], result[i + 1]])
    }
    return arr
})

const redis = new Redis

class DataService {
    constructor() {
        this.redis = redis
    }
    async setData (entity) {
        for(let i in entity){
            await this.redis.hset(`entity:${entity.id}`, i, entity[i])
        }
        return true
    }
    async getData () {
        const rawEntities = []
        for(let i = 1; i < 21; i++){
            const entity = await this.redis.hgetall(`entity:${i}`)
            if(entity.length === 0) continue
            rawEntities.push(entity)
        }

        return rawEntities.map(ent => {
            const obj = {}
            for( let item of ent){
                obj[item[0]] = Number(Number(item[1]).toFixed(2))
            }
            return new Entity(obj)
        })

    }
}

module.exports = DataService