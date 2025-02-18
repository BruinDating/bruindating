"use client";
import type { Contact } from "@/app/chat/page";

export default function Contacts({ friends, onSelectUser }: { friends: Contact[], onSelectUser: (user: Contact) => void }) {
    return (
        <aside className="w-1/4 bg-pink-100 p-4 text-gray-700 min-h-screen flex flex-col">
            <h2 className="text-xl font-bold">Contacts</h2>
            <div className="mt-4 space-y-2">
                {friends.map((friend) => (
                    <div 
                        key={friend.id} 
                        className="flex items-center space-x-2 p-2 bg-white rounded-lg cursor-pointer hover:bg-gray-100"
                        onClick={() => onSelectUser(friend)} // transfer the selected user to the parent component
                    >
                        <img src={friend.imageUrl} alt={friend.name} className="w-10 h-10 rounded-full" />
                        <div className="flex-1">
                            <p className="text-sm font-semibold">{friend.name}</p>
                            <p className="text-xs text-gray-500">Active now</p>
                        </div>
                    </div>
                ))}
            </div>
        </aside>
    );
}
