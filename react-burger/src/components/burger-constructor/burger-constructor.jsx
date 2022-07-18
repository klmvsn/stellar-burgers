import constructorStyle from './burger-constructor.module.css';
import { ConstructorElement, DragIcon, CurrencyIcon, Button } from "@ya.praktikum/react-developer-burger-ui-components";
import { useContext, useEffect, useState } from 'react';
import OrderDetails from './order-details/order-details';
import { IngridientsContext } from '../../services/ingridientsContext';
import { postOrder } from '../../utils/burger-api';
import Modal from '../modal/modal';
import { useSelector } from 'react-redux';

const BurgerConstructor = () => {
    const [totalPrice, setTotalPrice] = useState(0);
    const ingridientsList = useSelector(store => store.burgerIngridients.ingridients);
    const [isOrderDetailsModalOpen, setOrderDetailsModal] = useState(false);
    const lockedBun = ingridientsList.find((item) => item.type === 'bun');
    const filling = ingridientsList.filter((item) => item.type !== 'bun');
    const orderId = ingridientsList.map(item => item._id);

    const [orderData, setOrderData] = useState({
        name: '',
        order: {
            number: null
        },
        success: false
    })

    useEffect(() => {
        const total = filling.reduce((sum, item) => sum + item.price, lockedBun ? (lockedBun.price * 2) : 0);
        setTotalPrice(total);
    }, [lockedBun, filling])

    const handleOrderDetailssModal = () => {
        postOrder(orderId)
            .then(res => {
                setOrderData(res);
                setOrderDetailsModal(true);
            })
            .catch(err => console.log(err))
    }

    return (
        <section className={`${constructorStyle.section} ml-10 mt-20`}>
            <div className={constructorStyle.constructor_container}>
                <ConstructorElement
                    type="top"
                    isLocked={true}
                    text={`${lockedBun.name} (верх)`}
                    price={lockedBun.price}
                    thumbnail={lockedBun.image}
                />

                <ul className={`${constructorStyle.list} custom-scroll`}>
                    {filling.map(item => {
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
                    text={`${lockedBun.name} (низ)`}
                    price={lockedBun.price}
                    thumbnail={lockedBun.image}
                />
            </div>
            <div className={`${constructorStyle.total} mt-10 mr-8`}>
                <div className={`${constructorStyle.price} mr-10`}>
                    <p className="text text_type_digits-medium mr-2">{totalPrice}</p>
                    <CurrencyIcon />
                </div>
                <Button type="primary" size="large" onClick={handleOrderDetailssModal}>Оформить заказ</Button>
               {isOrderDetailsModalOpen && <Modal setState={setOrderDetailsModal}>
                    <OrderDetails orderData={orderData}/>
                </Modal>}
            </div>
        </section>
    )
}

export default BurgerConstructor;