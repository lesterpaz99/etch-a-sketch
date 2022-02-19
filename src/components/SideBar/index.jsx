import { useState } from 'react';
import { IconContext } from 'react-icons';
import { CgMenuMotion } from 'react-icons/cg';
import { IoColorPalette } from 'react-icons/io5';
import { FaRainbow, FaEraser } from 'react-icons/fa';
import { AiOutlineClear } from 'react-icons/ai';
import styles from './SideBar.module.scss';

const SideBar = () => {
	const [open, setOpen] = useState(false);

	const handleOpenAside = () => {
		setTimeout(() => setOpen(true), 400);
	};
	const handleCloseAside = () => {
		setOpen(false);
	};

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
						<button type='button'>
							{<IoColorPalette />} {open && <span>Color mode</span>}
						</button>
						{open && <input type='color' className={styles.inputColor} />}
					</div>
					<button type='button'>
						{<FaRainbow />} {open && <span>Rainbow mode</span>}
					</button>
					<button type='button'>
						{<FaEraser />} {open && <span>Eraser</span>}
					</button>
					<button type='button'>
						{<AiOutlineClear />} {open && <span>Clear</span>}
					</button>
				</IconContext.Provider>
			</div>
		</aside>
	);
};

export { SideBar };
