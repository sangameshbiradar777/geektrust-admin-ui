import '../styles/Error/Error.css';

const Error = ({ error }) => {
  return (
    <div className="error-container">
      <h2 className="error__message">
        Sorry, An Error Occurred!
        <br />
        {error.message}, code - {error.code}
      </h2>
    </div>
  );
}

export default Error;