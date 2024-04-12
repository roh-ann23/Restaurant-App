import mongoose  from "mongoose";

const Menu_ItemSchema = new mongoose.Schema({
  name: { 
    type: String,
     required: true 
    },
  price: { 
    type: Number, 
    required: true 
    },
  taste: {
     type: String,
     enum : ['sour','sweet','spicy'],
     required: true
     },
  is_drink: { 
    type: Boolean, 
    required: true
    },
  ingredients: {
     type: [String],
     default : [],
    //  required: true 
    },
  num_sales: {
     type: Number,
    //  required: true, 
     default: 0 },
});

const Item = mongoose.model("MenuItem", Menu_ItemSchema);

export default Item;
