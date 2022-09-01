import styles from './not-found.module.css'

const NotFound = () => {
    return (
        <section className={styles.container}>
            <h2 className='text text_type_main-medium'>404</h2>
            <p className='text text_type_main-default'>Страница не найдена</p>
        </section>
    )
}

export default NotFound;