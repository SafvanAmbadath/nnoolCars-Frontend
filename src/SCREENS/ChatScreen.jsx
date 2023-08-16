import React, { useEffect, useState } from "react";
import RentNavbar from "../COMPONENTS/RentNavbar";
import { useSelector } from "react-redux";
import moment from "moment";
import { AiOutlineSend } from "react-icons/ai";
import { BsEmojiSmile } from "react-icons/bs";
// import Picker from "emoji-picker-react";
import { useRef } from "react";
import { useParams } from "react-router-dom";
import { sendMessage, getChatList} from "../API/SERVICES/chat"
import { AiOutlineUser } from "react-icons/ai";
import Message from "../COMPONENTS/Modal/Message.";
import Loader from "../COMPONENTS/Loader/loader";
import { FaUsers } from "react-icons/fa";
import Chatlist from "../COMPONENTS/Modal/Chatlist";

function ChatScreen() {
  const { reciverId } = useParams();

  const { name, id, token } = useSelector((state) => state.userSlice);
  const [date, setDate] = useState(new Date());
  const [chatlist, setChatlist] = useState([]);
  const [loader, setLoader] = useState(false);
  const [openlist, setOpenlist] = useState(false);
  const [chatdata, setChatData] = useState("");
  const [msg, setMsg] = useState("");
  const [showEmojiPicker, setShowEmojiPicker] = useState(false);

  useEffect(() => {
    setLoader(true);
    getChatList(id, token).then((res) => {
      
      if (res.status === 200) {
        setLoader(false);
        const data = res.data.chatlist;
        // const reciverList = data.filter(order => order.members.includes(id))
        const filteredMembers = data.filter(
          (member) => member.memdersData[0]?._id !== id
        );

        setChatlist(filteredMembers);
      }
    });
  }, [chatdata]);



  // const sendChat = async()=>{
  //      const response =await sendMessage(id,msg,token)
  //      console.log(response);

  // }

  // const setEmojiPickerPosition = (element) => {
  //     const { bottom, left } = element.getBoundingClientRect();
  //     const emojiPickerHeight = 300; // or any other height you want
  //     const emojiPickerWidth = 300; // or any other width you want
  //     const windowHeight = window.innerHeight;
  //     const windowWidth = window.innerWidth;

  //     let top = bottom -element.offsetWidth ;
  //     let right = windowWidth - left - element.offsetWidth;

  //     if (top + emojiPickerHeight > windowHeight) {
  //       top = windowHeight - emojiPickerHeight;
  //     }

  //     if (right + emojiPickerWidth > windowWidth) {
  //       right = 0;
  //     }

  //     return { top, right };
  //   };

  // const handleEmojiClick = (event, emojiObject) => {
  //   let message = msg;
  //   message += emojiObject.emoji;
  //   setMsg(message);
  // };
  return (
    <div className=" h-screen  w-screen  ">
      <RentNavbar />
      <div className=" flex justify-center w-full p-1">
        <div className="lg:w-3/5 w-full h-[646px] mt-3 sm:flex bg-white">
          <div className="w-5/12 border-r-2 sm:block hidden rounded-lg">
            <div className="flex bg-yellow-500 w-full h-16 rounded-t-lg">
              <div className="p-2 w-12 h-12 rounded-full bg-slate-50 m-2">
                <AiOutlineUser className="text-3xl" />
              </div>
              <h1 className="text-xl text-black font-bold p-4">{name}</h1>
            </div>

            {chatlist.map((data, index) => (
              <div
                className="flex bg-gray-100 hover:bg-green-400 w-full h-16 "
                onClick={(e) => {
                  e.preventDefault();
                  setChatData(data);
                }}
              >
                <div className="p- w-12 h-12 rounded-full bg-slate-50 m-2 ">
                  <img
                    className=""
                    src="https://img.icons8.com/3d-fluency/94/null/user-male-circle.png"
                  />
                </div>
                <h1 className="text-xl text-black font-bold p-4">
                  {data.memdersData[0]?.name}
                </h1>
              </div>
            ))}
          </div>
          <div className="sm:hidden  block w-full ">
            <div className="md:absolute sticky top-40  w- h-20 shadow-md flex justify-between pr-2 ">
              <div className="h-14 md:w-0 w-10/12 bg-stone-800 rounded-lg m-3 flex  justify-">
                <AiOutlineUser className="text-3xl m-2 text-white" />

                <h1 className="text-xl text-white p-3 z-50">{name}</h1>
              </div>
              <div
                className="w-20 h-20 bg-green-600 rounded-xl p-4 z-50"
                onClick={() => setOpenlist(true)}
              >
                <FaUsers className="text-3xl font-bold m-2 text-white" />
              </div>
              {
                <Chatlist
                  chatlist={chatlist}
                  setChatData={setChatData}
                  setOpenlist={setOpenlist}
                  Open={openlist}
                />
              }
            </div>
          </div>

          {chatdata ? (
            <Message
              name={name}
              setChatData={setChatData}
              chatdata={chatdata}
              senderId={id}
              token={token}
            />
          ) : (
            <>
              <div>
                <span className="flex w-full justify-center pt-[300px] text-xl text-red-600">
                  open a conversation to start a chat
                </span>
                <div className="md:hidden block text-red-800 pt-3 text-center h-8 capitalize">
                  see all
                </div>
              </div>
            </>
          )}
        </div>
      </div>
      {loader ? <Loader loader={loader} /> : null}
    </div>
  );
}

export default ChatScreen;
