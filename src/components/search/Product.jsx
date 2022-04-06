const Product = ({
  id,
  type,
  name,
  productCategory,
  image,
  previewText,
  starred,
  actions,
}) => (
  <>
    <td>
      {starred ? (
        <button
          className="btn btn-outline-warning"
          title="Add to starred"
          onClick={() =>
            actions.updateStarredFlag({ id, data: { starred: false } })
          }
        >
          <span>&#9733;</span>
        </button>
      ) : (
        <button
          className="btn btn-outline-secondary"
          title="Remove from starred"
          onClick={() =>
            actions.updateStarredFlag({ id, data: { starred: true } })
          }
        >
          <span>&#9734;</span>
        </button>
      )}
    </td>
    <td>
      <span>🌽 {type}</span>
    </td>
    <td>
      <span>{name}</span>
    </td>
    <td>
      <span>{productCategory}</span>
    </td>
    {image && (
      <td className="d-flex justify-content-center">
        <img src={image} alt={name} className="w-50 h-50" />
      </td>
    )}
    {previewText && <td>{previewText}</td>}
  </>
);

export default Product;
