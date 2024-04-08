const mongoose = require("mongoose");
const {Schema} = mongoose;

main()
.then(() => console.log("connection successful"))
.catch(err => console.log(err));

async function main() {
    await mongoose.connect("mongodb://127.0.0.1:27017/relationDemo");
}

const orderSchema = new Schema({
    item: String,
    price: Number,
});

const customerSchema = new Schema ({
    name: String,
    orders: [
        {
            type: Schema.Types.ObjectId,
            ref: "Order"
        },
    ],
});

//deletion useing mongoose middleware
customerSchema.post("findOneAndDelete", async (customer) => {
    if (customer.orders.length){
        let res = await Order.deleteMany({ _id: { $in: customer.orders }});
        console.log(res);
    }
});

const Order = mongoose.model("Order", orderSchema);
const Customer = mongoose.model("Customer", customerSchema);

//function

const find = async () =>{
    let result = await Customer.find({}).populate("orders");
    console.log(result[0]);
};

//find();

const addCustomer = async () => {
    let newCust = new Customer ({
        name: "Mantrit Bar", 
    });

    let newOrder =new Order({
        item: "Pizza",
        price: 250,
    });

    newCust.orders.push(newOrder);

    await newOrder.save();
    await newCust.save();

    console.log("added new customer");
};

//addCustomer();


//deletion useing mongoose middleware
const delCust = async () => {
    let data = await Customer.findByIdAndDelete("661380de595fea0aee12e988");
    console.log(data);

};

delCust();



// const addCustomer = async () => {
//     let cust1 = new Customer({
//         name: "Ankita",
//     });

//     let order1 = await Order.findOne({ item: "chips"});
//     let order2 = await Order.findOne({ item: "Chocolate"});

//     cust1.orders.push(order1);
//     cust1.orders.push(order2);

//     let result = await cust1.save();
//     console.log(result);
// };

// addCustomer();

// const addOrders = async () => {
//     let result = await Order.insertMany([
//         { item: "Samosa", price:12 },
//         { item: "chips" , price: 10 },
//         { item: "Chocolate", price: 40 },
//     ]);
//     console.log(result);
// };

//addOrders();

