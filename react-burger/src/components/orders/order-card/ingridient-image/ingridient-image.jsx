import styles from './ingridient-image.module.css'

const IngridientImage = ({ image, alt }) => {
    return (
        <div className={styles.imageContainer}>
            <img src={image} alt={alt} className={styles.image} />
        </div>
    )
}

export default IngridientImage