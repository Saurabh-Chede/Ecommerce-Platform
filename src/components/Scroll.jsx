function Scroll() {
  return (
    <div>
      {/* Navbar */}
      <nav style={{ position: "fixed", top: 0, width: "100%", background: "#333", padding: "1rem", zIndex: 1000 }}>
        <a href="#home" style={{ color: "white", marginRight: "1rem" }}>Home</a>
        <a href="#about" style={{ color: "white", marginRight: "1rem" }}>About</a>
        <a href="#contact" style={{ color: "white" }}>Contact</a>
      </nav>

      {/* Sections */}
      <div id="home" style={{ height: "100vh", paddingTop: "80px", background: "#f2f2f2" }}>
        <h1>Home Section</h1>
      </div>

      <div id="about" style={{ height: "100vh", paddingTop: "80px", background: "#dff0d8" }}>
        <h1>About Section</h1>
      </div>

      <div id="contact" style={{ height: "100vh", paddingTop: "80px", background: "#d9edf7" }}>
        <h1>Contact Section</h1>
      </div>
    </div>
  );
}

export default Scroll;
