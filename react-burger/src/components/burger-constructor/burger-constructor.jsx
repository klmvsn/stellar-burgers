import constructorStyle from './burger-constructor.module.css';
import { ConstructorElement, CurrencyIcon, Button } from "@ya.praktikum/react-developer-burger-ui-components";
import { useEffect, useMemo, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { renderOrder } from '../../services/actions/order-details';
import { nanoid } from 'nanoid';
import { addBun, addFilling } from '../../services/actions/burger-constructor';
import { useDrop } from 'react-dnd';
import DraggableIngridients from './draggable-ingridients/draggable-ingridients';

const BurgerConstructor = () => {
    const dispatch = useDispatch();
    const { bun, ingridients } = useSelector(store => store.burgerConstructor);
    const [totalPrice, setTotalPrice] = useState(0);
    const orderId = useMemo(
        () => ingridients.map(item => item._id), [ingridients]
    )

    useEffect(() => {
        const total = ingridients.reduce((sum, item) => sum + item.price, bun.length !== 0 ? (bun.price * 2) : 0);
        setTotalPrice(total);
    }, [bun, ingridients])

    const handleOrderDetailssModal = () => {
        dispatch(renderOrder(orderId));
    }

    const [, dropTarget] = useDrop({
        accept: 'ingridient',
        drop(item) {
            onDropHandler(item);
        }
    })

    const onDropHandler = (item) => {
        const uniqueId = nanoid();
        item.type != 'bun' ? dispatch(addFilling(item, uniqueId)) : dispatch(addBun(item, uniqueId));
    }

    return (
        <section className={`${constructorStyle.section} ml-10 mt-20`}>
            <div className={constructorStyle.constructor_container} ref={dropTarget}>
                {bun.length === 0 ? <p className="text text_type_main-default">Выберите булку</p> :
                    <ConstructorElement
                        type="top"
                        isLocked={true}
                        text={`${bun.name} (верх)`}
                        price={bun.price}
                        thumbnail={bun.image}
                    />}

                {ingridients.length === 0 ? <p className="text text_type_main-default">Выберите начинку</p> :
                    <ul className={`${constructorStyle.list} custom-scroll`}>
                        {ingridients.map((item, index) => {
                            return (
                                <DraggableIngridients item={item} index={index} key={item.uniqueId}/>
                            )
                        }
                        )}
                    </ul>}

                {bun.length === 0 ? <p className="text text_type_main-default">Выберите булку</p> :
                    <ConstructorElement
                        type="bottom"
                        isLocked={true}
                        text={`${bun.name} (низ)`}
                        price={bun.price}
                        thumbnail={bun.image}
                    />}
            </div>
            <div className={`${constructorStyle.total} mt-10 mr-8`}>
                <div className={`${constructorStyle.price} mr-10`}>
                    <p className="text text_type_digits-medium mr-2">{totalPrice}</p>
                    <CurrencyIcon />
                </div>
                {totalPrice === 0 ? '' : <Button type="primary" size="large"
                    onClick={handleOrderDetailssModal}>Оформить заказ</Button>}
            </div>
        </section>
    )
}

export default BurgerConstructor;