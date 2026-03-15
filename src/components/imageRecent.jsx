export default function ImageRecent({ el }) {
  function findImages(data) {
    for (const node of data.content ?? []) {
      if (node.type === "image") return node;
    }
    return null;
  }
  const image = findImages(el);
  return (
    <div className="aspect-video overflow-hidden rounded-lg w-25 h-20">
      <img
        src={image && image.attrs.src}
        alt=""
        className="rounded-lg w-full h-full  object-cover"
      />
    </div>
  );
}
