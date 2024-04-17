import MenuItem from "../models/MenuItem.js"

/**
 * Post / Menu
 */

export const postMenu = async (req,res) =>{
  try {
    const data = req.body;

    const newMenu = new MenuItem(data);

    console.log('Menu Created');

    const menuResponse = await newMenu.save();
    res.status(201).json(menuResponse);

  } catch (error) {
    console.log(error);
      res.status(500).json({error:'Internal Server Error'})
  }
    
}

/**
 * Get / Menu
 */

 export const  getMenu = async (req,res)=>{
try {
  const data = await MenuItem.find();
  console.log('Menu Fetched');
  res.status(200).send({message:"Fetched all menu's!"},data);
} catch (error) {
  console.log(error);

  res.status(500).json({error:'Internal Server Error'})
}
}

/**
 * Get / Menu by taste
 */
export const menuByTaste  = async (req, res)=>{
  try {
    const tasteType = req.params.tasteType;
    if( tasteType === 'sour' || tasteType === 'spicy' || tasteType === 'sweet'){
      const data = await MenuItem.find({taste:tasteType});
      console.log('Menu fetched by taste');
      res.status(200).json(data);

    }else{
      res.status(400).json({ error: "Invalid Work Type" });
    }
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: "Internal Server Error" });
  }

}

/**
  *  PUT / Update
  * /menu/:id
  */

export const updateMenuById = async (req,res) =>{
  try {
    const menuId = req.params.id;
    const updatedMenuEntries = req.body;

    const updatedMenu = await MenuItem.findByIdAndUpdate(menuId,updatedMenuEntries,{
      new:true,
      runValidators:true
    });
    if(!updatedMenu){
      return res.status(404).json({error:'Menu not found'})
    }
    console.log('Menu Updated');
    res.status(200).json(updatedMenu)
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: "Internal Server Error" });
  }
}

/**
 * DELETE / Menu
 *  /menu/:id
 */

export const deleteMenuById = async (req,res) =>{
  try {
    const menuId = req.params.id;
    

    const deleteMenu = await MenuItem.findByIdAndDelete(menuId);
    if(!deleteMenu){
      return res.status(404).json({error:'Menu not found'})
    }
    console.log('Menu Deleted Succefully');
    res.status(200).json({Mesage:'Menu Delete SuccessFully'})
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: "Internal Server Error" });
  }
}