const CircleLoader = () => {

    const styles = {
      container565: {
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        height: "5rem",
        width: "100%"
      },
      loaderWrapper565: {
        position: "relative",
        width: "5rem",
        height: "5rem"
      },
      baseCircle565: {
        width: "5rem",
        height: "5rem",
        borderRadius: "50%",
        border: "4px solid #e5e7eb",
        boxSizing: "border-box"
      },
      spinningCircle565: {
        position: "absolute",
        top: 0,
        left: 0,
        width: "5rem",
        height: "5rem",
        borderRadius: "50%",
        border: "4px solid transparent",
        borderTopColor: "#3b82f6",
        boxSizing: "border-box",
        animation: "spin565 1s linear infinite"
      }
    };
  
    return (
      <div style={styles.container565} className="container565">
        <div style={styles.loaderWrapper565} className="loaderWrapper565">
          <div style={styles.baseCircle565} className="baseCircle565"></div>
          <div style={styles.spinningCircle565} className="spinningCircle565"></div>
          <style>
            {`
              @keyframes spin565 {
                0% { transform: rotate(0deg); }
                100% { transform: rotate(360deg); }
              }
            `}
          </style>
        </div>
      </div>
    );
  }