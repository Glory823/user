var express = require('express');
var router = express.Router();
const mongo = require("mongodb-curd");

const baseName = "list";
const colName = "user";


/* GET home page. */
//查找所有数据
router.get('/api/findAll', function(req, res, next) {
    mongo.find(baseName, colName, (result) => {
        if (!result) {
            res.json({ code: 0, msg: "无查找数据" });
        } else {
            res.json({ code: 1, data: result });
        }
    })
});


//查找指定数据
router.post('/api/findOne', function(req, res, next) {
    const id = req.body.id;
    // console.log(id)
    if (!id) {
        res.json({ code: 3, msg: "参数为空" });
    } else {
        mongo.find(baseName, colName, { "_id": id }, (result) => {
            if (!result) {
                res.json({ code: 0, msg: "无查找数据" });
            } else {
                res.json({ code: 1, data: result });
            }
        })
    }
});


router.get('/api/findGet', function(req, res, next) {
    const id = req.query.id;
    // console.log(id)
    if (!id) {
        res.json({ code: 3, msg: "参数为空" });
    } else {
        mongo.find(baseName, colName, { "_id": id }, (result) => {
            if (!result) {
                res.json({ code: 0, msg: "无查找数据" });
            } else {
                res.json({ code: 1, data: result });
            }
        })
    }
});


//模糊搜索数据
router.post('/api/findSearch', function(req, res, next) {
    const name = RegExp(req.body.name);
    // console.log(name)
    if (!name) {
        res.json({ code: 3, msg: "参数为空" });
    } else {
        mongo.find(baseName, colName, { "name": name }, (result) => {
            if (!result) {
                res.json({ code: 0, msg: "无查找数据" });
            } else {
                res.json({ code: 1, data: result });
            }
        })
    }
});


//更新指定数据
router.post('/api/update', function(req, res, next) {
    const id = req.body.id;
    const obj = req.body;
    delete obj.id;
    // console.log(name)
    mongo.update(baseName, colName, [{ "_id": id }, obj], (result) => {
        if (!result) {
            res.json({ code: 0, msg: "修改失败" });
        } else {
            res.json({ code: 1, msg: "修改成功" });
        }
    })
});



//删除指定数据
router.post('/api/remove', function(req, res, next) {
    const id = req.body.id;
    // console.log(name)
    if (!id) {
        res.json({ code: 3, msg: "参数为空" });
    } else {
        mongo.remove(baseName, colName, { "_id": id }, (result) => {
            if (result.length === 0) {
                res.json({ code: 0, msg: "删除失败!" });
            } else {
                res.json({ code: 1, msg: "删除成功!" });
            }
        })
    }
});


//添加指定数据
router.post('/api/insert', function(req, res, next) {
    const body = req.body;
    // console.log(name)
    if (!body) {
        res.json({ code: 3, msg: "参数为空" });
    } else {
        mongo.insert(baseName, colName, body, (result) => {
            if (result.length === 0) {
                res.json({ code: 0, msg: "添加失败!" });
            } else {
                res.json({ code: 1, msg: "添加成功!" });
            }
        })
    }
});

module.exports = router;