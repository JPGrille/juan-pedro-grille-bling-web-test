"use client";
import Image from "next/image";
import Link from "next/link";
import styles from './page.module.css'
import { useCallback, useEffect, useRef, useState } from "react";

export default function Home() {
  const [pokemons, setPokemons] = useState<PokemonToList[]>([]);
  const [nextUrl, setNextUrl] = useState<string | null>('https://pokeapi.co/api/v2/pokemon/');
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const IMG_URL = 'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/';

  const observerRef = useRef<HTMLDivElement | null>(null);
  const fetchingRef = useRef<boolean>(false);

  const fetchPokemons = useCallback(async () => {
    if (!nextUrl || fetchingRef.current) return;

    fetchingRef.current = true;
    setIsLoading(true);

    try {
      const response = await fetch(nextUrl);
      const data = await response.json();

      setPokemons((prevPokemons) => {
        const newPokemons = data.results.filter(
          (newPokemon: Pokemon) => !prevPokemons.some((pokemon) => pokemon.name === newPokemon.name)
        );
        return [...prevPokemons, ...newPokemons];
      });

      setNextUrl(data.next);
    } catch (error) {
      console.error("Error fetching Pokémon:", error);
    } finally {
      fetchingRef.current = false;
      setIsLoading(false);
    }
  }, [nextUrl]);

  const handleObserver = useCallback((entries: IntersectionObserverEntry[]) => {
    const target = entries[0];
    if (target.isIntersecting && !fetchingRef.current) {
      fetchPokemons();
    }
  }, [fetchPokemons]);

  useEffect(() => {
    fetchPokemons();
  }, []);

  useEffect(() => {
    const option = {
      root: null,
      rootMargin: "20px",
      threshold: 1.0
    };

    const observer = new IntersectionObserver(handleObserver, option);
    if (observerRef.current) observer.observe(observerRef.current);

    return () => {
      if (observerRef.current) observer.unobserve(observerRef.current);
    };
  }, [handleObserver]);

  return (
    <main className={styles.container}>
      <div className={styles['search-bar']}>
        <input
          type="text"
          placeholder="Search for a Pokémon..."
        />
        <button>Search</button>
      </div>
      <div className={styles['pokemon-grid']}>
        {pokemons.map((pokemon, index) => (
          <div key={index} className={styles['pokemon-card']}>
            <Image
              src={`${IMG_URL}${pokemon.url.split('/')[6]}.png`}
              alt={pokemon.name}
              width={100}
              height={100}
            />
            <h3>{pokemon.name.charAt(0).toUpperCase() + pokemon.name.slice(1)}</h3>
            <Link href={`/details/${pokemon.name}`}>More Details →</Link>
          </div>
        ))}
      </div>
      {isLoading && <p>Loading more Pokémon...</p>}
      <div ref={observerRef}></div>
    </main>
  );
}