import { useState } from "react";

export default function(initialValue) {
  const [items, setItems] = useState(initialValue);
  const onAdd = e => {
    const item = e.target.value;
    e.target.value = "";
    setItems([...items, item]);
  };
  const onDelete = e => {
    const index = e.target.name;
    const copy = items.slice();
    copy.splice(index, 1);
    setItems(copy);
  };

  const onChange = e => {
    const item = e.target.value,
      index = e.target.name;
    const copy = items.slice();
    copy[index] = item;
    setItems(copy);
  };

  return {
    value: items,
    onAdd,
    onDelete,
    onChange
  };
}
