import React from 'react';
import classes from './Button.module.css';

const Button = (props) => {

    console.log('Isso aqui vai atualizar!!!!')

    return (
        <button
            className={classes.Button}
            onClick={props.onClick}
            type={props.buttonType || 'button'}
        >
            {props.children}
        </button>
    );
};

export default React.memo(Button);
