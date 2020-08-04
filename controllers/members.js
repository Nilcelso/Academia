const fs = require('fs')
const data = require('../data.json')
const { age, utils  } = require('../utils')


exports.index = function (req, res) {
    return res.render("members/index", { members: data.members })
}

// mostrar os instrutores cadastrados
exports.show = function(req, res) {
    const { id } = req.params

    const foundMember = data.members.find(function(member) {
        return member.id == id
    })
    if (!foundMember) return res.send("Membro não encontratado.")

    
    const member = {
        ...foundMember,
        age: age(foundMember.birth)
    }

    return res.render("members/show", { member })
} 

//create
exports.create = function (req, res) {
    return res.render("members/create")
}

// post
exports.post = function(req, res) {
    const keys = Object.keys(req.body)

    for(key of keys) {
        if (req.body[key] =="") {
            return res.send('Por favor, preencha todos os campos corretamente.')
        }
    }
    
     
    birth = Date.parse(req.body.birth)
  
    let id = 1
    const lastMember = data.members[data.members.length - 1]

    if(lastMember) {
        id = lastMember.id + 1
    }


    data.members.push({
        ...req.body,
        id,
        birth
    })

    fs.writeFile("data.json", JSON.stringify(data, null, 2), function(err) {
        if (err) return res.send('Arquivo errado')

        return res.redirect('/members')
    })

    //return res.send(req.body)
}

//edit
exports.edit = function(req, res) {
    const { id } = req.params

    const foundMember = data.members.find(function(member) {
        return member.id == id
    })
    if (!foundMember) return res.send("Instrutor não encontratado.")

    const member = {
        ...foundMember,
        birth: utils(foundMember.birth)
    }


    return res.render('members/edit', { member })
}

//put
exports.put = function(req, res) {
    const { id } = req.body
    let index = 0

    const foundMember = data.members.find(function(member, foundIndex) {
        if ( id == member.id ) {
            index = foundIndex
        }
    })
    if (!foundMember) return res.send("Instrutor não encontratado.")

    const member = {
        ...foundMember,
        ...req.body,
        birth: Date.parse(req.body.birth),
        id: Number(req.body.id)
    }

    utils.members[index] = member

    fs.writeFile("data.json", JSON.stringify(data, null, 2), function(err) {
        if(err) return res.send("Erro")

        return res.redirect(`/members/${id}`)
    })
}

//delete

exports.delete = function(req, res) {
    const { id } = req.body

    const filteredMembers = data.members.filter(function(member) {
        return member.id != id
    })

    data.members = filteredMembers

    fs.writeFile("data.json", JSON.stringify(data, null, 2), function(err) {
        if (err) return res.send("Erro")

        return res.redirect('/members')
    })


}