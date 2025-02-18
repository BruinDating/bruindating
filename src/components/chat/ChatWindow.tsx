"use client";
import { useState, useEffect, useRef } from "react";
import type { Contact } from "@/app/chat/page";

interface Message {
    id: number;
    text: string;
    sender: string;
}

export default function ChatWindow({ user }: { user: Contact }) {
    // store messages history
    const [messages, setMessages] = useState<{ [key: number]: Message[] }>({
        1: [{ id: 1, text: "Hey! How are you?", sender: "other" }],
        2: [{ id: 1, text: "It's been a while!", sender: "other" }],
        3: [{ id: 1, text: "Let's catch up soon.", sender: "other" }],
        4: [{ id: 1, text: "Hope you're doing well!", sender: "other" }],
        5: [{ id: 1, text: "Did you see the latest news?", sender: "other" }]
    });

    const [inputText, setInputText] = useState(""); 
    const [showMenu, setShowMenu] = useState(false);
    const [showEmojiPicker, setShowEmojiPicker] = useState(false); 
    const [zoomedImage, setZoomedImage] = useState<string | null>(null); 

    const menuRef = useRef<HTMLDivElement | null>(null);
    const emojiRef = useRef<HTMLDivElement | null>(null);
    const messagesContainerRef = useRef<HTMLDivElement | null>(null); // ✅ 聊天窗口
    const messagesEndRef = useRef<HTMLDivElement | null>(null); // ✅ 聊天结尾

    // close menu and emoji picker when click outside
    useEffect(() => {
        function handleClickOutside(event: MouseEvent) {
            if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
                setShowMenu(false);
            }
            if (emojiRef.current && !emojiRef.current.contains(event.target as Node)) {
                setShowEmojiPicker(false);
            }
        }
        document.addEventListener("mousedown", handleClickOutside);
        return () => document.removeEventListener("mousedown", handleClickOutside);
    }, []);

        //jump to the bottom of the chat window when the user changes
        useEffect(() => {
            if (messagesContainerRef.current) {
                messagesContainerRef.current.scrollTop = messagesContainerRef.current.scrollHeight;
            }
        }, [user]);
    

        // roll to the bottom of the chat window when the message changes
        useEffect(() => {
            messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
        }, [messages]);

        // fetch messages history from backend
        useEffect(() => {
            /*
            fetch(`/api/messages?userId=${user.id}`)
                .then((res) => res.json())
                .then((data) => {
                    setMessages((prevMessages) => ({
                        ...prevMessages,
                        [user.id]: data.messages // ✅ 更新当前 `user.id` 的聊天记录
                    }));
                })
                .catch((error) => console.error("Error fetching messages:", error));
            */
        }, [user.id]); // reask chat history when the user changes
    
    // send message
    const sendMessage = () => {
        if (inputText.trim() !== "") {
            setMessages((prevMessages) => ({
                ...prevMessages,
                [user.id]: [
                    ...(prevMessages[user.id] || []), // 取当前用户的聊天记录
                    { id: Date.now(), text: inputText, sender: "me" } // 新增消息
                ]
            }));

            /*
            // API - send message to backend
            fetch("/api/messages", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({
                    userId: user.id,
                    message: inputText,
                    sender: "me"
                })
            }).catch((error) => console.error("Error sending message:", error));
            */

            setInputText("");
        }
    };

    // emoji picker
    const addEmoji = (emoji: string) => {
        setInputText(inputText + emoji);
        setShowEmojiPicker(false);
    };

    return (
        <main className="flex flex-col flex-1 bg-white h-screen p-4">
            {/* zoom out the avatar when the mouse is clicked */}
            {zoomedImage && (
                <div
                    className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50"
                    onClick={() => setZoomedImage(null)}
                >
                    <img 
                        src={zoomedImage} 
                        alt="Zoomed User"
                        className="rounded-full w-[500px] h-[500px] border-4 border-white shadow-lg transition-all duration-300 transform -translate-y-10"
                    />
                </div>
            )}

            {/* top bar */}
            <div className="flex items-center justify-between px-4 py-3 bg-pink-50 shadow rounded-lg">
                <h2 className="text-lg font-bold text-gray-700 flex-1 text-center">{user.name}</h2>
                <div className="relative" ref={menuRef}>
                    <button
                        className="text-gray-600 text-xl"
                        onClick={() => setShowMenu(!showMenu)}
                    >
                        ...
                    </button>
                    {showMenu && (
                        <div className="absolute right-0 mt-2 w-48 bg-white border rounded-lg shadow-lg">
                            <ul className="py-2 text-gray-700">
                                <li className="px-4 py-2 hover:bg-gray-100 cursor-pointer">
                                    View Profile
                                </li>
                                <li className="px-4 py-2 hover:bg-gray-100 cursor-pointer">
                                    Unmatch
                                </li>
                                <li className="px-4 py-2 hover:bg-gray-100 cursor-pointer">
                                    Report
                                </li>
                            </ul>
                        </div>
                    )}
                </div>
            </div>

            {/* chat content */}
            <div ref={messagesContainerRef} className="flex-1 overflow-y-auto p-4 space-y-4">
                {messages[user.id]?.map((msg) => (
                    <div key={msg.id} className={`flex items-center ${msg.sender === "other" ? "justify-start" : "justify-end"}`}>
                        {msg.sender === "other" && (
                            <img
                                src={user.imageUrl}
                                alt="User"
                                className="w-10 h-10 rounded-full mr-2 cursor-pointer"
                                onClick={() => setZoomedImage(user.imageUrl)}
                            />
                        )}
                        <div className={`px-4 py-2 rounded-lg ${msg.sender === "other" ? "bg-pink-50 text-gray-800" : "bg-blue-200 text-gray-900"} whitespace-pre-wrap`}>
                            {msg.text}
                        </div>
                    </div>
                ))}
                <div ref={messagesEndRef} />
            </div>

            {/* bottom bar - input box */}
            <div className="relative flex items-center p-3 bg-white shadow mt-2 rounded-lg">
                <button className="text-gray-600 text-2xl">➕</button>

                {/* emoji choose button */}
                <div className="relative">
                    <button
                        className="text-gray-600 text-2xl mx-2"
                        onClick={() => setShowEmojiPicker(!showEmojiPicker)}
                    >
                        😊
                    </button>

                    {/* emoji box */}
                    {showEmojiPicker && (
                        <div ref={emojiRef} className="absolute bottom-12 left-0 w-56 bg-white border rounded-lg shadow-lg p-2 grid grid-cols-6 gap-2">
                            {["😀", "😂", "😍", "😎", "😜", "🤔", "😢", "😭", "😡", "👍", "👏", "🙌"].map((emoji) => (
                                <button 
                                    key={emoji} 
                                    className="text-3xl hover:bg-gray-100 rounded-lg p-1"
                                    onClick={() => addEmoji(emoji)}
                                >
                                    {emoji}
                                </button>
                            ))}
                        </div>
                    )}
                </div>

                <input
                    type="text"
                    placeholder="Type a message..."
                    value={inputText}
                    onChange={(e) => setInputText(e.target.value)}
                    onKeyDown={(e) => e.key === "Enter" && sendMessage()}
                    className="flex-1 px-3 py-2 bg-gray-100 rounded-lg outline-none text-gray-900 placeholder-gray-700 whitespace-pre-wrap"
                />
                <button 
                    onClick={sendMessage} 
                    className="ml-2 bg-blue-300 text-white px-4 py-2 rounded-lg 
                            transition-transform duration-150 active:scale-95 hover:bg-blue-400"
                >
                    Send
                </button>
            </div>
        </main>
    );
}
