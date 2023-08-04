import React from 'react'

const Modal = ({  modalStyle, headerStyle, contentStyle, footerStyle, header, content, footer }) => {
    return (
          <div className="modal" style={modalStyle}>
              <div className="modal-header" style={headerStyle}>
                  {header}
              </div>
              <div className="modal-content" style={contentStyle}>
                  {content}
              </div>
              <div className="modal-footer" style={footerStyle}>
                  {footer}
              </div>
          </div>
    );
  };
  
  export default Modal;