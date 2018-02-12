var MongoClient = require('mongodb').MongoClient;
let express = require('express');
let app = express();
app.get('/',(req,res)=>{
    
    res.sendFile(__dirname+'/public/index.html');
})
app.get('/users',(req,res)=>{
    func_number_of_users((item)=>{
        res.send(JSON.stringify(item));
    })
})
app.get('/linkers/:x',(req,res)=>{
    func_number_of_links(parseInt(req.params.x),(item)=>{
        res.send(JSON.stringify(item));
    })
})
app.get('/active/:x',(req,res)=>{
    func_number_of_posts(parseInt(req.params.x),(item)=>{
        res.send(JSON.stringify(item));
    })
})
app.get('/mentioned/:x',(req,res)=>{
    func_most_mentioned(parseInt(req.params.x),(item)=>{
        res.send(JSON.stringify(item));
    })
})
app.get('/words/:x/:adj/:words',(req,res)=>{
    console.log("received words: ",req.params.words)
    func_most_words(parseInt(req.params.x),req.params.adj,req.params.words.split(','),(item)=>{
        res.send(JSON.stringify(item));
    })
})
app.get('/polarity/:x/:adj/:gt',(req,res)=>{
    func_avg_part(parseInt(req.params.x),parseInt(req.params.adj),parseInt(req.params.gt),(item)=>{
        res.send(JSON.stringify(item));
    })
})





