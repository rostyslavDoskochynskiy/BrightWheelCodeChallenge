import { useState } from "react";
import { Form, Table, Spinner } from "react-bootstrap";
import { useSearch, useUpdateStarredFlag } from "../api/search";
import Product from "../components/search/Product";
import Animal from "../components/search/Animal";
import Company from "../components/search/Company";
import Cart from "../components/search/Cart";

const dataType = {
  product: (props) => <Product {...props} />,
  animal: (props) => <Animal {...props} />,
  company: (props) => <Company {...props} />,
};

const Search = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const { data, isLoading } = useSearch(searchQuery);
  const { mutate } = useUpdateStarredFlag();

  return (
    <>
      <Form className="d-flex justify-content-between mb-3">
        <Form.Group className="w-75" controlId="exampleForm.ControlInput1">
          <Form.Control
            type="text"
            placeholder="Search"
            value={searchQuery}
            autoComplete="off"
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </Form.Group>
        <Cart />
      </Form>

      {!!data?.length && !isLoading && (
        <Table bordered responsive>
          {!!data?.length && (
            <tbody>
              {data
                .splice(0, 10)
                .sort((a, b) => b.starred - a.starred)
                .map((item) => (
                  <tr key={item.id}>
                    {dataType[item.type]({
                      ...item,
                      actions: { updateStarredFlag: mutate },
                    })}
                  </tr>
                ))}
            </tbody>
          )}
        </Table>
      )}

      {isLoading && (
        <div className="position-relative">
          <Spinner
            animation="grow"
            className="position-absolute top-50 start-50 mt-5"
          />
        </div>
      )}

      {!data?.length && !isLoading && !!searchQuery && (
        <div className="text-center mt-5">No data</div>
      )}
    </>
  );
};

export default Search;
