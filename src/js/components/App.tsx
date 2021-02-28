import React from 'react';

export const App: React.FC = () => {
    const [c, setc] = React.useState(0)
    return (
        <div>
            Hello
            {c}
            <button onClick={() => setc(c + 1)}>CLICK</button>
        </div>
    )
}