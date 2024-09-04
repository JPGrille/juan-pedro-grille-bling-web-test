import { useRouter, useSearchParams } from 'next/navigation';
import axios from 'axios';
import { Suspense } from "react"
import type { Metadata } from 'next'
import { notFound } from 'next/navigation'
import getPokemon from '@/app/utils/getPokemon';
import getAllPokemons from '@/app/utils/getAllPokemons';

type Params = {
    params: {
        pokemonId: string
    }
}

export async function generateMetadata({ params: { pokemonId } }: Params): Promise<Metadata> {
    const pokemonData: Promise<Pokemon> = getPokemon(pokemonId)
    const pokemon: Pokemon = await pokemonData

    if (!pokemon.name) {
        return {
            title: "User Not Found"
        }
    }

    return {
        title: pokemon.name,
        description: `This is the page of ${pokemon.name}`
    }

}

export default async function PokemonDetails ({ params: { pokemonId } }: Params) {
  const pokemonData: Promise<Pokemon> = getPokemon(pokemonId)

  const pokemon = await pokemonData

  if (!pokemon.name) notFound()

  return (
    <>
      <h1>{pokemon.name}</h1>
      <p>ID: {pokemon.id.toString()}</p>
      <p>Weight: {pokemon.weight.toString()}</p>
      <p>Height: {pokemon.height.toString()}</p>
      <h2>Abilities</h2>
      <ul>
        {pokemon.abilities.map((ability: any) => (
          <li key={ability.ability.name}>{ability.ability.name}</li>
        ))}
      </ul>
      <h2>Stats</h2>
      <ul>
        {pokemon.stats.map((stat: any) => (
          <li key={stat.stat.name}>{stat.stat.name}: {stat.base_stat}</li>
        ))}
      </ul>
    </>
  );
};

export async function generateStaticParams() {
  const pokemonsData: Promise<PokeResponse> = getAllPokemons()

  const pokemons = (await pokemonsData).results

    return pokemons.map(pokemon => ({
        pokemonId: pokemon.id.toString()
    }))
}