export default function Description({ el }) {
  function findParagraph(data) {
    for (const node of data.content) {
      if (node.type === "text") return node;
    }
    return null;
  }
  const description = findParagraph(el);
  return (
    <p className="mt-2  whitespace-pre-wrap sm:text-lg text-md">
      {description ? description.value : ""}...
    </p>
  );
}
