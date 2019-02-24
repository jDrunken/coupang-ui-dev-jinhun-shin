// server.js
const path = require('path')

const jsonServer = require('json-server')
const server = jsonServer.create()
const router = jsonServer.router(path.join(__dirname,'./ref/response.json'))
const middlewares = jsonServer.defaults('noCors')

const checkReq = (message) => {
    if ( message.carrier !== 'skt') {
        return false
    }

    if (message.nation !== 'local') {
        return false
    }

    if (message.phoneNumber !== '01012341234') {
        return false
    }

    return true
}

const ok = {
    "success" : true
}

const error = {
    "success" : false,
    "message" : "입력한 정보를 다시 확인해 주세요."
}

server.use((req, res, next) => {
    console.log(req.method)
    if (req.method === 'POST' && req.originalUrl === '/checkUserId') {
        router.render = (req, res) => {
            let checkup = checkReq(req.body)
            if (checkup === true) {
                console.log(req.method,'ok')
                res.status(200).jsonp(ok);
            } else {
                console.log(req.method,'error')
                res.status(200).jsonp(error);
            }
        }
        next()
        return true
    } else {req.method === 'GET'} {
        router.render = (req, res) => {
            res.jsonp(res.locals.data)
        }
        next()
        return true
    }
})

server.use(middlewares)
server.use(router)

server.listen(4000, () => {
    console.log('JSON Server is running')
})
