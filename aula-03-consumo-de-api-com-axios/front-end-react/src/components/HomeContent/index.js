// Importando useState
import { useState, useEffect } from "react";
//O hook useEffect é executado toda vez que o componente é re-renderizado (efeito colateral)

import styles from "@/components/HomeContent/HomeContent.module.css";
import Loading from "../Loading";
// Importando o AXIOS (para enviar as requisiçoes HTTP)
import axios from "axios";

const HomeContent = () => {
  //Criando um estado para lista de jogos
  const [games, setGames] = useState([]);
  //Criando um estado para o carregamento da pagina
  const [Loading, setLoading] = useState(true)

  //Criando o bloco do useEffect
  useEffect(() => {
    const fetchGames = async () => {
      try {
        const response = await axios.get("http://localhost:4000/games");
        //Atualizando o estado com a lista de jogos
        setGames(response.data.games);
        // console.log(response.data.games);
      } catch (error) {
        console.log(error);
      } finally {
        setTimeout(() => setLoading(false), 3000)
      }
    };
    fetchGames();
  }, [games]); //Dependencia do useEffect

  // funçao deletar
  const deletGame = async (gameId) => {
    try {
      const reponse = await axios.delete(
        `http://localhost:4000/games/${gamesId}`
      );
      if (reponse.status === 204) {
        alert("Ojogo foi excluido com sucesso");
        //Filtrando a lista de jogos removendo o jogo que foi excluidoatraves de sua ID
        setGames(games.filter((game) => game.id !== gameId));
      }
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <>
      <div className={styles.homeContent}>
        {/* CARD LISTA DE JOGOS */}
        <div className={styles.listGamesCard}>
          {/* TITLE */}
          <div className={styles.title}>
            <h2>Lista de jogos</h2>
          </div>
          (loading ? (
           <Loading Loading={Loading}/>
          ) :(
          <div className={styles.games} id={styles.games}>
            {/* Lista de jogos irá aqui */}
            {games.map((game) => {
              <ul key={game._id} className={styles.listname}>
                <div className={styles.gameImg}>
                  <img src="images/games_cd_cover.png" alt="Jogos em estoque" />
                </div>
                <div className={styles.gameInfo}>
                  <h3>{game.title}</h3>
                  <li>Plataforma: {game.description.plataform}</li>
                  <li>Genero: {game.description.genre}</li>
                  <li>Classificaçao: {games.description.rating}</li>
                  <li>Ano: {game.year}</li>
                  <li>
                    Preço:
                    {game.price.tolocaleString("pt-br", {
                      styles: "currency",
                      currency: "BRL",
                    })}
                  </li>
                  {/* botao para deletar */}
                  <button
                    className={styles.btnDel}
                    onClick={() => {
                      const confirmed = window.confirm(
                        "Deseja mesmo excluir o jogo??????????????????"
                      );
                      if (confirmed) {
                        deletGame(game._id);
                      }
                    }}
                  >
                    Deletar
                  </button>
                </div>
              </ul>;
            })}
          </div>
          ))
        </div>
      </div>
    </>
  );
};

export default HomeContent;
