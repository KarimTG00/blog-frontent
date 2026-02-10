export default function ImageRecent({ el }) {
  console.log("dans image");
  function findImages(data) {
    for (const node of data.content ?? []) {
      if (node.type === "image") return node;
    }
    return null;
  }
  const image = findImages(el);
  console.log(image.src);
  return (
    <div className=" w-15 aspect-video overflow-hidden rounded-lg">
      <img
        src={image && image.src}
        alt=""
        className="rounded-lg w-full h-full  object-cover"
      />
    </div>
  );
}
