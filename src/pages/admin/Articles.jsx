import { useContext } from "react";
import { AppContext } from "../../components/context";
import { Link } from "react-router-dom";
import { Delete } from "lucide-react";
export default function Articles() {
  const { article, DeleteArticle } = useContext(AppContext);

  return (
    <div className="sm:space-y-4sm:m-5 m-3 sm:max-w-4xl mx-auto pt-10 space-y-4">
      <h2 className="sm:text-2xl text-2xl font-semibold">Tous les articles</h2>
      <ul className="bg-gray-100 rounded-xl p-2 md:w-3xl md:p-4 flex flex-col gap-2 min-h-full justify-between">
        <div className="space-y-4">
          {article &&
            article.slice(0, 5).map((el, index) => (
              <Link to={`/admin/dashboard/articles/${el._id}`}>
                <li
                  key={index}
                  className="flex justify-between pb-4 border border-gray-400 p-2 rounded-lg cursor-pointer hover:scale-101 duration-100"
                >
                  <div>
                    <h3 className="w-70 md:w-150 overflow-auto text-lg text-gray-900">
                      {el.title}
                    </h3>
                    <div className="space-x-4">
                      <span className="text-md text-green-600">
                        {new Date(el.createdAt).toLocaleDateString()}
                      </span>
                      <span>0 vue(s)</span>
                    </div>
                  </div>

                  <div className="flex items-end ">
                    <Delete
                      className="cursor-pointer"
                      onClick={() => DeleteArticle(el._id)}
                    />
                  </div>
                </li>
              </Link>
            ))}
        </div>
      </ul>
    </div>
  );
}
