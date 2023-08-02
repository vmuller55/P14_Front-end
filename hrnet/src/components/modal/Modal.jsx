const Modal = ({  modalStyle, contentStyle, children }) => {
  return (
        <div className="modal" style={modalStyle}>
          <div className="modal-content" style={contentStyle}>
            {children}
          </div>
        </div>
  );
};

export default Modal;