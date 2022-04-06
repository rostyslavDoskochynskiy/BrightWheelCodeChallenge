const Company = ({
  id,
  type,
  name,
  description,
  address,
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
      <span>🏢 {type}</span>
    </td>
    <td>
      <span>{name}</span>
    </td>
    <td>
      <span>{description}</span>
    </td>
    <td>
      <span>{address.address1}</span>
    </td>
  </>
);

export default Company;
