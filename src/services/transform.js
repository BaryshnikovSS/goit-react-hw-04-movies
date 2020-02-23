const altRefs = {
    img: 'https://bitsofco.de/content/images/2018/12/Screenshot-2018-12-16-at-21.06.29.png',
    text: '..text was not added..',
    year: "year undersearch"
}

export const transform = {
    forCard: items =>
        items.map(item => {
            return {
                id: item.id,
                imgURL: item.backdrop_path ? `https://image.tmdb.org/t/p/w300${item.backdrop_path}` : altRefs.img,
                title: item.title,
                overview: item.overview ? item.overview.slice(0, 120) + "..." : altRefs.text
            };
        }),

    forDetailsPage: (items) => {
        return {
            title: items.title,
            date: items.release_date ? parseInt(items.release_date) : altRefs.year,
            imgURL: items.poster_path ? `https://image.tmdb.org/t/p/w400${items.poster_path}` : altRefs.img,
            popular: `${items.vote_average * 10}%`,
            overview: items.overview ? items.overview : altRefs.text,
            genres: items.genres.map(el => el.name).join(", ")
        };
    },

    forCast: items =>
        items.map(item => ({
            img: item.profile_path ? `https://image.tmdb.org/t/p/w300${item.profile_path}` : altRefs.img,
            name: item.name,
            character: item.character,
            id: item.id
        }))
}