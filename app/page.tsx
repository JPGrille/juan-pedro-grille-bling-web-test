import Image from "next/image";
import Link from "next/link";
import getAllPokemons from "./utils/getAllPokemons";

export default async function Home() {

  const pokemonsData: Promise<PokeResponse> = getAllPokemons()

    const pokemons = (await pokemonsData).results

    const content = (
        <section>
            <h2>POKEMON LIST</h2>
            <br />
            {pokemons.map(pokemon => {
                return (
                    <>
                        <p>
                            <Link href={`/details/${pokemon.id}`}>{pokemon.name}</Link>
                        </p>
                        <br />
                    </>
                )
            })}
        </section>
    )

  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
      {content}
    </main>
  );
}
