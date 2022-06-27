import React from "react";
import constructorStyle from './burger-constructor.module.css';
import { ConstructorElement, DragIcon, CurrencyIcon, Button } from "@ya.praktikum/react-developer-burger-ui-components";
import data from "../../utils/data";

const BurgerConstructor = () => {
    return (
        <section className={`${constructorStyle.section} ml-10 mt-20`}>
            <div className={constructorStyle.constructor_container}>
                <ConstructorElement
                    type="top"
                    isLocked={true}
                    text="Краторная булка N-200i (верх)"
                    price={200}
                    thumbnail={'https://code.s3.yandex.net/react/code/bun-02.png'}
                />

                <ul className={`${constructorStyle.list} custom-scroll`}>
                    {data.map(item => {
                        if (item.type === 'main' || item.type === 'sauce') 
                            return (
                                <li className={`${constructorStyle.item} mt-4 pr-5`} key={item._id}>
                                    <DragIcon />
                                    <ConstructorElement
                                        text={item.name}
                                        price={item.price}
                                        thumbnail={item.image}
                                    />
                                </li>
                            )
                        }
                    )}
                </ul>

                <ConstructorElement
                    type="bottom"
                    isLocked={true}
                    text="Краторная булка N-200i (низ)"
                    price={200}
                    thumbnail={'https://code.s3.yandex.net/react/code/bun-02.png'}
                />
            </div>
            <div className={`${constructorStyle.total} mt-10 mr-8`}>
                <div className={`${constructorStyle.price} mr-10`}>
                    <p className="text text_type_digits-medium mr-2">1981</p>
                    <CurrencyIcon />
                </div>
                <Button type="primary" size="large">Оформить заказ</Button>
            </div>
        </section>
    )
}

export default BurgerConstructor;