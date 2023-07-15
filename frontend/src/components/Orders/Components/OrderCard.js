import React from 'react'
import '../orders.css'
import CheckoutProduct from '../../CheckoutProduct';
function OrderCard({ order }) {
    return (
        <div className='order'>
            <h2>Order</h2>
            <p className="order__id">
                <small>{order.id}</small>
            </p>
            {order.data.basket?.map(item => (
                <CheckoutProduct
                    id={item.id}
                    title={item.title}
                    image={item.image}
                    price={item.price}
                    rating={item.rating}
                    hideButton
                />
            ))}
            <h3 className="order__total">Order Total: ${order.data.amount / 100}</h3>

              
        </div>
    )
}

export default OrderCard