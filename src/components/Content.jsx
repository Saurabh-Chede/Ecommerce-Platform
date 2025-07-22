import React from 'react'

function Content() {
  return (
    <div className='flex flex-col justify-center items-center mx-auto'>
        <picture className='rounded-2xl overflow-hidden'>
            <source srcset="https://www.mdxblog.io/images/posts/how-to-use-images/grass-tree-sky.jpg" media='(min-width:75em)' />
            <source srcset="https://www.mdxblog.io/images/posts/how-to-use-images/grass-tree-sky.jpg" media='(min-width:40em)' />
            <img src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRvZ5ms-kVJ25nLTVdjyQKKkpDj9f1t7JCejZYBrP22zxnhGMNpqVamtaaVf-aHvM5DOfI&usqp=CAU" alt="image" />
        </picture>
    </div>
  )
}

export default Content