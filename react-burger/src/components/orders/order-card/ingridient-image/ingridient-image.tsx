import { FC } from 'react'
import styles from './ingridient-image.module.css'

type TIngridientImage = {
    image: string | undefined,
    alt: string | undefined
}

const IngridientImage: FC<TIngridientImage> = ({ image, alt }) => {
    return (
        <div className={styles.imageContainer}>
            <img src={image} alt={alt} className={styles.image} />
        </div>
    )
}

export default IngridientImage