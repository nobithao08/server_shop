
const Carts = require('../../Model/carts.model')
const Products = require('../../Model/products.model')

//Ham tim nhung sp ma user da them
module.exports.index = async (req, res) => {

    //Lay idUser tu query
    const idUser = req.query.idUser

    //Tim nhung sp ma user da them
    const carts = await Carts.find({ idUser: idUser})

    res.json(carts)

}

//Ham them sp
module.exports.addToCart = async (req, res) => {

    //Lay idUser tu query
    const idUser = req.query.idUser
    
    //Lay idProduct tu query
    const idProduct = req.query.idProduct

    //Lay count tu query
    const count = req.query.count

    //Tim sp ma user can mua
    const product = await Products.findOne({ _id: idProduct })

    //Tim trong gio hang xem thu user da tung mua sp do chua
    const carts = await Carts.findOne({ idUser: idUser, idProduct: idProduct})

    //Kiem tra xem User da tung them sp nay chua
    //Neu ko tim thay thi == null va insert vao
    //Neu tim thay thi se update so luong
    if (!carts){

        const dataInsert = {
            idUser: idUser,
            idProduct: idProduct,
            nameProduct: product.name,
            priceProduct: product.price,
            count: count,
            img: product.img1,
        }

        Carts.insertMany(dataInsert)

        res.send("Thanh Cong!")

    }else{     

        carts.count += parseInt(count)

        carts.save()

        res.send("Thanh Cong!")

    }

}

//Ham xoa sp
module.exports.deleteToCart = async (req, res) => {

    //Lay idUSer cua user can xoa
    const idUser = req.query.idUser

    //Lay idProduct cua user can xoa
    const idProduct = req.query.idProduct

    //Tim dung cai sp ma User da them vao gio hang
    var cart = await Carts.findOne({idUser: idUser, idProduct: idProduct})

    cart.delete()

    res.send("Thanh Cong!")

}

//Ham sua sp
module.exports.updateToCart = async (req, res) => {

    //Lay idUSer cua user can sua
     const idUser = req.query.idUser

    //Lay idProduct cua user can sua
    const idProduct = req.query.idProduct

    //Lay count cua user can sua
    const count = req.query.count

    //Tim dung cai sp ma User can sua
    var cart = await Carts.findOne({idUser: idUser, idProduct: idProduct})

    cart.count = count
    
    cart.save()

    res.send("Update Thanh Cong")

}

