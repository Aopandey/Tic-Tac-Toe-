export default function Game({onselectBox, board}) {
    return(
        <ol id="game-board">
            {board.map((row, rowIndex) => <li key={rowIndex}>
                <ol>
                    {row.map((playerSymbol, colIndex) => (<li key={colIndex}>
                        <button onClick={() => onselectBox(rowIndex, colIndex)} disabled={playerSymbol != null}>
                            {playerSymbol}</button></li>))}
                </ol>
            </li>)}
        </ol>
    )
}