import  { useState } from 'react';

export function useToogle() {
    const [value, setValue] = useState(true);
    const toggle = () => setValue(!value);

    return {
        value,
        toggle
    }
}