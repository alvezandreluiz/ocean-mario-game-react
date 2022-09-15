import { useEffect, useState } from "react";
import "./HighScore.css";

function HighScore(props) {

    const [itens, setItens] = useState(undefined);
    const url = "http://localhost:3001/pontuacoes";
    
    useEffect(function () {
        async function carregarPontuacoes() {
            const response = await fetch(url);
            const body = await response.json();
            setItens(body);
        }
        carregarPontuacoes();
    }, []);

    const itensEstaoCarregando = itens === undefined;

    async function salvarPontuacao(event) {
        event.preventDefault();

        const form = event.target;
        const name = form.name.value;

        const response = await fetch(url, {
            method: "POST",
            body: JSON.stringify({ nome: name, pontos: props.pontos }),
            headers: {
                "Content-type": "application/json",
            },
        });

        const body = await response.json();

        console.log("Score saved successfully:", body);
    }
        
    return (
        <div className="HighScore">
            <div>
                You scored <b>{props.pontos}</b> points!
            </div>

            <div>
                <h1>HighScores</h1>

                {itensEstaoCarregando ? (
                    <div>Loading...</div>
                ) : (
                    <div>
                        {itens.map((item, index) => (
                            <div key={`score_${index}`}>
                                {item.nome} - {item.pontos}
                            </div>
                        ))}
                    </div>
                )}
            </div>

            <div>
                <h1>Register your score!</h1>
                <form onSubmit={salvarPontuacao}>
                    <input type="text" name="name" placeholder="Enter your name..." />
                    <input type="submit" value="Submit" />
                </form>
            </div>
        </div>
    );
}

export default HighScore;