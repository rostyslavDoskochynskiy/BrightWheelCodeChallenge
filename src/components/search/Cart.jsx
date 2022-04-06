import { useState } from "react";
import { Spinner, Modal, Button } from "react-bootstrap";
import { useCart } from "../../api/search";

const Cart = () => {
  const { data, isLoading } = useCart();
  const [showModal, setShowModal] = useState(false);

  return (
    <>
      <button
        type="button"
        className="position-relative bg-warning rounded p-2 d-flex justify-content-center"
        onClick={() => setShowModal(true)}
      >
        {isLoading ? (
          <Spinner
            animation="border"
            className="text-light spinner-border-sm"
          />
        ) : (
          <span>&#9733;</span>
        )}
        {!isLoading && !!data?.length && (
          <span className="position-absolute top-0 start-100 translate-middle badge rounded-pill bg-danger">
            {data.length}
          </span>
        )}
      </button>
      <Modal
        scrollable
        show={showModal}
        onHide={() => setShowModal(false)}
        backdrop="static"
        keyboard={false}
      >
        <Modal.Header closeButton>
          <Modal.Title>Starred items</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          {!!data?.length && !isLoading && (
            <ol>
              {!!data?.length &&
                data.map((item) => (
                  <li key={item.id} className="border-bottom p-2">
                    <ul>
                      <li>{item.type}</li>
                      <li>{item.name}</li>
                      <li>{item.productCategory}</li>
                      {item.image && (
                        <li>
                          <img
                            src={item.image}
                            alt={item.name}
                            className="w-50 h-50"
                          />
                        </li>
                      )}
                      {item.previewText && <li>{item.previewText}</li>}
                      {item.description && <li>{item.description}</li>}
                      {item?.address?.address1 && <li>{item.description}</li>}
                      {item?.taxonomy?.scientificName && <li>{item.taxonomy.scientificName}</li>}
                    </ul>
                  </li>
                ))}
            </ol>
          )}
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={() => setShowModal(false)}>
            Close
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
};

export default Cart;
