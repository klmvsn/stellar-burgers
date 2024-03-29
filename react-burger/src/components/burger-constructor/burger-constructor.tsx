import constructorStyle from './burger-constructor.module.css';
import { ConstructorElement, CurrencyIcon, Button } from "@ya.praktikum/react-developer-burger-ui-components";
import { FC, useEffect, useMemo, useState } from 'react';
import { renderOrder } from '../../services/actions/order-details';
import { nanoid } from 'nanoid';
import { useDrop } from 'react-dnd';
import DraggableIngridients from './draggable-ingridients/draggable-ingridients';
import { addBun, addFilling } from '../../services/slices/burger-constructor';
import { getCookie } from '../../utils/cookie';
import { useHistory } from 'react-router-dom';
import { TIngridient, TUseSelector, useAppDispatch } from '../../utils/types';

const BurgerConstructor: FC = () => {
    const dispatch = useAppDispatch();
    const cookie = getCookie('token');
    const history = useHistory();
    const { bun, ingridients } = TUseSelector(store => store.burgerConstructor);
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
        cookie && dispatch(renderOrder(orderId, setLoading));
        !cookie && history.push('/login');
    }

    const [{ isHover }, dropTarget] = useDrop({
        accept: 'ingridient',
        drop(item: TIngridient) {
            onDropHandler(item);
        },
        collect: monitor => ({
            isHover: monitor.isOver(),
        })
    });

    const dropContainerBorderColor = isHover ? '2px solid #4C4CFF' : 'transparent';

    const onDropHandler = (item: TIngridient) => {
        const uniqueId = nanoid();
        item.type !== 'bun' ? dispatch(addFilling({ ...item, uniqueId })) : dispatch(addBun({ ...item, uniqueId }));
    }

    return (
        <section className={`${constructorStyle.section} ml-10 mt-20`}>
            <div className={constructorStyle.constructor_container} ref={dropTarget} style={{ border: dropContainerBorderColor }}>
                {bun.name === '' ? <p className="text text_type_main-default">Перетащите булку сюда</p> :
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
                                <DraggableIngridients item={item} index={index} key={item.uniqueId} />
                            )
                        }
                        )}
                    </ul>}

                {bun.name === '' ? <p className="text text_type_main-default">Перетащите булку сюда</p> :
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
                    <CurrencyIcon type='primary' />
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