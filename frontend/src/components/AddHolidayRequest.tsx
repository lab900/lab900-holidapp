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
import { useAuthState } from "react-firebase-hooks/auth";
import { auth } from "../firebase";
import axios from "axios";

const RequestUrl =
  "https://us-central1-lab900-holidapp.cloudfunctions.net/webApi/request";

export default function AddHolidayRequest() {
  const [user] = useAuthState(auth);
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
            <ComposedModal
              open={open}
              onClose={() => setOpen(false)}
              preventCloseOnClickOutside={true}
            >
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
                    if (!fromDate || !toDate) {
                      // TODO: Add Error Handling
                      return;
                    }

                    user?.getIdToken().then((token) => {
                      axios
                        .post(
                          `${RequestUrl}`,
                          {
                            from: fromDate[0].toLocaleString().split(",")[0],
                            to: toDate[0].toLocaleString().split(",")[0],
                          },
                          {
                            headers: {
                              Authorization: `Bearer ${token}`,
                            },
                          },
                        )
                        .then((response) => {
                          console.log("response", response);
                        })
                        .catch((error) => {
                          console.error(error);
                        })
                        .finally(() => {
                          setLoading(false);
                        });
                    });
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
