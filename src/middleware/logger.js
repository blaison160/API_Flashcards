const logger = (req,res, next) => {
    const { method, host } = req
    const time = new Date().toLocaleTimeString('fr-FR')

    console.log(`${time} : ${method} - ${host}`)

    //si dernier middelware dans la pile res.send()
    //sinon tjr appeler next()
    next()
}

export default logger