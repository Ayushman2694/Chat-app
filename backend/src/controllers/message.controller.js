import Message from "../models/message.model.js";
import User from "../models/user.model.js";
import cloudinary from "../utils/cloudinary.util.js";

export const getUsersForSidebar = async (req, res) => {
  try {
    const loggedInUserId = req.user._id;
    const users = await User.find({ _id: { $ne: loggedInUserId } }).select(
      "-password"
    );
    return res
      .status(200)
      .json({ message: "users fetched successfully", users });
  } catch (error) {
    console.log("error in getUsersForSidebar controller", error.message);
    return res.status(500).json({ message: "Internal Server Error" });
  }
};

export const getMessages = async (req, res) => {
  try {
    const { id: userToChatId } = req.params;
    const myId = req.user._id;

    const messages = await Message.find({
      $or: [
        { senderId: myId, receiverId: userToChatId },
        { senderId: userToChatId, receiverId: myId },
      ],
    });
    return res.status(200).json(messages);
  } catch (error) {
    console.log("error in getMessage controller", error.message);
    return res.status(500).json({ message: "Internal Server Error" });
  }
};

export const sendMessage = async (req, res) => {
  try {
    const { id:receiverId } = req.params;
    const senderId = req.user._id;
    const {text,image} = req.body;
    let imageUrl;
    if(image){
        const uploadResponse = await cloudinary.uploader.upload(image)
        imageUrl = uploadResponse.secure_url
    }
     const newMessage = new Message({
        senderId,
        receiverId,
        text,
        image:imageUrl
     })
     await newMessage.save()
     //todo:realtime functionality through socket.io
    return res.status(200).json(newMessage)
  } catch (error) {
    console.log("error in sendMessage controller",error.message)
    return res.status(500).json({message:"Internal Server Error"})
  }
};
