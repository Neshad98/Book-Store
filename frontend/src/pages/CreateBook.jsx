import { useState } from "react"


const CreateBook = () => {
  const [title, setTitle] = useState('');
  const [author, setAuthor] = useState('');
  const [publishYear, setPublishYear] = useState('');
  return (
    <div>CreateBook</div>
  )
}

export default CreateBook