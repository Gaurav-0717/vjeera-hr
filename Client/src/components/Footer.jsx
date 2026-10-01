function Footer() {
  return (
    <footer className="site-footer">
      <div className="container text-center">
        <div className="mb-2 fw-bold">Vjeera HR — Professional HR Academy</div>
        <div className="small">8 The Green, Ste A, Dover, DE 19901</div>
        <div className="small">Contact +345 09-904-4506</div>
        <div className="mt-3 small">
          &copy; {new Date().getFullYear()} Vjeera HR. All rights reserved.
        </div>
      </div>
    </footer>
  );
}

export default Footer;
