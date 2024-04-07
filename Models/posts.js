const mongoose = require("mongoose");
const {Schema} = mongoose;

main()
.then(() => console.log("connection successful"))
.catch(err => console.log(err));

async function main() {
    await mongoose.connect("mongodb://127.0.0.1:27017/relationDemo");
}

const userSchema = new Schema({
    username: String,
    email: String
});

const postSchema = new Schema ({
    content:String,
    likes: Number,
    user: {
        type: Schema.Types.ObjectId,
        ref:"User"
    }
});

const User = mongoose.model("User",userSchema);
const Post = mongoose.model("Post",postSchema);

// const addData = async () =>{

//     let user = await User.findOne({username:"Ankita"});

//     // let user1 = new User ({
//     //     username: "Ankita",
//     //     email: "ankita@gmail.com"
//     // });

//     // let post1 = new Post ({
//     //     content: "Hello World",
//     //     likes: 7

//     let post2 = new Post ({
//         content: "BYE BYE :)",
//         likes: 7
//     });

//    // post1.user = user1;
//     post2.user = user;
//     await post2.save();

//     // await user1.save();
//     // await post1.save();
// };

// addData();

const getData = async () => {
    let result = await Post.findOne({}).populate("user");
    console.log(result);

};

getData();