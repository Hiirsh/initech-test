import React from "react";
import { Form } from "react-bootstrap";

interface IFileUpload {
  setSelectedFile: (file: File) => void;
  setIsFilePicked: (isPicked: boolean) => void;
}
export const FileUpload = ({
  setSelectedFile,
  setIsFilePicked,
}: IFileUpload) => {
  const handleUploadPicture = React.useCallback(
    (e: React.FormEvent<HTMLElement>) => {
      //@ts-ignore
      setSelectedFile(e.target.files[0]);
      setIsFilePicked(true);
    },
    [setIsFilePicked, setSelectedFile]
  );

  return (
    <Form.Group className="mt-1">
      {/* @ts-ignore */}
      <Form.Label>Upload the picture</Form.Label>
      <Form.Control type="file" onChange={handleUploadPicture} />
    </Form.Group>
  );
};
