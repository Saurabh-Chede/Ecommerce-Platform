import React, { useState } from 'react'

function AdminDashboard({onAddProduct}) {

    const [title,setTitle] = useState('')
    const [image,setImage] = useState('')
    const [price,setPrice] = useState('')
    const [description,setDescription] = useState('')

    
  return (
    <div>AdminDashboard</div>
  )
}

export default AdminDashboard