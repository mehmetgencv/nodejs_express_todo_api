const todo = require("../models/todoModel");

const todoAdd = async (req, res) => {
  console.log(req.body);
  try {
    const _todo = await todo.findOne({ name: req.body.name });
    console.log(_todo);
    if (_todo) {
      return res.status(400).json({
        success: false,
        message: "Dublicated name",
      });
    }

    const todoAdd = new todo(req.body);
    await todoAdd
      .save()
      .then(() => {
        return res.status(201).json(todoAdd);
      })
      .catch((err) => {
        return res.status(400).json({
          success: false,
          message: "Kayit olusturulurken hata olustu : " + err,
        });
      });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "Kayit olusturulamadi : " + error,
    });
  }
  console.log("todoAdd icerisinde");
};

const todoGetAll = async (req, res) => {
  const { page } = req.query; 
  const limit = 2;
  const skip = Number(page - 1) * limit;
  try {
    const todoGetAll = await todo.find({}).limit(limit).skip(skip);
    return res.status(200).json({
      success: true,
      data: todoGetAll,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "Not reach to the Server : " + error,
    });
  }
};

const todoUpdate = async (req, res) => {
  const { id } = req.params;
  try {
    const todoUpdate = await todo.findByIdAndUpdate(id, req.body);
    if (todoUpdate) {
      return res.status(200).json({
        success: true,
        message: "Update succesfull",
      });
    } else
      return res.status(400).json({
        success: false,
        message: "Update failed : " + error,
      });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "Not reach to the Server : " + error,
    });
  }
};

const todoDelete = async (req, res) => {
  const { id } = req.params;
  try {
    const todoDelete = await todo.findByIdAndDelete(id);
    if (todoDelete) {
      return res.status(200).json({
        succes: true,
        message: "Task is deleted",
      });
    } else {
      return res.status(400).json({
        success: false,
        message: "Task is not deleted",
      });
    }
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "Not reach the server : " + error,
    });
  }
};

const todoGetSingle = async (req, res) => {
  const { id } = req.params;
  try {
    const todoGetSingle = await todo.findById(id);
    if (todoGetSingle) {
      return res.status(200).json({
        success: true,
        data: todoGetSingle,
      });
    } else {
      return res.status(400).json({
        success: false,
        message: "Cant fet the single task",
      });
    }
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "Not reach the server : " + error,
    });
  }
};

module.exports = {
  todoAdd,
  todoGetAll,
  todoUpdate,
  todoDelete,
  todoGetSingle,
};