let db_name = undefined;
let col_name = undefined;
if (process.argv.length != 4) {
    console.log("please supply me a database name and a collection name")
}
else {
    db_name = process.argv[2];
    col_name = process.argv[3];
    let server = app.listen(3333, ()=>{
        let port = server.address().port;
        console.log('server running at http://%s:%s',"localhost",port)
    })
    console.log("\n------------------running code initiating coffee break--------------------\n")
}
function func_number_of_users(callback) {
    let start_time = new Date();
    MongoClient.connect("mongodb://localhost:27017/"+db_name, function (err, database) {
        if (err) { return console.dir(err); }
        let collection = database.db(db_name).collection(col_name);
        collection.distinct('user').then(function (item) {
            console.log("Total time spent:"+(new Date()-start_time)+"ms","number of users: ", item.length);
            console.log("\n--------------------------------------\n")
            collection.find().limit(1).toArray((err,item)=>{
                if(err){console.log(err)}
                console.log(item)
            })
            database.close()
            callback(item.length)
        })
    });
}
function func_number_of_links(top_x,callback) {
    let start_time = new Date();
    MongoClient.connect("mongodb://localhost:27017/"+db_name, function (err, database) {
        if (err) { return console.dir(err); }
        let collection = database.db(db_name).collection(col_name)
        collection.aggregate([{$group:{_id:"$user",total:{$sum:{$subtract:[{$size:{$split:["$text","@"]}},1]}}}},
                              {$sort:{total:-1}},
                              {$limit:top_x}],
                              {allowDiskUse:true}).toArray((err,item)=>{
                if (err) { console.log(err) }
                else {
                    console.log("Total time spent:"+(new Date()-start_time)+"ms","The top " + top_x + " with the most links are:")
                    item.forEach((ele, index) => {
                        console.log(index + 1 + ". " + ele._id + "  with " + ele.total + " links to other users");
                    })
                }
                console.log("\n--------------------------------------\n")
                database.close();
                callback(item)
            });
    })
}
function func_number_of_posts(top_x,callback) {
    let start_time = new Date();
    MongoClient.connect("mongodb://localhost:27017/"+db_name, function (err, database) {
        if (err) { return console.dir(err); }
        let collection = database.db(db_name).collection(col_name)
        collection.aggregate([{$group:{_id:"$user",total:{$sum:1}}},
                              {$sort:{total:-1}},
                              {$limit:top_x}],
                              {allowDiskUse:true}).toArray((err,item)=>{
                if (err) { console.log(err) }
                else {
                    console.log("Total time spent:"+(new Date()-start_time)+"ms","The top " + top_x + " active users are:")
                    item.forEach((ele, index) => {
                        console.log(index + 1 + ". " + ele._id + "  with " + ele.total + " posts");
                    })
                }
                console.log("\n--------------------------------------\n")
                database.close();
                callback(item)
            });
    })
}
function func_most_words(top_x, adj, words,callback) {
    let start_time = new Date();
    let obj = [];
    words.forEach((ele) => {
        obj.push({words:{$regex:ele+".",$options:'ism'}})
    });
    MongoClient.connect("mongodb://localhost:27017/"+db_name, function (err, database) {
        if (err) { return console.dir(err); }
        let collection = database.db(db_name).collection(col_name)
        collection.aggregate([{$addFields:{words:{$split:["$text"," "]}}},
                              {$unwind:"$words"},
                              {$match:{$or:obj}},
                              {$group:{_id:"$user",total:{$sum:1},avg:{$avg:"$polarity"}}},
                              {$sort:{total:-1}},
                              {$limit:top_x}],
                              {allowDiskUse:true}).toArray((err,item)=>{
                if (err) { console.log(err) }
                else {
                    console.log("Total time spent:"+(new Date()-start_time)+"ms","The top " + top_x + " who says " + adj + " words are:")
                    item.forEach((ele, index) => {
                        console.log(index + 1 + ". " + ele._id + "  with " + ele.total + " words "+ele.avg);
                    })
                    console.log("\n--------------------------------------\n")
                }
                database.close()
                callback(item)
            });
    });
}
function func_most_mentioned(top_x,callback){
    let start_time = new Date();
    MongoClient.connect("mongodb://localhost:27017/"+db_name, function (err, database) {
        if (err) { return console.dir(err); }
        let collection = database.db(db_name).collection(col_name)
        collection.aggregate([{$addFields:{words:{$split:["$text"," "]}}},
                              {$unwind:"$words"},
                              {$match:{words:{$regex:"@.",$options:'m'}}},
                              {$group:{_id:"$words",total:{$sum:1}}},
                              {$sort:{total:-1}},
                              {$limit:top_x}],
                              {allowDiskUse:true}).toArray((err,item)=>{
                if (err) { console.log(err) }
                else {
                    console.log("Total time spent:"+(new Date()-start_time)+"ms","The top " + top_x + " people who are mentioned:")
                    item.forEach((ele, index) => {
                        console.log(index + 1 + ". " + ele._id + "  with being mentioned " + ele.total + "times");
                    })
                    console.log("\n--------------------------------------\n")
                }
                database.close()
                callback(item)
            });
    });
}
function func_avg_part(top_x,adj,gt,callback){
    let start_time = new Date();
    MongoClient.connect("mongodb://localhost:27017/"+db_name, function (err, database) {
        if (err) { return console.dir(err); }
        let collection = database.db(db_name).collection(col_name)
        collection.aggregate([{$group:{_id:"$user",avg:{$avg:"$polarity"},total:{$sum:1}}},
                              {$match:{total:{$gt:gt}}},
                              {$sort:{avg:adj}},
                              {$limit:top_x}],
                              {allowDiskUse:true}).toArray((err,item)=>{
                if (err) { console.log(err) }
                else {
                    console.log("Total time spent:"+(new Date()-start_time)+"ms","The top " + top_x + " people who are mentioned:")
                    item.forEach((ele, index) => {
                        console.log(index + 1 + ". " + ele._id + "  who has a polarity of: " + ele.avg + " and has posted: "+ele.total+" posts");
                    })
                    console.log("\n--------------------------------------\n")
                }
                database.close()
                callback(item)
            });
    });
}

/*
if(db_name != undefined && col_name != undefined){
    func_avg_part(10,()=>{})
    func_number_of_links(10,()=>{});
    func_number_of_posts(10,()=>{});
    func_most_mentioned(10,()=>{})
    func_most_words(5,"bad",["fuck","fat","feminist","shit","asshole","cunt","kill","whore","bieber"],()=>{})
    func_most_words(5,"good",["good","nice","sweet","love","awesome","blessed","beauty","holy"],()=>{})
}*/