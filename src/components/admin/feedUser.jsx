import { useState } from "react";
import { useEffect } from "react";
import { User } from "lucide-react";

export default function AllUser() {
  const API_URL = import.meta.env.VITE_API_URL;
  const [users, setUsers] = useState();

  useEffect(() => {
    async function fetchData() {
      try {
        const res = await fetch(`${API_URL}/allUser`, {
          method: "GET",
          headers: {
            "Content-type": "application/json",
            Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
          },
        });

        if (!res.ok) {
          if (res.status === 500) {
            const data = await res.json();
            console.log(data);
            return;
          }
          const data = await res.text();
          console.log(data);
          return;
        }

        const data = await res.json();
        setUsers(data);
      } catch (error) {
        console.log(error);
      }
    }
    fetchData();
  }, []);
  return (
    <ul className="w-full flex flex-col gap-1 border p-2 rounded-xl border-gray-400">
      {users &&
        users.map((el, index) => (
          <li
            key={index}
            className="flex justify-between items-center py-2 border-b  border-green-100 cursor-pointer hover:bg-emerald-900 px-2 hover:text-white hover:rounded-lg"
          >
            <div className="flex gap-3">
              <User className="bg-green-700/80 text-green-200/80 rounded-full p-1 size-8" />
              <span className="text-lg font-semibold ">{el.email}</span>
            </div>

            <span className="text-gray-500">
              {el.createdAt ||
                `${new Date().getDate()}/${new Date().getMonth()}/${new Date().getFullYear()}`}
            </span>
          </li>
        ))}
    </ul>
  );
}
