export default function Checkbox({name, value}) {
    const identifier = value.toLowerCase().replace(' ', '_').replace('ä', 'ae').replace('ö', 'oe').replace('ü', 'ue');
  return (
    <>
      <input type="checkbox" name={name} id={`${name}_${identifier}`} value={value}></input>
        <label htmlFor={`${name}_${identifier}`}>{value}</label>
    </>
  );
}