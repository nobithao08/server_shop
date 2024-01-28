const Carts = require('../../Model/carts.model')
const History = require('../../Model/histories.model')

module.exports.sendmail = async (req, res) => {

    try {

        // // Lay data truyen len tu form phia client
        // const to = req.query.to
        // const subject = 'Hóa Đơn Đặt Hàng'
        
        const fullname = req.query.fullname
        const phone = req.query.phone
        const address = req.query.address
        const idUser = req.query.idUser
        const status = req.query.status || false;

        // //Tim nhung sp ma User da them hang
        const cartsUser = await Carts.find({idUser: idUser})

        let total = 0

        cartsUser.map(value => {
            return total += parseInt(value.priceProduct) * parseInt(value.count)
        })

        //Xoa nhung sp trong bang Cart, chuyen sang bang History//
        let carts = []

        cartsUser.map(value => {
            return carts.push(value)
        })

        const data = {
            idUser: idUser,
            fullname: fullname,
            phone: phone,
            address: address,
            cart: carts,
            total: total,
            status: status
        }

        // //Insert data vao bang History
        History.insertMany(data)

        // //Xoa nhung sp trong bang Cart
        Carts.deleteMany({ idUser: idUser }).then(function(){ 
            res.send("Thanh Cong")
        }).catch(function(error){ 
            res.send(error);
        });

    } catch (error) {
        // Neu co loi thi log ra de ktra va cung gui ve client
        console.log(error)
        res.send(error)
    }

}