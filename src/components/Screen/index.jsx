import { useState, useRef } from 'react';
import styles from './Screen.module.scss';

const Screen = () => {
	const [size, setSize] = useState(16);
	const inputRange = useRef(null);

	const handleInputValue = () => setSize(inputRange.current.value);

	const arr = new Array(size * size).fill('div');

	const gridSize = {
		display: 'grid',
		gridTemplateColumns: `repeat(${size}, 1fr)`,
		gridTemplateRows: `repeat(${size}, 1fr)`,
	};

	const handleColor = (e) => {
		e.target.style.backgroundColor = 'black';
	};

	return (
		<div className=''>
			<label>
				Pixel size: {size}
				<input
					type='range'
					value={size}
					min={1}
					max={64}
					ref={inputRange}
					onChange={handleInputValue}
				/>
			</label>
			<div
				style={gridSize}
				className={styles.screenContainer}
				onMouseOver={handleColor}
				onMouseDown={handleColor}
			>
				{arr.map((divItem, index) => (
					<div className={styles.divPixel} key={divItem + index}></div>
				))}
			</div>
		</div>
	);
};

export { Screen };
