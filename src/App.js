import React from 'react';
import './styles.css';

const MAPPING = [{
  eng: 'HA',
  tam: 'ஹா'
}, {
  eng: 'RU',
  tam: 'ரு'
}, {
  eng: 'MU',
  tam: 'மு'
}]

const FRONT_STYLE = {
  backgroundColor: 'rgb(237,184,182)',
  color: 'black'
}

const BACK_STYLE = {
  backgroundColor: 'dodgerblue',
  color: 'white'
}

const Harumu = () => {
  const mapRef = React.useRef('');

  const [flips, setFlips] = React.useState([0, 0, 0]);
  const [move, setMove] = React.useState(false);
  const [mappings, setMappings] = React.useState(MAPPING);
  const [muruga, showMuruga] = React.useState(false);

  const onFlip = (i) => {
    setFlips([...flips.slice(0, i), 1, ...flips.slice(i + 1)]);
  }

  const changeData = (index) => {
    const tmpMap = JSON.parse(JSON.stringify(mapRef.current));
    const item = tmpMap[index];

    item.done = true;

    const tmp = item.eng;
    item.eng = item.tam;
    item.tam = tmp;
    setMappings(tmpMap);
  }

  React.useEffect(() => {
    mapRef.current = mappings;
  }, [mappings]);

  React.useEffect(() => {
    let st1 = 0;
    let st2 = 0;
    let st3 = 0;
    let st4 = 0;
    let st5 = 0;

    if (flips.every(i => i === 1)) {
      setMove(true);

      st1 = setTimeout(() => {
        st2 = setTimeout(() => changeData(2), 2000);
        st3 = setTimeout(() => changeData(1), 4000);
        st4 = setTimeout(() => changeData(0), 6000);
        st5 = setTimeout(() => showMuruga(true), 8000);
      }, 7000);
    }

    return () => {
      clearTimeout(st1);
      clearTimeout(st2);
      clearTimeout(st3);
      clearTimeout(st4);
      clearTimeout(st5);
    }
  }, [flips]);

  return (
    <div className='container'>
      {mappings.map((m, i) => (
        <div
          key={i}
          className={`flip-card circle ${move ? "move" : ''}`}
          onClick={() => onFlip(i)}
        >
          <div className="flip-card-inner">
            <div className="flip-card-front">
              <h1>{m.tam}</h1>
            </div>
            <div
              className="flip-card-back"
              style={m.done ? BACK_STYLE : FRONT_STYLE}
            >
              <h1>{m.eng}</h1>
            </div>
          </div>
        </div>
      ))}

      {muruga && (<>
        <img className="muruga-image" src="muruga.jpeg" alt="muruga" />
        <div className='typewriter'><h1>யாமிருக்க​ பயமேன்</h1></div>
      </>
      )}
    </div>
  )
}

export default Harumu;