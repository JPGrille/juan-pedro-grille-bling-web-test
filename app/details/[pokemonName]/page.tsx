import type { Metadata } from 'next'
import { notFound } from 'next/navigation'
import getPokemon from '@/app/utils/getPokemon';
import getAllPokemons from '@/app/utils/getAllPokemons';
import Image from "next/image";
import styles from './page.module.css';
import typeColors from '@/app/utils/typeColors';

type Params = {
    params: {
        pokemonName: string
    }
}

export async function generateMetadata({ params: { pokemonName } }: Params): Promise<Metadata> {
    const pokemonData: Promise<Pokemon> = getPokemon(pokemonName)
    const pokemon: Pokemon = await pokemonData

    if (!pokemon) {
        return {
            title: "Pokemon Not Found"
        }
    }

    return {
        title: pokemon.name,
        description: `This is the page of ${pokemon.name}`
    }
}

export default async function PokemonDetails ({ params: { pokemonName } }: Params) {
  const pokemonData: Promise<Pokemon> = getPokemon(pokemonName)

  const pokemon = await pokemonData;

  if (!pokemon) notFound()

  const primaryType: string = pokemon.types[0].type.name;
  //const backgroundColor = typeColors[primaryType] || "#333";
  const backgroundColor = "#333";

  return (
    <div className={styles['detail-container']}>
      <div className={styles['pokemon-detail-card']} style={{ backgroundColor }}>
        <div className={styles['pokemon-images']}>
          <Image
            src={pokemon.sprites.front_default}
            alt={pokemon.name}
            width={200}
            height={200}
            className={styles['pokemon-image']}
          />
          <Image
            src={pokemon.sprites.front_shiny}
            alt={`${pokemon.name} shiny`}
            width={200}
            height={200}
            className={styles['pokemon-image']}
          />
        </div>
        <h2 className={styles['pokemon-name']}>{pokemon.name.charAt(0).toUpperCase() + pokemon.name.slice(1)}</h2>
        <div className={styles['pokemon-info']}>
          <p><strong>Name:</strong> {pokemon.name}</p>
          <p><strong>Type:</strong> {pokemon.types[0].type.name}</p>
          <p><strong>Height:</strong> {pokemon.height.toString()}</p>
          <p><strong>Abilities:</strong></p>
          <ul>
            {pokemon.abilities.map((ability: any) => (
              <li key={ability.ability.name}>{ability.ability.name}</li>
            ))}
          </ul>
          <p><strong>Stats:</strong></p>
          <ul>
            {pokemon.stats.map((stat: any) => (
              <li key={stat.stat.name}>{stat.stat.name}: {stat.base_stat}</li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
};

export async function generateStaticParams() {
  const pokemonsData: Promise<PokeResponse> = getAllPokemons()

  const pokemons = (await pokemonsData).results

  return pokemons.map(pokemon => ({
      pokemonName: pokemon.name
  }))
}