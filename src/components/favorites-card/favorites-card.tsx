
import { OfferPreview } from '../../types/types';
import { AppRoute } from '../../const';
import { Link } from 'react-router-dom';
import { capitalize } from '../../utils/utils';
import { useAppDispatch } from '../../hooks';
import { useState } from 'react';
import classNames from 'classnames';
import { fetchAddToFavoriteAction } from '../../store/api-actions';
import { getRatingValue } from '../../utils/utils';

type FavoritesCardProps = {
  offer: OfferPreview;
}

function FavoritesCard({ offer }: FavoritesCardProps): JSX.Element {

  const { isPremium, price, title, rating, type, previewImage, id, isFavorite } = offer;

  const dispatch = useAppDispatch();

  const [isBookmarkActive, setBookmarkActive] = useState(isFavorite);

  function handleFavoriteButtonClick() {
    dispatch(fetchAddToFavoriteAction({ id, status: Number(!isBookmarkActive) }));
    setBookmarkActive((prev) => !prev);
  }

  return (
    <article className="favorites__card place-card">
      {isPremium ? <div className="place-card__mark"><span>Premium</span></div> : ''}
      <div className="favorites__image-wrapper place-card__image-wrapper">
        <Link to={`${AppRoute.Offer}${id}`}>
          <img className="place-card__image" src={previewImage} width="150" height="110" alt="Place image" />
        </Link>
      </div>
      <div className="favorites__card-info place-card__info">
        <div className="place-card__price-wrapper">
          <div className="place-card__price">
            <b className="place-card__price-value">&euro;{price}</b>
            <span className="place-card__price-text">&#47;&nbsp;night</span>
          </div>
          <button
            type="button"
            onClick={handleFavoriteButtonClick}
            className={classNames(
              '`place-card__bookmark-button button',
              { 'place-card__bookmark-button--active': isBookmarkActive })}
          >
            <svg className="place-card__bookmark-icon" width="18" height="19">
              <use xlinkHref="#icon-bookmark"></use>
            </svg>
            <span className="visually-hidden">In bookmarks</span>
          </button>
        </div>
        <div className="place-card__rating rating">
          <div className="place-card__stars rating__stars">
            <span style={{ width: `${getRatingValue(rating)}%` }}></span>
            <span className="visually-hidden">Rating</span>
          </div>
        </div>
        <h2 className="place-card__name">
          <Link to={`${AppRoute.Offer}${id}`}>{title}</Link>
        </h2>
        <p className="place-card__type">{capitalize(type)}</p>
      </div>
    </article >
  );
}

export default FavoritesCard;
