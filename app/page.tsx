import Image from "next/image";
import Link from "next/link";
import getAllPokemons from "./utils/getAllPokemons";
import styles from './page.module.css'

export default async function Home() {

  const pokemonsData: Promise<PokeResponse> = getAllPokemons();

  const pokemons = (await pokemonsData).results;

  //const [search, setSearch] = useState<string>('');
  //const [nextUrl, setNextUrl] = useState<string | null>('https://pokeapi.co/api/v2/pokemon/');

  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    //setSearch(e.target.value);
    console.log('Search has been clicked');
  };

  const handleLoadMore = (e: any) => {
    console.log('Load more has been clicked');
  };

  const content = (
    <div className={styles.container}>
      <div className={styles['search-bar']}>
        <input
          type="text"
          placeholder="Search for a Pokémon..."
        />
        <button>Search</button>
      </div>
      <div className={styles['pokemon-grid']}>
        {pokemons.map((pokemon) => (
          <div key={pokemon.name} className={styles['pokemon-card']}>
            <Image
              src={`https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/${pokemon.url.split('/')[6]}.png`}
              alt={pokemon.name}
              width={500}
              height={500}
            />
            <h3>{pokemon.name.charAt(0).toUpperCase() + pokemon.name.slice(1)}</h3>
            <Link href={`/details/${pokemon.name}`}>
              More Details →
            </Link>
          </div>
        ))}
      </div>
    </div>
  )

  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
      {content}
    </main>
  );
}
