import { Link } from 'react-router-dom';
import HeaderMemo from '../../components/header/header';
import { Helmet } from 'react-helmet-async';
import CitiesList from '../../components/cities-list/cities-list';

function NotFound(): JSX.Element {
  return (
    <div className="page page--gray page--main">
      <Helmet>
        <title>{'6 cities - Not found'}</title>
      </Helmet>
      <HeaderMemo />

      <main className="page__main page__main--index page__main--index-empty">
        <h1 className="visually-hidden">Cities</h1>
        <CitiesList />
        <div className="cities">
          <div className="cities__places-container cities__places-container--empty container">
            <section className="cities__no-places">
              <div className="cities__status-wrapper tabs__content">
                <b className="cities__status">404 Not Found</b>
                <p className="cities__status-description">
                  <Link to="/">Вернуться на главную</Link>
                </p>
              </div>
            </section>
            <div className="cities__right-section"></div>
          </div>
        </div>
      </main>
    </div>
  );
}

export default NotFound;
