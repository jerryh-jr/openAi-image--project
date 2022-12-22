import {useState} from 'react'
import { Configuration, OpenAIApi } from 'openai';
import './App.css'

function App() {
    const [prompt, setPrompt] = useState('');
    const [result, setResult] = useState('');
    const configuration = new Configuration({
        apiKey: import.meta.env.VITE_OPENAI_API_KEY,
    });

    const openai = new OpenAIApi(configuration);

    const generateImage = async () => {
        const res = await openai.createImage({
            prompt: prompt,
            n: 1,
            size: "1024x1024"
        });
        setResult(res.data.data[0].url);
    };
    return (
        <div className="app-main" >
            <h1>Create Your Ideas</h1>
            <input
                className="image-input"
                onChange={(e) => setPrompt(e.target.value)}
            />
            <button onClick={ generateImage }>Generate Image</button>

            {result.length > 0 ? <img className="image-result" src={result} alt={prompt}/> : <></>}
        </div>
    )
}

export default App
