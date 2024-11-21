
import {create} from "zustand"
import { axiosInstance } from "../lib/axios";
import toast from "react-hot-toast";
import { useAuthStore } from "./useAuthStore";

export const useChatStore = create((set,get)=>({
messages:[],
users:[],
selectedUser:null,
isUsersLoading:false,
isMessageLoading:false,


getUsers:async()=>{
    set({isUsersLoading:true})
    try {
        const res = await axiosInstance.get("/message/users")
        set({users:res.data.users})
    } catch (error) {
        toast.error(error.response.data.message)
    }
    finally{
        set({isUsersLoading:false})
    }
},

getMessages:async(userId)=>{
    set({isMessageLoading:true})
    try {
        const res = await axiosInstance.get(`/message/${userId}`)
        console.log(res)
        set({messages:res.data})
    } catch (error) {
        toast.error(error.response.data.message)
    }
    finally{
        set({isMessageLoading:false})
    }
},

setSelectedUser: (selectedUser) => set({ selectedUser }),

sendMessage: async (messageData) => {
    const { selectedUser, messages } = get();
    try {
      const res = await axiosInstance.post(`/message/send-message/${selectedUser._id}`, messageData);
      console.log(res)
      set({ messages: [...messages, res.data.text] });
    } catch (error) {
      toast.error(error.response.data.message);
    }
  },

  subscribeToMessages: () => {
    const { selectedUser } = get();
    if (!selectedUser) return;

    const socket = useAuthStore.getState().socket;

    socket.on("newMessage", (newMessage) => {
      const isMessageSentFromSelectedUser = newMessage.senderId === selectedUser._id;
      if (!isMessageSentFromSelectedUser) return;

      set({
        messages: [...get().messages, newMessage],
      });
    });
  },

  unsubscribeFromMessages: () => {
    const socket = useAuthStore.getState().socket;
    socket.off("newMessage");
  },
}))