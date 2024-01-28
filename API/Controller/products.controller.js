
const Categories = require('../../Model/categories.model')
const Products = require('../../Model/products.model')

//Get All Product
module.exports.index = async (req, res) => {
    const products = await Products.find()
    res.json(products)
}

//Get Category Product
module.exports.category = async (req, res) => {
    const category = req.query.category
    const products = await Products.find({ category: category })
    res.json(products)
}

// Get Categories
module.exports.categories = async (req, res) => {
    const categories = await Categories.find();
    res.json(categories)
}

// POST Category
module.exports.createCategory = async (req, res) => {
    try {
        const category = await Categories.create(req.body);
        res.json(category);
    } catch (error) {
        return res.json('Server Error!');
    }
}

// POST Category
module.exports.detailCategory = async (req, res) => {
    try {
        const id = req.params.id;
        const category = await Categories.findOne({ _id: id});
        res.json(category);
    } catch (error) {
        return res.json('Server Error!');
    }
}

// PUT Category
module.exports.updateCategory = async (req, res) => {
    try {
        const { id } = req.params;
        const { category } = req.body;
        var categoryObj = await Categories.findOne({_id: id});
        categoryObj.category = category;
        categoryObj.save();
        res.json(categoryObj);
    } catch (error) {
        return res.json('Server Error!');
    }
}

// POST Product
module.exports.createProduct = async (req, res) => {
    try {
        var fileImage = req.files.file;
        var fileName = fileImage.name;
        var fileProduct = "http://localhost:8000/" + fileName;
        fileImage.mv('./public/' + fileName);
        const data = {
            ...req.body,
            img1: fileProduct
        };
        const product = await Products.create(data);
        res.json(product);
    } catch (error) {
        return res.json('Server Error!');
    }
}

// PUT Product
module.exports.updateProduct = async (req, res) => {
    // try {
        const { id } = req.params;
        const { name, price, category, description } = req.body;
        var product = await Products.findOne({_id: id});

        if (req.files?.file) {
            var fileImage = req.files.file;
            var fileName = fileImage.name;
            var fileProduct = "http://localhost:8000/" + fileName;
            fileImage.mv('./public/' + fileName);
            product.img1 = fileProduct;
        } else {
            product.img1 =  product.img1;
        }
        
        product.name = name;
        product.price = price;
        product.category = category;
        product.description = description;
        product.save();
        res.json(product);
    // } catch (error) {
    //     return res.json('Server Error!');
    // }
}

// // Xóa sản phẩm dựa trên ID
// module.exports.deleteProduct = async (req, res) => {
//     const id = req.params.id;

// try {
//     const deletedProduct = await Products.deleteOne({ _id: id });
//     if (deletedProduct.deletedCount === 0) {
//         return res.status(404).json({ error: 'Sản phẩm không tồn tại' });
//     }

//     res.json({ message: 'Xóa sản phẩm thành công' });
// } catch (error) {
//     console.error('Lỗi khi xóa sản phẩm:', error);
//     res.status(500).json({ error: 'Lỗi khi xóa sản phẩm' });
// }

// };

//Get Detail Product
module.exports.detail = async (req, res) => {
    const id = req.params.id
    const products = await Products.findOne({ _id: id})
    res.json(products)
}

//Pagination them chuc nang Search va phan loai sp
module.exports.pagination = async (req, res) => {
    try {
        //Lay page tu query
        const page = parseInt(req.query.page) || 1

        //Lay so luong tu query
        const numberProduct = parseInt(req.query.count) || 1

        //Lay category tu query
        const category = req.query.category

        //Lay sp dau va sp cuoi
        var start = (page - 1) * numberProduct
        var end = page * numberProduct

        var products

        //Phan loai dk category tu client gui len
        if (category === 'all'){
            products = await Products.find()
        }else{
            products = await Products.find({ category: category })
        }
        
        var paginationProducts = products.slice(start, end);

        const data = {
            products: paginationProducts,
            total: products.length
        };

        res.json(data);

    } catch (error) {
        res.json("Fail");
    }
}

