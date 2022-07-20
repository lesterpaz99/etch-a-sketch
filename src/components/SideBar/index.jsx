import styles from './SideBar.module.scss';
import { useState, useRef, useContext, useCallback } from 'react';
import { globalColor } from '../../context/globalColor';
import { IconContext } from 'react-icons';
import { CgMenuMotion } from 'react-icons/cg';
import { IoColorPalette } from 'react-icons/io5';
import { FaEraser, FaRainbow } from 'react-icons/fa';
import { AiOutlineClear } from 'react-icons/ai';

const SideBar = () => {
	const [open, setOpen] = useState(false);
	const { color, handleColor, handleMode } = useContext(globalColor);
	const colorValue = useRef(null);

	const handleOpenAside = useCallback(() => {
		setTimeout(() => setOpen(true), 400);
	}, [open]);

	const handleCloseAside = useCallback(() => {
		setOpen(false);
	}, [open]);

	const handleInputColor = useCallback(() => {
		handleColor(colorValue.current.value);
	});

	const changeMode = useCallback((mode) => handleMode(mode));

	return (
		<aside
			className={styles.aside}
			onMouseEnter={handleOpenAside}
			onMouseLeave={handleCloseAside}
		>
			<div className={styles.iconMenu}>
				<IconContext.Provider value={{ className: styles.burgerIcon }}>
					<CgMenuMotion />
				</IconContext.Provider>
			</div>
			<div className={styles.optionsContainer}>
				<IconContext.Provider value={{ className: styles.icons }}>
					<div className={styles.changeColor}>
						<button type='button' onClick={() => changeMode('color')}>
							{<IoColorPalette />} {open && <span>Color mode</span>}
						</button>
						{open && (
							<input
								type='color'
								className={styles.inputColor}
								ref={colorValue}
								value={color}
								onChange={handleInputColor}
							/>
						)}
					</div>
					<button type='button' onClick={() => changeMode('rainbow')}>
						{<FaRainbow />} {open && <span>Rainbow mode</span>}
					</button>
					<button type='button' onClick={() => changeMode('eraser')}>
						{<FaEraser />} {open && <span>Eraser</span>}
					</button>
					<button type='button' onClick={() => changeMode('clean')}>
						{<AiOutlineClear />} {open && <span>Clear</span>}
					</button>
				</IconContext.Provider>
			</div>
		</aside>
	);
};

export { SideBar };
