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
    "sprites": object,
    "cries": object,
    "stats": Array,
    "types": Array,
    "past_types": Array
}

type PokeResponse = {
    "count": Number,
    "next": string,
    "previous": string,
    "results": Pokemon[]
}