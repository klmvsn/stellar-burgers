import React from "react";
import ingridientsStyle from './burger-ingridients.module.css';
import { Tab } from "@ya.praktikum/react-developer-burger-ui-components";
import PropTypes from 'prop-types';
import categories from "../../utils/categories";
import IngridientsCategory from "./ingridients-category/ingridients-category";


const BurgerIngridients = ({ingridients}) => {
    const [current, setCurrent] = React.useState('buns');
    return (
        <section className={ingridientsStyle.section}>
            <h1 className='text text_type_main-large mb-5'>Соберите бургер</h1>
            <div className={ingridientsStyle.tab}>
                <Tab value="buns" active={current === 'buns'} onClick={setCurrent}>
                    Булки
                </Tab>
                <Tab value="sauces" active={current === 'sauces'} onClick={setCurrent}>
                    Соусы
                </Tab>
                <Tab value="fillings" active={current === 'fillings'} onClick={setCurrent}>
                    Начинки
                </Tab>
            </div>
            <ul className={`${ingridientsStyle.list} custom-scroll`}>
                {categories.map(category => (
                    <IngridientsCategory key={category.type} category={category} ingridients={ingridients}/>
                ))}
            </ul>
        </section>
    )
}

BurgerIngridients.propTypes = {
    ingridients: PropTypes.arrayOf(PropTypes.object).isRequired
}

export default BurgerIngridients;