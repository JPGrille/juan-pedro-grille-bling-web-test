export default async function getPokemon(pokemonId: string) {
    const res = await fetch(`https://pokeapi.co/api/v2/ability/${pokemonId}`)

    if (!res.ok) return undefined

    return res.json()
}