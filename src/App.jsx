import { SideBar } from './components/SideBar';
import { Screen } from './components/Screen';
import styles from './App.module.scss';

function App() {
	return (
		<div className={styles.App}>
			<SideBar />
			<main>
				<h1>Etch-a-sketch / Sketchpad</h1>
				<Screen />
			</main>
		</div>
	);
}

export default App;
