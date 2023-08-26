import React, { useEffect, useState } from "react";
import moment from "moment";
import { AiOutlineSend, AiOutlineUser } from "react-icons/ai";
import { createMessage } from "../../API/SERVICES/chat";
import { getOldMessages } from "../../API/SERVICES/chat";
import io from "socket.io-client";
import { message } from "antd";


let socket = io.connect("https://nnoolcars.onrender.com");
// let socket = io.connect("https://localhost:4000");

function Message({ date, name, chatdata, senderId, token, setChatData }) {
  const [msg, setMsg] = useState("");
  const [messagedata, setMessagedata] = useState([]);
  const [loadMessage, setloadMessage] = useState(false);
  const [arrivalMessage, setArrivalMessage] = useState("");

  useEffect(() => {
    socket.on("receive_message", (data) => {
      setArrivalMessage({
        sender: data.senderId,
        text: data.text,
        createdAt: Date.now(),
      });
    });
  }, [socket]);

  useEffect(() => {
    getOldMessages(chatdata._id, token).then((res) => {
      setMessagedata(res.data);
      setloadMessage("");
    });
  }, [chatdata, loadMessage, arrivalMessage]);

  const sendChat = async (e) => {
    if (msg === "") {
      //    message.error('no text')
    } else {
      setloadMessage(!loadMessage);
      const res = await createMessage(chatdata._id, senderId, msg);
      console.log(res);

      if (res.status === 200) {
        setMsg("");
        setloadMessage(!loadMessage);
      }
      // const recieverId = currentChat.members.find((member) => member !== userId);
      await socket.emit("sendMessage", {
        senderId: senderId,
        recieverId: chatdata._id,
        text: msg,
      });
      // sendMessages(message);
    }
  };

  //   return (
  //     <div className='sm:w-8/12 justify-between w-full sm:p-0 px-4  h-full'>
  //                 <div className='h-16 w-full  flex'>
  //                 <div className='flex bg-gray-400 w-full h-16 ' >
  //                     <div className='p-2 w-12 h-12 rounded-full bg-slate-50 m-2'>
  //                         <AiOutlineUser  className='text-3xl '/>

  //                     </div>
  //                     <h1 className='text-xl text-black font-bold p-4'>{chatdata.memdersData[0].name}</h1>

  //                 </div>

  //                 </div>
  //                 <div className='h-400  overflow-scroll scrollbar-hide'>
  //                 { messagedata.map((data,index)=>
  //             data.sender !== senderId ? (  <div className='m-2 flex justify-start  '>
  //                <div className='bg-green-100'>
  //                <h1 className='p-2 bg-green-100 rounded-xl'>{ data.text}</h1>

  //                </div>

  //            </div>) :

  //   (<div className='m-2 flex justify-end text-white'>
  //                         <div className='bg-green-600 rounded-xl justify-end '>

  //                           <h1 className='text-end p-2 '>{ data.text}</h1>
  //                         <div className='flex w-full text-end justify-end -mt-2'>
  //                               <h1 className='text-sm  mr-2 text-end '>{moment(data.createdAt).format('h : mm A')}</h1>

  //                         </div>
  //                         </div>

  //                     </div>)
  //                     )   }

  //                 <div className='h-14 w-full  fixed bottom-0 left-28   placeholder-gray-400 flex p-2 justify-center'>

  //                      <input
  //                      type="text"
  //                      placeholder="type your message here"
  //                      onChange={(e) => setMsg(e.target.value)}
  //                      value={msg}
  //                      className='sm:w-64'
  //                    />

  //                     <div className='rounded-full p-1.5 -2 ml-2 ' onClick={sendChat}>
  //                         <AiOutlineSend  className='text-xl mt-1' />
  //                     </div>
  //                 </div>

  //                 </div>

  //             </div>
  //   )

  return (
    <>
      <div className="flex flex-col gap-6 w-5/6 h-[646px] bg-gray-300   rounded-md p-4 justify-between ">
        {chatdata ? (
          <>
            <div className="p-4 flex flex-col bg-white hover:bg-red-100">
              <div className="flex flex-row ">
                <img
                  className="w-12 h-12"
                  src="https://img.icons8.com/3d-fluency/94/null/user-male-circle.png"
                />
                <div className="font-semibold mx-3 justify-center flex-col flex">
                  <span>{chatdata?.memdersData[0]?.name} </span>
                </div>
              </div>
              <hr className="mt-3 border border-gray-300 "></hr>
            </div>

            {/* chat-box messages*/}

            <div className="flex flex-col gap-3 p-5 h-full  overflow-y-scroll">
              {messagedata.length !== 0
                ? messagedata?.map((message) => {
                    return (
                      <>
                        <div
                          className={
                            message.sender == senderId
                              ? "  self-end rounded-t-lg rounded-l-lg bg-sender flex flex-col text-white bg-green-500"
                              : " @apply text-[black] max-w-md w-fit flex flex-col gap-1 p-[-0.5rem] rounded-t-lg rounded-r-lg bg-white"
                          }
                        >
                          <span className="text-sm font-semibold justify-center mx-3 my-2 ">
                            {message?.text}
                          </span>
                          <span className="text-xs justify-end flex mx-3 mb-1  ">
                            {moment(message.createdAt).format("h : mm A")}
                          </span>
                        </div>
                      </>
                    );
                  })
                : "Type a message "}
            </div>

            {/* chat-sender */}

            <div className="bg-white flex justify-between w-full overflow-hidden items-center gap-4 p-3 rounded-lg ">
              <div className="w-10 h-10 rounded-md bg-primary justify-center flex">
                <h1 className="justify-center mt-[7px] flex font-semibold text-white">
                  {" "}
                  +
                </h1>
              </div>
              {/* <InputEmogi
    
  
    value = {newMessage}
    onChange = {Handlechange}/> */}

              <input
                type="text"
                placeholder="type your message here"
                onChange={(e) => setMsg(e.target.value)}
                value={msg}
                className=" h-12  w-full"
              />

              <div
                className="bg-primary rounded-lg pointer hover:border hover:border-primary hover:text-primary hover:bg-white border-2 border-gray-300"
                onClick={sendChat}
              >
                <h1 className="mx-2 my-2 text-black">Send</h1>
              </div>
            </div>
          </>
        ) : (
          <span className="flex items-center justify-center font-semibold text-xl">
            Tap on a chat to start conversation...
          </span>
        )}
      </div>
    </>
  );
}

export default Message;
