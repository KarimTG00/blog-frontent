const API_URL = import.meta.env.VITE_API_URL;
// recuperer le total pour adminMEnu
export async function total() {
  const res = await fetch(`${API_URL}/getArticles`, {
    method: "GET",
    headers: {
      "Content-type": "application/json",
      Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
    },
  });
  return res.json();
}

// recuperer le nombres de vues du jour
export async function fetchData() {
  const res = await fetch(`${API_URL}/dayViews`, {
    method: "GET",
    headers: {
      "Content-type": "application/json",
      Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
    },
  });

  return res.json();
}

// retourne les articles
export async function getDoc() {
  const res = await fetch(`${API_URL}/Adminarticles`, {
    method: "get",
    headers: {
      "Content-type": "application/json",
      Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
    },
  });
  return res.json();
}

// on recupére les articles pour la page principale
export async function getArticle(pageParam) {
  const res = await fetch(
    `${API_URL}/articles?page=${encodeURIComponent(pageParam)}`,
    {
      method: "get",
      headers: { "Content-type": "application/json" },
    },
  );
  return res.json();
}

// export async function getArticle2(pageParam) {
//   console.log(pageParam);
//   const res = await fetch(`${API_URL}/articles?page=${encodeURIComponent(pageParam)}`, {
//     method: "get",
//     headers: { "Content-type": "application/json" },
//   });
//   return res.json();
// }

export async function getOtherArticles() {
  const res = await fetch(`${API_URL}/otherArticles`, {
    method: "get",
    headers: { "Content-type": "application/json" },
  });
  // const data = await res.json();
  // console.log(data);
  // return data.slice(0, 5);
  const data = await res.json();
  console.log(data);
  return data;
}
// recuperer le singleArticle

export async function getSingleArticle(id) {
  const res = await fetch(`${API_URL}/article/${id}`, {
    method: "get",
    headers: { "Content-type": "application/json" },
  });
  const data = await res.json();
  console.log("voici la data2", data);
  return data;
}

// requete de suppresion
export async function DeleteArticle(id) {
  const res = await fetch(`${API_URL}/deleteArticle/${id}`, {
    method: "delete",
    headers: {
      "Content-type": "application/json",
      Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
    },
  });
  return res.json();
}
