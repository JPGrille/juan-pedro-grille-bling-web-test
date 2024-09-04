type Pokemon = {
    "id": Number,
    "name": string,
    "base_experience": Number,
    "height": Number,
    "is_default": Boolean,
    "order": Number,
    "weight": Number,
    "abilities": Array,
    "forms": Array,
    "held_items": Array,
    "location_area_encounters": string,
    "moves": Array,
    "species": object,
    "sprites": {
        'front_default': string,
        'front_shiny': string
    },
    "cries": object,
    "stats": Array,
    "types": Array,
    "past_types": Array
}

type PokemonToList = {
    "url": string,
    "name": string
}

type PokeResponse = {
    "count": Number,
    "next": string,
    "previous": string,
    "results": PokemonToList[]
}