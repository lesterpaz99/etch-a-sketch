import { SideBar } from './components/SideBar';
import { Screen } from './components/Screen';
import { GlobalColorProvider } from './context/globalColor';
import styles from './App.module.scss';

function App() {
	return (
		<GlobalColorProvider>
			<div className={styles.App}>
				<SideBar />
				<main>
					<h1>Etch-a-sketch / Sketchpad</h1>
					<Screen />
				</main>
			</div>
		</GlobalColorProvider>
	);
}

export default App;
