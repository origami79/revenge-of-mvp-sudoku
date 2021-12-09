import React from 'react';

import apple from '../../../assets/svg/fruit/apple.svg';
import avocado from '../../../assets/svg/fruit/avocado.svg';
import banana from '../../../assets/svg/fruit/banana.svg';
import cherry from '../../../assets/svg/fruit/cherry.svg';
import grapes from '../../../assets/svg/fruit/grapes.svg';
import pear from '../../../assets/svg/fruit/pear.svg';
import pineapple from '../../../assets/svg/fruit/pineapple.svg';
import strawberry from '../../../assets/svg/fruit/strawberry.svg';
import watermelon from '../../../assets/svg/fruit/watermelon.svg';

const pieces = {
  number: {
    1: <div className="piece one number">1</div>,
    2: <div className="piece two number">2</div>,
    3: <div className="piece three number">3</div>,
    4: <div className="piece four number">4</div>,
    5: <div className="piece five number">5</div>,
    6: <div className="piece six number">6</div>,
    7: <div className="piece seven number">7</div>,
    8: <div className="piece eight number">8</div>,
    9: <div className="piece nine number">9</div>,
    0: <div className="piece zero number"></div>
  },
  color: {
    1: <div className="piece one color"></div>,
    2: <div className="piece two color"></div>,
    3: <div className="piece three color"></div>,
    4: <div className="piece four color"></div>,
    5: <div className="piece five color"></div>,
    6: <div className="piece six color"></div>,
    7: <div className="piece seven color"></div>,
    8: <div className="piece eight color"></div>,
    9: <div className="piece nine color"></div>,
    0: <div className="piece zero color"></div>
  },
  fruit: {
    1: <img className="piece one fruit" src={apple}></img>,
    2: <img className="piece two fruit" src={avocado}></img>,
    3: <img className="piece three fruit" src={banana}></img>,
    4: <img className="piece four fruit" src={cherry}></img>,
    5: <img className="piece five fruit" src={grapes}></img>,
    6: <img className="piece six fruit" src={pear}></img>,
    7: <img className="piece seven fruit" src={pineapple}></img>,
    8: <img className="piece eight fruit" src={strawberry}></img>,
    9: <img className="piece nine fruit" src={watermelon}></img>,
    0: <div className="piece zero fruit"></div>
  }
};

export default pieces;