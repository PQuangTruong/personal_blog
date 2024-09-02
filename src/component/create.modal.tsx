'use client'

import { IpcNetConnectOpts } from 'net';
import { useState } from 'react';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import Form from 'react-bootstrap/Form';
import { toast } from 'react-toastify';
import { mutate } from "swr"

interface IPros {
  showModalCreate: boolean
  setShowModalCreate: (value: boolean) => void
}
function CreateModal(props: IPros) {
  const { showModalCreate, setShowModalCreate } = props;

  const [title, setTilte] = useState<string>("");
  const [author, setAuthor] = useState<string>("");
  const [content, setContent] = useState<string>("");

  const handleSubmitForm = () => {
    if (!title) {
      toast.error("Không được để trống tiêu đề")
      return;
    }
    if (!author) {
      toast.error("Không được để trống tên tác giả")
      return;
    }
    if (!content) {
      toast.error("Không được để trống nội dung")
      return;
    }
    fetch("http://localhost:8000/blogs",
      {
        method: "POST",
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({title, author, content})
      })
      .then(res => res.json())
      .then(res => {
        if (res) {
          toast.success("Tạo Thành Công")
          handleCloseModal();
          mutate("http://localhost:8000/blogs")
        }
      })
  }

  const handleCloseModal = () => {
    setTilte("");
    setAuthor("");
    setContent("");
    setShowModalCreate(false);
  }
  return (
    <>
      <Modal
        show={showModalCreate} 
        onHide={() => handleCloseModal()}
        backdrop="static"
        keyboard={false}
        size='lg'
      >
        <Modal.Header closeButton>
          <Modal.Title>Thêm Bài Viết</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            <Form.Group className="mb-3">
              <Form.Label>Tiêu Đề</Form.Label>
              <Form.Control type="email" placeholder="..."
                value={title}
                onChange={(e)=>{setTilte(e.target.value)}}
              />
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label>Tác Giả</Form.Label>
              <Form.Control type="email" placeholder="..."
                value={author}
                onChange={(e) => { setAuthor(e.target.value) }}/>
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label>Nội dung</Form.Label>
              <Form.Control as="textarea" rows={3}
                value={content}
                onChange={(e) => { setContent(e.target.value) }}/>
            </Form.Group>
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={() => handleCloseModal()}>
            Đóng
          </Button>
          <Button variant="primary" onClick={()=> handleSubmitForm()}>Lưu</Button>
        </Modal.Footer>
      </Modal>
    </>
  );
}

export default CreateModal;