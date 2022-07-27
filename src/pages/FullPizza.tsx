import React from 'react';
import {useParams, useNavigate} from "react-router-dom";
import axios from "axios";

const FullPizza: React.FC = () => {
    let [item, setItem] = React.useState<{
        imageUrl: string,
        title: string,
        price: number
    }>()
    const {id} = useParams()
    const navigate = useNavigate()

    React.useEffect(() => {
        async function fetchPizza() {
            try {
                const {data} = await axios.get(`https://62b0204ae460b79df03d82b6.mockapi.io/items/${id}`)
                setItem(data)
            } catch (e) {
                alert('Ошибка при получении пиццы!')
                navigate('/')
            }
        }

        fetchPizza()
    }, [])

    if (!item) {
        return <>'...loading'</>
    }
    return (
        <div className="container">
            <img alt="jjjj" src={item.imageUrl}/>
            <h2>{item.title}</h2>
            <p><b>{item.price} ₽</b></p>
        </div>
    )

}

export default FullPizza;