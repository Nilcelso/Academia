module.exports = {

    age: function (timestamp) {
        const today = new Date()
        const birthDate = new Date(timestamp)


        let age = today.getFullYear() - birthDate.getFullYear()
        const month = today.getMonth() - birthDate.getMonth()

        if (month < 0 || month == 0 && today.getDate() < birthDate.getDate()){
            age = age -1
        }
        return age
    },

    utils: function(timestamp) {
        const utils = new Date(timestamp)

        const year = utils.getUTCFullYear()

        const month = `0${ utils.getUTCMonth() + 1 }`.slice(-2)

        const day = `0${ utils.getUTCDate() }`.slice(-2)

        return {
            day,
            month,
            year,
            iso: `${day} - ${month} - ${year}`,
            birthDay: `${day}/${month}`
        }
    }
}