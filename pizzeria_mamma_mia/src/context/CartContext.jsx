import { createContext, useState, useEffect } from "react";


export const CartContext = createContext();

export const CartProvider = ({children, initialCart = []}) => {
    const [cart, setCart] = useState(initialCart);
    const [total, setTotal] = useState(0);

    useEffect(() => {
        const nuevoTotal = cart.reduce((sum, p) => sum + (Number(p.price) * Number(p.count || 0)), 0);
        setTotal(nuevoTotal);
    }, [cart]);

    const onIncrease = (id) => {
        setCart(cart.map(item => 
            item.id === id ? { ...item, count: item.count + 1 } : item
        ));
    };

    const onDecrease = (id) => {
        const item = cart.find(p => p.id === id);
        if (item && item.count > 1) {
            setCart(cart.map(p => 
                p.id === id ? { ...p, count: p.count - 1 } : p
            ));
        } else {
            setCart(cart.filter(p => p.id !== id));
        }
    };

    const addToCart = (pizza) => {
        const existingItem = cart.find(item => item.id === pizza.id);
        if (existingItem) {
            onIncrease(pizza.id);
        } else {
            setCart([...cart, { ...pizza, count: 1 }]);
        }
    };
    
    return(
        <CartContext.Provider value={{ cart, total, onIncrease, onDecrease, addToCart }}>
            {children}
        </CartContext.Provider>
    );
};

export default CartProvider;