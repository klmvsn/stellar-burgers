import constructorStyle from './burger-constructor.module.css';
import { ConstructorElement, CurrencyIcon, Button } from "@ya.praktikum/react-developer-burger-ui-components";
import { useEffect, useMemo, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { renderOrder } from '../../services/actions/order-details';
import { nanoid } from 'nanoid';
import { useDrop } from 'react-dnd';
import DraggableIngridients from './draggable-ingridients/draggable-ingridients';
import { addBun, addFilling } from '../../services/slices/burger-constructor';

const BurgerConstructor = () => {
    const dispatch = useDispatch();
    const { bun, ingridients } = useSelector(store => store.burgerConstructor);
    const [totalPrice, setTotalPrice] = useState(0);
    const [isLoading, setLoading] = useState(false);
    const orderId = useMemo(
        () => ingridients.map(item => item._id), [ingridients]
    )

    useEffect(() => {
        const total = ingridients.reduce((sum, item) => sum + item.price, bun.length !== 0 ? (bun.price * 2) : 0);
        setTotalPrice(total);
    }, [bun, ingridients])

    const handleOrderDetailssModal = () => {
        dispatch(renderOrder(orderId, setLoading));
    }

    const [{ isHover }, dropTarget] = useDrop({
        accept: 'ingridient',
        drop(item) {
            onDropHandler(item);
        },
        collect: monitor => ({
            isHover: monitor.isOver(),
        })
    });

    const dropContainerBorderColor = isHover ? '2px solid #4C4CFF' : 'transparent';

    const onDropHandler = (item) => {
        const uniqueId = nanoid();
        item.type !== 'bun' ? dispatch(addFilling({...item, uniqueId})) : dispatch(addBun({...item, uniqueId}));
    }

    return (
        <section className={`${constructorStyle.section} ml-10 mt-20`}>
            <div className={constructorStyle.constructor_container} ref={dropTarget} style={{border: dropContainerBorderColor}}>
                {bun.length === 0 ? <p className="text text_type_main-default">Перетащите булку сюда</p> :
                    <ConstructorElement
                        type="top"
                        isLocked={true}
                        text={`${bun.name} (верх)`}
                        price={bun.price}
                        thumbnail={bun.image}
                    />}

                {ingridients.length === 0 ? <p className="text text_type_main-default">Перетащите начинку сюда</p> :
                    <ul className={`${constructorStyle.list} custom-scroll`}>
                        {ingridients.map((item, index) => {
                            return (
                                <DraggableIngridients item={item} index={index} key={item.uniqueId} style={{ boxShadow: dropContainerBorderColor }} />
                            )
                        }
                        )}
                    </ul>}

                {bun.length === 0 ? <p className="text text_type_main-default">Перетащите булку сюда</p> :
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
                {bun.length === 0 || ingridients.length === 0 || isLoading ? <Button type="primary" size="large" disabled>Оформить заказ</Button> :
                    <Button type="primary" size="large" onClick={handleOrderDetailssModal}>
                        {isLoading ? 'Подождите...' : 'Оформить заказ'}
                    </Button>}
            </div>
        </section>
    )
}

export default BurgerConstructor;