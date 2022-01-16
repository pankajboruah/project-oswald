import React from 'react';
// import illustrationSource from 'images/illustration_applications.svg';
import styles from './index.module.scss';

const Overview = () => {
	return (
		<section className={styles.root}>
			<div className={styles.image}>
				{/* <img src={''} alt="landing"></img> */}
			</div>
			<div className={styles.content}>
				<div className={styles.detailsTitle}>Banks and Favorites</div>
				<div className={styles.detailsDesc}>
					View bank details and mark them as favorites.
				</div>
			</div>
		</section>
	);
};

export default Overview;
