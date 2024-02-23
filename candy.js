const express = require("express");

const app = express();

app.use(express.json());

const items = require("./fakeDb")


app.get("/candies", (req,res) => {
    res.json({items});
})

app.post("/candies", (req, res) => {
    // This route will allow you to POST a new candy to the list.
    
    const newItem = {name: req.body.name, price: req.body.price} 
    items.push(newItem)
    res.status(201).json({ item: newItem}) 
        
})

app.get("/:name", (req, res) => {
    // This route will allow you to pull a singular item in the list.
    // if searching for an item that is not in the list an error will indicate this.

    const itemLocated = items.find(item => item.name === req.params.name)
    if(itemLocated === undefined){
        throw new ExpessError("The item you are looking for in not in store", 404)
    }
    res.json({item: itemLocated})
})

app.patch("/:name", (req,res) => {
    // This route will allow you to change the candies name and pricing.

    const itemLocated = items.find(item => item.name === req.params.name)
    if(itemLocated === undefined){
        throw new ExpessError("The item you are looking for in not in store", 404)
    }
    itemLocated.name = req.body.name
    res.json({item: itemLocated})
})

app.delete("/:name", (req,res) => {
    // This route will allow you to delete an item within the list.

    const itemLocated = items.find(item => item.name === req.params.name)
    if(itemLocated === -1){
        throw new ExpessError("The item you are looking for in not in store", 404)
    }
    items.splice(itemLocated, 1)
    res.json({message: "Item Removed"})
})


app.listen(3000, function () {
    console.log('App on port 3000');
  })