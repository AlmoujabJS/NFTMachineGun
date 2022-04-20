const LayerInput = (props) => {
  return (
    <>
      <label
        htmlFor={`layer${props.num}`}
        className="btn btn-primary"
      >{`Layer ${props.num} ...`}</label>
      <input
        name={props.num}
        data-layer={props.num}
        id={`layer${props.num}`}
        type="file"
        accept=".jpg, .jpeg, .png"
        multiple
      />
    </>
  );
};

export default LayerInput;
