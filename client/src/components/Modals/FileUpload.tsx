import React from "react";
import {  Form,  } from "react-bootstrap";

// interface IDeleteModal {
//   id: number;
//   show: boolean;
//   setShow: (show: boolean) => void;
//   type: DeleteModalEnum;
// }
export const FileUpload = () => {
  return (
    <Form.Group className="mt-1">
      <Form.Label>Upload the picture</Form.Label>
      <Form.Control type="file" />
    </Form.Group>
  );
};
