import { useState, useRef, useContext } from 'react';
import { globalColor } from '../../context/globalColor';
import styles from './Screen.module.scss';

const Screen = () => {
	const [size, setSize] = useState(64);
	const { color, mode, handleMode } = useContext(globalColor);
	const inputRange = useRef(null);
	const gridContainer = useRef(null);

	const clean = () => {
		const gridChildren = Array.from(gridContainer.current.children);
		gridChildren.forEach((child) => (child.style.backgroundColor = '#ffffff'));
	};

	const handleInputValue = () => {
		setSize(inputRange.current.value);
		clean();
	};

	const arr = new Array(size * size).fill('div');

	const gridSize = {
		display: 'grid',
		gridTemplateColumns: `repeat(${size}, 1fr)`,
		gridTemplateRows: `repeat(${size}, 1fr)`,
	};

	const setRandomColor = () => {
		const randomColor1 = Math.floor(Math.random() * 256);
		const randomColor2 = Math.floor(Math.random() * 256);
		const randomColor3 = Math.floor(Math.random() * 256);

		return `rgb(${randomColor1}, ${randomColor2}, ${randomColor3})`;
	};

	const handleColor = (index) => {
		const target = gridContainer.current.children[index];
		if (mode === 'color') {
			target.style.backgroundColor = color;
		}
		if (mode === 'eraser') {
			target.style.backgroundColor = '#ffffff';
		}
		if (mode === 'rainbow') {
			target.style.backgroundColor = setRandomColor();
		}
	};

	if (mode === 'clean') {
		clean();
		handleMode('color');
	}

	return (
		<div>
			<label className={styles.labelRangeWrapper}>
				<p>Adjust:</p>
				<div className={styles.iRangeContainer}>
					<span>-</span>{' '}
					<input
						type='range'
						value={size}
						min={16}
						step={16}
						max={64}
						ref={inputRange}
						onChange={handleInputValue}
					/>{' '}
					<span>+</span>
				</div>
			</label>
			<div
				style={gridSize}
				className={styles.screenContainer}
				ref={gridContainer}
			>
				{arr.map((divItem, index) => (
					<div
						className={styles.divPixel}
						key={divItem + index}
						name={divItem + index}
						onMouseOver={() => handleColor(index)}
					></div>
				))}
			</div>
		</div>
	);
};

export { Screen };
