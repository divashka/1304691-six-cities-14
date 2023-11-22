import FavoritesCard from '../favorites-card/favorites-card';
import { useAppSelector, useAppDispatch } from '../../hooks';
import { useEffect } from 'react';

function FavoritesList(): JSX.Element {

  const dispatch = useAppDispatch();

  const favoritesOffers = useAppSelector((state) => state.favorites);

  useEffect(() => {
    //dispatch(fetchFavoriteOffers());
  }, [dispatch]);

  const CitiesList = [...new Set(favoritesOffers.map((offer) => offer.city.name))].sort();

  return (
    <ul className="favorites__list">
      {CitiesList.map((city) => (
        <li className="favorites__locations-items" key={city}>
          <div className="favorites__locations locations locations--current">
            <div className="locations__item">
              <a className="locations__item-link" href="#">
                <span>{city}</span>
              </a>
            </div>
          </div>
          <div className="favorites__places">
            {favoritesOffers
              .filter((offer) => offer.city.name === city)
              .map((offer) => (
                <FavoritesCard offer={offer} key={offer.id} />
              ))}
          </div>
        </li>
      ))}
    </ul>
  );
}

export default FavoritesList;
