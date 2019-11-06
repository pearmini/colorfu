import { useState } from "react";

export default function(initialValue) {
    const [value, setValue] = useState(initialValue);
    const handleValueChange = e => {
        setValue(e.target.value);
    }
    return {
        value,
        onChange: handleValueChange
    }
}
