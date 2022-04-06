const Animal = ({ id, type, name, taxonomy, image, starred, actions }) => (
  <>
    <td>
      {starred ? (
        <button
          className="btn btn-outline-warning"
          title="Remove from starred"
          onClick={() =>
            actions.updateStarredFlag({ id, data: { starred: false } })
          }
        >
          <span>&#9733;</span>
        </button>
      ) : (
        <button
          className="btn btn-outline-secondary"
          title="Add from starred"
          onClick={() =>
            actions.updateStarredFlag({ id, data: { starred: true } })
          }
        >
          <span>&#9734;</span>
        </button>
      )}
    </td>
    <td>
      <span>🐶 {type}</span>
    </td>
    <td>
      <span>{name}</span>
    </td>
    <td>
      <span>{taxonomy.scientificName}</span>
    </td>
    {image && (
      <td className="d-flex justify-content-center">
        <img src={image} alt={name} className="w-50 h-50" />
      </td>
    )}
  </>
);

export default Animal;
