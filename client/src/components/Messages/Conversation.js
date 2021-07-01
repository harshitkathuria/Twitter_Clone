import axios from "axios";
import { useEffect, useState } from "react";

export default function Conversation({ conversation, currentUser }) {
  const [user, setUser] = useState(null);

  useEffect(() => {
    const friendId = conversation.members.find(m => m !== currentUser._id);

    const getUser = async () => {
      try {
        const res = await axios("/api/users/" + friendId);
        setUser(res.data.data.user);
      } catch (err) {
        console.log(err);
      }
    };
    getUser();
  }, [currentUser, conversation]);
  return (
    <div className="conversation dark:hover:bg-gray-900">
      <span className="conversationName font-bold">{user?.name}</span>
    </div>
  );
}
