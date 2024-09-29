import styles from './Screen.module.scss';
import { useState, useRef, useContext, useCallback, useMemo } from 'react';
import { globalColor } from '../../context/globalColor';

// Constants for cleaner code
const MIN_GRID_SIZE = 16;
const MAX_GRID_SIZE = 32;
const GRID_STEP = 16;
const DEFAULT_COLOR = '#ffffff';

const Screen = () => {
	const [gridSize, setGridSize] = useState(MIN_GRID_SIZE);
	const { color, mode, handleMode } = useContext(globalColor);
	const gridContainerRef = useRef(null);

	const clearGrid = useCallback(() => {
		const gridChildren = Array.from(gridContainerRef.current.children);
		gridChildren.forEach(
			(child) => (child.style.backgroundColor = DEFAULT_COLOR)
		);
	}, []);

	const handleGridSizeChange = useCallback(
		(event) => {
			const newSize = Number(event.target.value);
			setGridSize(newSize);
			clearGrid();
		},
		[clearGrid]
	);

	// Memoize the array for grid cells to avoid unnecessary re-renders
	const gridCells = useMemo(
		() => new Array(gridSize * gridSize).fill(null),
		[gridSize]
	);

	// Generate dynamic grid styles based on grid size
	const gridStyle = useMemo(
		() => ({
			gridTemplateColumns: `repeat(${gridSize}, 1fr)`,
			gridTemplateRows: `repeat(${gridSize}, 1fr)`,
		}),
		[gridSize]
	);

	// Utility to generate a random RGB color
	const generateRandomColor = useCallback(() => {
		const getRandomValue = () => Math.floor(Math.random() * 256);
		return `rgb(${getRandomValue()}, ${getRandomValue()}, ${getRandomValue()})`;
	}, []);

	// Apply color based on mode
	const applyColorToCell = useCallback(
		(cellIndex) => {
			const targetCell = gridContainerRef.current.children[cellIndex];

			switch (mode) {
				case 'color':
					targetCell.style.backgroundColor = color;
					break;
				case 'eraser':
					targetCell.style.backgroundColor = DEFAULT_COLOR;
					break;
				case 'rainbow':
					targetCell.style.backgroundColor = generateRandomColor();
					break;
				default:
					break;
			}
		},
		[color, mode, generateRandomColor]
	);

	// Handle the cleaning mode
	if (mode === 'clean') {
		clearGrid();
		handleMode('color'); // Reset mode back to 'color' after cleaning
	}

	return (
		<div>
			<label className={styles.labelRangeWrapper}>
				<p>Adjust Grid Size:</p>
				<div className={styles.iRangeContainer}>
					<span>-</span>
					<input
						type='range'
						value={gridSize}
						min={MIN_GRID_SIZE}
						max={MAX_GRID_SIZE}
						step={GRID_STEP}
						onChange={handleGridSizeChange}
					/>
					<span>+</span>
				</div>
			</label>

			<div
				style={gridStyle}
				className={styles.screenContainer}
				ref={gridContainerRef}
			>
				{gridCells.map((_, index) => (
					<div
						className={styles.divPixel}
						key={index}
						onMouseOver={() => applyColorToCell(index)}
					/>
				))}
			</div>
		</div>
	);
};

export { Screen };
