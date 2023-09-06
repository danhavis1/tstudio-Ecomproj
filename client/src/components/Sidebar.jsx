import { BiMenu } from 'react-icons/bi'
import { useState } from 'react'
import Offcanvas from 'react-bootstrap/Offcanvas'
import useFetchData from '../hooks/fetchData'
import { getCategories } from '../config/api'
import { NavLink } from 'react-router-dom'

export default function Sidebar() {
  const [show, setShow] = useState(false)
  const { data } = useFetchData(getCategories)

  const handleClose = () => setShow(false)
  const handleShow = () => setShow(true)

  return (
    <div>
      <BiMenu
        style={{ cursor: 'pointer' }}
        size='24px'
        className='d-lg-none me-2'
        onClick={handleShow}
      />
      <Offcanvas show={show} onHide={handleClose}>
        <Offcanvas.Header closeButton>
          <Offcanvas.Title>
            <NavLink to='/' className='fs-2 fw-bold text-black'>
              SHOP
            </NavLink>
          </Offcanvas.Title>
        </Offcanvas.Header>
        <Offcanvas.Body>
          <div>
            <hr />
            <h1 className='mb-2 fs-3 fw-bold'>Collections</h1>
            {data.map((category) => (
              <div key={category._id} className='mb-3'>
                <NavLink
                  to={`/collections/${category.name}`}
                  className={({ isActive }) =>
                    isActive ? 'text-success fw-bold' : 'text-black fw-medium'
                  }
                  onClick={handleClose}
                >
                  {category.name}
                </NavLink>
              </div>
            ))}
          </div>
        </Offcanvas.Body>
      </Offcanvas>
    </div>
  )
}
