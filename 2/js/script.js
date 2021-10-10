/* Задания на урок:

1) Реализовать функционал, что после заполнения формы и нажатия кнопки "Подтвердить" -
новый фильм добавляется в список. Страница не должна перезагружаться.
Новый фильм должен добавляться в movieDB.movies.
Для получения доступа к значению input - обращаемся к нему как input.value;
P.S. Здесь есть несколько вариантов решения задачи, принимается любой, но рабочий.

2) Если название фильма больше, чем 21 символ - обрезать его и добавить три точки

3) При клике на мусорную корзину - элемент будет удаляться из списка (сложно)

4) Если в форме стоит галочка "Сделать любимым" - в консоль вывести сообщение:
"Добавляем любимый фильм"

5) Фильмы должны быть отсортированы по алфавиту */

'use strict';

document.addEventListener('DOMContentLoaded', () => {

    const movieDB = {
        movies: [
            "Логан",
            "Лига справедливости",
            "Ла-ла лэнд",
            "Одержимость",
            "Скотт Пилигрим против...",
        ]
    };

    const adv = document.querySelectorAll('.promo__adv img');
    const movieBg = document.querySelector('.promo__bg');
    const movieGenre = movieBg.querySelector('.promo__genre');
    const movieList = document.querySelector('.promo__interactive-list');
    const addForm = document.querySelector('.add');
    const addInput = addForm.querySelector('.adding__input');
    const favoriteMovie = addForm.querySelector('[type="checkbox"]');

    const deleteAdv = (parent) => {
        parent.forEach(img => {
            img.remove();
        });

    };

    const makeChanges = () => {
        movieGenre.textContent = 'драма';

        movieBg.style.backgroundImage = 'url("img/bg.jpg")';
    };

    const sortArr = (array) => {
        array.sort();
    };

    function generateMovieList(movie, parent) {
        parent.innerHTML = '';
        sortArr(movie);

        movie.forEach((item, index) => {
            parent.innerHTML += `
                    <li class="promo__interactive-item">${index + 1}. ${item}
                        <div class="delete"></div>
                    </li>
                `;
        });

        document.querySelectorAll('.delete').forEach((cart, i) => {
            cart.addEventListener('click', () => {
                cart.parentElement.remove();
                movieDB.movies.splice(i, 1);

                generateMovieList(movie, parent);
            })
        });
    }

    addForm.addEventListener('submit', (event) => {
        event.preventDefault();

        let newMovie = addInput.value;
        const favorite = favoriteMovie.checked;

        if (newMovie) {

            if (newMovie.length > 21) {
                newMovie = `${newMovie.slice(0, 22)}...`;
            }

            movieDB.movies.push(newMovie);

            addForm.reset();

            sortArr(movieDB.movies);

            if (favorite) {
                console.log('Добавляем любимый фильм');
            }
        }

        generateMovieList(movieDB.movies, movieList);
    });

    deleteAdv(adv);
    makeChanges();
    generateMovieList(movieDB.movies, movieList);
});