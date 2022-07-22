import React, { useRef } from "react";
import ingridientsStyle from './burger-ingridients.module.css';
import { Tab } from "@ya.praktikum/react-developer-burger-ui-components";
import IngridientsCategory from "./ingridients-category/ingridients-category";
import { useInView } from "react-intersection-observer";
import { useEffect } from "react";

const BurgerIngridients = () => {
    const [current, setCurrent] = React.useState('buns');

    const [bunsRef, bunsInView] = useInView({ threshold: 0.1 });
    const [saucesRef, saucesInView] = useInView({ threshold: 0.1 });
    const [fillingsRef, fillingsInView] = useInView({ threshold: 0.1 });

    const handleScroll = () => {
        switch (true) {
            case bunsInView:
                setCurrent('buns');
                break;
            case saucesInView:
                setCurrent('sauces');
                break;
            case fillingsInView:
                setCurrent('fillings');
                break;
            default:
                break;
        }
    };

    useEffect(() => {
        handleScroll();
    }, [bunsInView, saucesInView, fillingsInView]);

    return (
        <section className={ingridientsStyle.section}>
            <h1 className='text text_type_main-large mb-5'>Соберите бургер</h1>
            <div className={ingridientsStyle.tab}>
                <Tab value="buns" active={current === 'buns'}>
                    Булки
                </Tab>
                <Tab value="sauces" active={current === 'sauces'}>
                    Соусы
                </Tab>
                <Tab value="fillings" active={current === 'fillings'}>
                    Начинки
                </Tab>
            </div>
            <ul className={`${ingridientsStyle.list} custom-scroll`}>
                <div ref={bunsRef}>
                    <IngridientsCategory key={'buns'} category={{ type: 'bun', name: 'Булки' }} />
                </div>
                <div ref={saucesRef}>
                    <IngridientsCategory key={'sauces'} category={{ type: 'sauce', name: 'Соусы' }} />
                </div>
                <div ref={fillingsRef}>
                    <IngridientsCategory key={'fillings'} category={{ type: 'fillings', name: 'Начинки' }} />
                </div>
            </ul>
        </section>
    )
}

export default BurgerIngridients;