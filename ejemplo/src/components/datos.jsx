import React, { useState } from 'react';

const Datos = () => {
  
  const edad = 18;
  const pi = 3.141516;
  const frutas = ['mango', 2.74, 9, true];

  
  const [num1, setNum1] = useState(0);
  const [num2, setNum2] = useState(0);
  const [resultado, setResultado] = useState(0);

  const [incremento, setIncremento] = useState(0);
  const sumar = () => {
    const suma = Number(num1) + Number(num2);
    setResultado(suma);
  };

  
  const aumentar =()=>{


 setIncremento(incremento + 1);


  }

  const disminuir =()=>{


    setIncremento(incremento - 1);
   
   
     }

  return (
    <>
      <input
        type="number"
        id="num1"
        value={num1}
        onChange={(e) => setNum1(e.target.value)}
      />
      <input
        type="number"
        id="num2"
        value={num2}
        onChange={(e) => setNum2(e.target.value)}
      />
      <button type="button" id="btn" onClick={sumar}>
        Sumar
      </button>

      <button type="button" id="btn2" onClick={aumentar}>
       +
      </button>

      <button type="button" id="btn2" onClick={disminuir}>
       -
      </button>
      <h1>
        Que se dice socio de {edad} años sabias que el número pi es {pi} <br />
        impresión del arreglo {frutas.toString().replace(/,/g, ' ')} <br />
        la suma es <span id="rs">{resultado}</span>
      </h1>

      <p>El sumador es {incremento}</p>
    </>
  );
};

export default Datos;
