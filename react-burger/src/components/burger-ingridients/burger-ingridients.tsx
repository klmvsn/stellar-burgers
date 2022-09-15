import React, { FC } from "react";
import ingridientsStyle from './burger-ingridients.module.css';
import { Tab } from "@ya.praktikum/react-developer-burger-ui-components";
import IngridientsCategory from "./ingridients-category/ingridients-category";
import { useInView } from "react-intersection-observer";
import { useEffect } from "react";

const BurgerIngridients: FC = () => {
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

    const onTabScroll = (type: string) => {
        setCurrent(type);
        const section: HTMLElement | null = document.getElementById(type);
        if (section) {
            section.scrollIntoView({ behavior: "smooth", block: "start" });
        }
    };

    useEffect(() => {
        handleScroll();
    });

    return (
        <section className={ingridientsStyle.section}>
            <h1 className='text text_type_main-large mb-5'>Соберите бургер</h1>
            <div className={ingridientsStyle.tab}>
                <Tab value="buns" active={current === 'buns'} onClick={() => onTabScroll('bun')}>
                    Булки
                </Tab>
                <Tab value="sauces" active={current === 'sauces'} onClick={() => onTabScroll('sauces')}>
                    Соусы
                </Tab>
                <Tab value="fillings" active={current === 'fillings'} onClick={() => onTabScroll("fillings")}>
                    Начинки
                </Tab>
            </div>
            <ul className={`${ingridientsStyle.list} custom-scroll`}>
                <div ref={bunsRef}>
                    <IngridientsCategory key={'buns'} type='bun' name='Булки' />
                </div>
                <div ref={saucesRef}>
                    <IngridientsCategory key={'sauces'} type='sauce' name='Соусы' />
                </div>
                <div ref={fillingsRef}>
                    <IngridientsCategory key={'fillings'} type='main' name='Начинки' />
                </div>
            </ul>
        </section>
    )
}

export default BurgerIngridients;