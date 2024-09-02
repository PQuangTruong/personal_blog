'use client'

import { useState } from 'react';
import { Button } from 'react-bootstrap';
import Table from 'react-bootstrap/Table';
import CreateModal from './create.modal';
import UpdateModal from './update.modal';
import Link from 'next/link';
import { compare, mutate } from 'swr/_internal';
import { toast } from 'react-toastify';


interface IProps {
  blogs: IBlogs[]
}

const AppTable = (props: IProps) => {
  const { blogs } = props
  const [blog, setBlog] = useState<IBlogs | null>(null)

  const [showModalCreate, setShowModalCreate] = useState<boolean>(false)
  const [showModalUpdate, setShowModalUpdate] = useState<boolean>(false)

  const handleDeleteModal = (id: Number) => {
    if (confirm(`Bạn muốn xóa blog: ${id}`)) {
      fetch(`http://localhost:8000/blogs/${id}`,
        {
          method: "DELETE",
          headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
          },
        })
        .then(res => res.json())
        .then(res => {
          if (res) {
            toast.error("Xóa Thành Công")
            mutate("http://localhost:8000/blogs")
          }
        })
    }
  }

  return (
    <>
      <div className="mb-3" style={{ display: 'flex', justifyContent: 'space-between' }}>
        <h2>Bảng Nội Dung</h2>
        <Button variant='secondary' onClick={() => setShowModalCreate(true)} >Thêm Mới</Button>
      </div>
      <Table striped bordered hover>
        <thead>
          <tr>
            <th>STT</th>
            <th>Tiêu đề</th>
            <th>Tác Giả</th>
            <th>Nội Dung</th>
          </tr>
        </thead>
        <tbody>
          {blogs.map(item => {
            return (
              <tr key={item.id}>
                <td>{item.id}</td>
                <td>{item.title}</td>
                <td>{item.author}</td>
                <td>
                  <Link href={`blogs/${item.id}`} className='btn btn-primary'>
                    Xem
                  </Link>
                  <Button variant='warning' className='mx-3' onClick={() => {
                    setBlog(item)
                    setShowModalUpdate(true)
                  }
                  }>Sửa</Button>
                  <Button variant='danger' className='mx-3' onClick={()=> handleDeleteModal(item.id)}>Xóa</Button>
                </td>
              </tr>
            )
          })}
        </tbody>
      </Table>
      <CreateModal
        showModalCreate={showModalCreate}
        setShowModalCreate={setShowModalCreate}
      />
      <UpdateModal
        showModalUpdate={showModalUpdate}
        setShowModalUpdate={setShowModalUpdate}
        blog={blog}
        setBlog={setBlog}
      />
    </>
  );
}

export default AppTable;