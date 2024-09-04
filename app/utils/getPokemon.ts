export default async function getPokemon(pokemonName: string) {
    const res = await fetch(`https://pokeapi.co/api/v2/pokemon/${pokemonName}`)

    if (!res.ok) return undefined

    return res.json()
}