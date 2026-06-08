import './Lab1.css';

export function Chessboard () {
  const rows = [8, 7, 6, 5, 4, 3, 2, 1];
  const cols = ['a', 'b', 'c', 'd', 'e', 'f', 'g', 'h'];

  // Генерация клеток для одного ряда
  const renderRow = (rowIndex) => {
    const cells = [];
    for (let i = 0; i < cols.length; i++) {
      const isWhite = (rowIndex + i) % 2 === 0;
      const className = isWhite ? 'white' : 'black';
      cells.push(<div key={i} className={`cell ${className}`} />);
    }
    return cells;
  };

  return (
    <div className="chessboard-container">

      <div className="letters-row">
        <div className="corner" />

        {cols.map(letter => (
          <div key={letter} className="letter-label">{letter}</div>
        ))}

        <div className="corner" />
      </div>

      <div className="board-wrapper">

        <div className="numbers-left">
          {rows.map(num => (
            <div key={num} className="number-label">{num}</div>
          ))}
        </div>

        <div className="board">
          {rows.map((idx) => renderRow(idx))}
        </div>

        <div className="numbers-right">
          {rows.map(num => (
            <div key={num} className="number-label">{num}</div>
          ))}
        </div>
      </div>

      <div className="letters-row">
        
        <div className="corner" />

        {cols.map(letter => (
          <div key={letter} className="letter-label">{letter}</div>
        ))}

        <div className="corner" />
      </div>

    </div>
  );
};