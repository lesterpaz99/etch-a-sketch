import { useState, useRef, useContext } from 'react';
import { globalColor } from '../../context/globalColor';
import { IconContext } from 'react-icons';
import { CgMenuMotion } from 'react-icons/cg';
import { IoColorPalette } from 'react-icons/io5';
import { FaRainbow, FaEraser } from 'react-icons/fa';
import { AiOutlineClear } from 'react-icons/ai';
import styles from './SideBar.module.scss';

const SideBar = () => {
	const [open, setOpen] = useState(false);
	const { color, mode, handleColor, handleMode } = useContext(globalColor);
	const colorValue = useRef(null);

	const handleOpenAside = () => {
		setTimeout(() => setOpen(true), 400);
	};

	const handleCloseAside = () => {
		setOpen(false);
	};

	const handleInputColor = () => {
		handleColor(colorValue.current.value);
	};

	const focusColor = 'rgba(128, 128, 128, 0.2)';

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
						<button type='button' onClick={() => handleMode('color')}>
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
					<button type='button' onClick={() => handleMode('rainbow')}>
						{<FaRainbow />} {open && <span>Rainbow mode</span>}
					</button>
					<button type='button' onClick={() => handleMode('eraser')}>
						{<FaEraser />} {open && <span>Eraser</span>}
					</button>
					<button type='button' onClick={() => handleMode('clean')}>
						{<AiOutlineClear />} {open && <span>Clear</span>}
					</button>
				</IconContext.Provider>
			</div>
		</aside>
	);
};

export { SideBar };
