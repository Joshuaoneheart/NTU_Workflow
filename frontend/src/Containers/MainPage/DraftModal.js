import { Modal, Button } from "antd";
import { useRef, useState } from "react";
import Draggable from "react-draggable";

const DraftModal = () => {
	const [modalState, setModalState] = useState({
    visible: false,
    disabled: true,
    bounds: { left: 0, top: 0, bottom: 0, right: 0 },
  });

	draggleRef = useRef(null);

  showModal = () => {
    setModalState({
      visible: true,
    });
  };

  handleOk = e => {
    console.log(e);
    setModalState({
      visible: false,
    });
  };

  handleCancel = e => {
    console.log(e);
    setModalState({
      visible: false,
    });
  };
  return (
    <>
      <Button>New Draft</Button>
      <Button>Edit Draft</Button>
      <Modal
        title={
          <div
            style={{
              width: "100%",
              cursor: "move",
            }}
            onMouseOver={() => {
              if (disabled) {
                this.setState({
                  disabled: false,
                });
              }
            }}
            onMouseOut={() => {
              this.setState({
                disabled: true,
              });
            }}
            // fix eslintjsx-a11y/mouse-events-have-key-events
            // https://github.com/jsx-eslint/eslint-plugin-jsx-a11y/blob/master/docs/rules/mouse-events-have-key-events.md
            onFocus={() => {}}
            onBlur={() => {}}
            // end
          >
            Edit Your Draft
          </div>
        }
        visible={visible}
        onOk={handleOk}
        onCancel={handleCancel}
        modalRender={(modal) => (
          <Draggable
            disabled={disabled}
            bounds={bounds}
            onStart={(event, uiData) => this.onStart(event, uiData)}
          >
            <div ref={draggleRef}>{modal}</div>
          </Draggable>
        )}
      ></Modal>
    </>
  );
};

export default DraftModal;
