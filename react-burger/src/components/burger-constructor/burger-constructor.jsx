import constructorStyle from './burger-constructor.module.css';
import { ConstructorElement, DragIcon, CurrencyIcon, Button } from "@ya.praktikum/react-developer-burger-ui-components";
import { useState } from 'react';
import OrderDetails from './order-details/order-details';
import PropTypes from 'prop-types';;

const BurgerConstructor = ({ ingridients }) => {
    const [isOrderDetailsModalOpen, setOrderDetailsModal] = useState(false);

    const handleOrderDetailssModal = () => {
        setOrderDetailsModal(true);
    }

    const lockedBun = ingridients.find((item) => item.type === 'bun');
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
                    {ingridients.filter(item => item.type === 'main' || item.type === 'sauce').map(item => {
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
                    <p className="text text_type_digits-medium mr-2">1981</p>
                    <CurrencyIcon />
                </div>
                <Button type="primary" size="large" onClick={handleOrderDetailssModal}>Оформить заказ</Button>
                <OrderDetails isOpen={isOrderDetailsModalOpen} handleClose={setOrderDetailsModal} />
            </div>
        </section>
    )
}

BurgerConstructor.propTypes = {
    ingridients: PropTypes.arrayOf(PropTypes.object).isRequired
}

export default BurgerConstructor;