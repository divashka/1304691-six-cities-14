import MainPage from '../../../pages/main/main';

type AppScreenProps = {
  cardCount: number;
}

function App({ cardCount }: AppScreenProps): JSX.Element {
  return (
    <MainPage cardCount={cardCount}/>
  );
}

export default App;
