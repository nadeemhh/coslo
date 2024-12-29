
// Button component
const Button = ({
  onClick,
  children=null,
  backgroundColor = '#1389F0',
  textColor = '#fff',
  leftIcon,
  rightIcon,
  border= false,
  className=''
}) => {
  return (
    <button
      onClick={onClick}
      style={{
        backgroundColor,
        color: textColor,
        border: border?'1px solid black':'none',
        padding: '8px 16px',
        borderRadius: '4px',
        cursor: 'pointer',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        gap: '10px',
        fontSize: '15px'
      }}
      className={className}
    >
      {leftIcon && (
        <img
          src={leftIcon}
          alt="left-icon"
          style={{
            width: '20px',
            height: '20px',
            display: 'flex',
            alignItems: 'center',
          }}
        />
      )}

{children && <span style={{ display: 'flex', alignItems: 'center' }}>{children}</span>}

      {rightIcon && (
        <img
          src={rightIcon}
          alt="right-icon"
          style={{
            width: '20px',
            height: '20px',
            display: 'flex',
            alignItems: 'center',
          }}
        />
      )}
    </button>
  );
};

export default Button;
