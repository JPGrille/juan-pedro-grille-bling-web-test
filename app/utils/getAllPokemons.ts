export default async function getAllPokemons() {
    const res = await fetch('https://pokeapi.co/api/v2/pokemon/')

    if (!res.ok) throw undefined

    return res.json()
}