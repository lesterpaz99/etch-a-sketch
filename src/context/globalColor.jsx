import { useState, createContext } from 'react';

const globalColor = createContext({});

const GlobalColorProvider = ({ children }) => {
	const [mode, setMode] = useState('color');
	const [color, setColor] = useState('black');

	const handleMode = (modeP) => setMode(modeP);

	const handleColor = (colorP) => setColor(colorP);

	return (
		<globalColor.Provider value={{ mode, color, handleColor, handleMode }}>
			{children}
		</globalColor.Provider>
	);
};

export { GlobalColorProvider, globalColor };
