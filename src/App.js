import { useState, useEffect } from 'react'

export default function App() {
  const [repositores, setRepositores] = useState([])

  useEffect(() => {
    const data = async () => {
      const response = await fetch(
        'https://api.github.com/users/Msamuelsons/repos',
      )
      const data = await response.json()

      setRepositores(data)
    }
    data()
  }, [])

  useEffect(() => {
    const filterd = repositores.filter((repo) => repo.favorite)
    document.title = `Você têm ${filterd.length} favoritos`
  }, [repositores])

  function handleFavorite(id) {
    const newRepositores = repositores.map((repo) => {
      return repo.id === id ? { ...repo, favorite: !repo.favorite } : repo
    })
    setRepositores(newRepositores)
  }
  return (
    <div>
      <ul>
        {repositores.map((repo) => (
          <li key={repo.id}>
            {repo.name}:{repo.favorite && <span>✨</span>}
            <button onClick={() => handleFavorite(repo.id)}>Favoritar</button>
          </li>
        ))}
      </ul>
    </div>
  )
}
