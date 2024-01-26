import { useState } from "react"
import { useNavigate } from "react-router-dom";
import axios from "axios";
import BackButton from "../components/BackButton";
import Spinner from "../components/Spinner";


const CreateBook = () => {
  const [title, setTitle] = useState('');
  const [author, setAuthor] = useState('');
  const [publishYear, setPublishYear] = useState('');
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const handleSaveBook = () => {
    const data = {
      title,
      author,
      publishYear,
    };
    setLoading(true);
    axios.post('http://localhost:5000/books', data)
      .then(() => {
        setLoading(false);
        navigate('/')
      })
      .catch((error) => {
        setLoading(false);
        alert("An error happened. Please check console.");
        console.log(error);
      })
  }

  return (
    <div className="p-4">
      <BackButton />
      <h1 className="text-3xl my-4"></h1>
      {loading ? <Spinner /> : ''}


    </div>
  )
}

export default CreateBook