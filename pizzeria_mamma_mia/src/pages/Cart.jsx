import { useContext } from "react";
import { Link } from 'react-router-dom';
import SelectPizza from "../components/SelectPizza";
import { CartContext } from "../context/CartContext";
import { UserContext } from "../context/UserContext";
import formatCurrency from '../utils/price';

function Cart() {
    const { cart, onIncrease, onDecrease } = useContext(CartContext);
    const { usuarioRegistrado } = useContext(UserContext);
    const total = cart.reduce((sum, p) => sum + (Number(p.price) * Number(p.count || 0)), 0);

    return(
        <>
            <div className="cartPizzas">
                <h4>Detalles del pedido</h4>
                <div>
                    {cart.map((item) => (
                        <SelectPizza 
                            key={item.id}
                            idn={item.id}
                            nombre={item.name}
                            precio={item.price}
                            cantidad={item.count}
                            imagen={item.img}
                            onIncrease={() => onIncrease(item.id)}
                            onDecrease={() => onDecrease(item.id)}
                        />
                    ))}  
                </div>        
                <h3>{`Total: ${formatCurrency(total)}`}</h3>
                <button
                    className="cartPagar"
                    disabled={!usuarioRegistrado}
                    title={!usuarioRegistrado ? 'Debes registrarte para pagar' : ''}
                >
                    Pagar
                </button>
                {!usuarioRegistrado && (
                    <p style={{ marginTop: '10px' }}>
                        Debes registrarte para poder pagar. <Link to="/register">Regístrate aquí</Link>
                    </p>
                )}
            </div>
        </>        
    );    
};

export default Cart;