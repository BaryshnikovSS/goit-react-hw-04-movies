# goit-react-hw-04-movies



## Осуществление навигации на странице(маршруты):

'/' - компонент <HomePage>, домашняя страница со списком популярных кинофильмов.

'/movies' - компонент <MoviesPage>, страница поиска фильмов по ключевому слову.

'/movies/:movieId' - компонент <MovieDetailsPage>, страница с детальной информацией о кинофильме.

/movies/:movieId/cast - компонент <Cast>, информация о актерском составе. Рендерится на странице <MovieDetailsPage>.

/movies/:movieId/reviews - компонент <Reviews>, информация об обзорах. Рендерится на странице <MovieDetailsPage>.



## Настройка запросов(эндпоинты):

https://developers.themoviedb.org/3/trending/get-trending - список самых популярных фильмов на сегодня для создания коллекции на главной странице.

https://developers.themoviedb.org/3/search/search-movies - поиск кинофильма по ключевому слову на странице фильмов.

https://developers.themoviedb.org/3/movies/get-movie-details - запрос полной информации о фильме для страницы кинофильма.

https://developers.themoviedb.org/3/movies/get-movie-credits - запрос информации о актерском составе для страницы кинофильма.

https://developers.themoviedb.org/3/movies/get-movie-reviews - запрос обзоров для страницы кинофильма.