function Loader({ fullScreen = false, label = 'Loading...' }) {
  return (
    <div className={fullScreen ? 'loader-shell loader-shell--fullscreen' : 'loader-shell'}>
      <div className="loader-spinner" />
      <p>{label}</p>
    </div>
  );
}

export default Loader;
