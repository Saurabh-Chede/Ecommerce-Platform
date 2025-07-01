import { useEffect, useState } from "react"


function Article() {

    const [articles , setArticles] = useState([])

    useEffect(() => {
        const fetchdata = async () => {
            const slowRespnose = await fetch('https://jsonplaceholder.typicode.com/posts?_limit=100')
            const data = await slowRespnose.json()
            setArticles(data)
        }

        fetchdata()
    }
        , [])

    return (
        <div className="grid grid-cols-5 gap-2 ">
            {articles.map(article =>(

                <div key={article.id} className="bg-red-300 p-2 rounded-sm hover:cursor-pointer font-mono align-baseline">
                    <h1 className="py-10 text-amber-950">{article.title}</h1>
                </div>
                
            ))}
        </div>
    )
}

export default Article