import { useState } from "react";
import {
  Button,
  Checkbox,
  ComposedModal,
  DatePicker,
  DatePickerInput,
  Loading,
  ModalBody,
  ModalFooter,
  ModalHeader,
} from "@carbon/react";
import ReactDOM from "react-dom";

export default function AddHolidayRequest() {
  const [open, setOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const [fromDate, setFormDate] = useState<Date[]>();
  const [fromHalfDay, setFromHalfDay] = useState<boolean>();
  const [toDate, setToDate] = useState<Date[]>();
  const [toHalfDay, setToHalfDay] = useState<boolean>();

  return (
    <>
      {typeof document === "undefined"
        ? null
        : ReactDOM.createPortal(
            <ComposedModal open={open} onClose={() => setOpen(false)}>
              <Loading
                id={"addHolidayRequest-Loading"}
                className={"add-holiday-request-loading"}
                active={loading}
                withOverlay={true}
                small={false}
              />
              ;<ModalHeader title={`Add new holiday request`}></ModalHeader>
              <ModalBody>
                <div
                  style={{
                    display: "flex",
                    justifyContent: "center",
                    gap: "20px",
                  }}
                >
                  <div>
                    <DatePicker
                      id="from-date-picker"
                      datePickerType="single"
                      onChange={(data) => setFormDate(data)}
                    >
                      <DatePickerInput
                        id={`from`}
                        labelText={`From`}
                        placeholder={`From`}
                      />
                    </DatePicker>
                    <Checkbox
                      id={`from-half-day`}
                      labelText={`Half day`}
                      onChange={(_, { checked }) => setFromHalfDay(checked)}
                    />
                  </div>
                  <div>
                    <DatePicker
                      id="to-date-picker"
                      datePickerType="single"
                      onChange={(data) => setToDate(data)}
                    >
                      <DatePickerInput
                        id={`to`}
                        labelText={`To`}
                        placeholder={`To`}
                      />
                    </DatePicker>
                    <Checkbox
                      id={`to-half-day`}
                      labelText={`Half day`}
                      onChange={(_, { checked }) => setToHalfDay(checked)}
                    />
                  </div>
                </div>
              </ModalBody>
              <ModalFooter>
                <Button kind="secondary" onClick={() => setOpen(false)}>
                  Cancel
                </Button>
                <Button
                  kind="primary"
                  onClick={() => {
                    setLoading(true);
                    // TODO: save holiday request to database
                    // setOpen(false);
                  }}
                >
                  Add
                </Button>
              </ModalFooter>
            </ComposedModal>,
            document.body,
          )}
      <Button
        kind="primary"
        onClick={() => {
          setOpen(true);
        }}
      >
        Add Holiday Request
      </Button>
    </>
  );
}
