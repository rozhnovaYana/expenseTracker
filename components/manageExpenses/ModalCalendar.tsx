import { useState } from "react";
import { Modal, View, StyleSheet } from "react-native";
import CalendarPicker from "react-native-calendar-picker";
import { Moment } from "moment";

import { GlobalStyles } from "../../constants/styles";
import Button from "../UI/Button";

import { formatDate } from "../../utils/dateFormatter";

interface IModalCalendarPickerProps {
  modalVisibility: boolean;
  closeModal: () => void;
  updateDate: (date: string) => void;
  date: string;
}

const ModalCalendar: React.FC<IModalCalendarPickerProps> = ({
  modalVisibility,
  closeModal,
  updateDate,
  date: initialDate,
}) => {
  const maxDate = new Date();
  const [date, setDate] = useState<string>(initialDate);

  const onDateChange = (date: Moment) => {
    const formattedDate = formatDate(date.toDate());
    setDate(formattedDate);
  };
  return (
    <Modal
      animationType="fade"
      visible={modalVisibility}
      onRequestClose={closeModal}
      transparent={true}
    >
      <View style={styles.modal}>
        <CalendarPicker
          onDateChange={onDateChange}
          todayBackgroundColor={"transparent"}
          selectedDayColor={GlobalStyles.colors.primary50}
          textStyle={{
            color: GlobalStyles.colors.primary50,
          }}
          maxDate={maxDate}
          disabledDatesTextStyle={{
            color: GlobalStyles.colors.primary500,
          }}
          todayTextStyle={{
            color: GlobalStyles.colors.primary100,
          }}
        />
        <View style={styles.buttons}>
          <Button mode="flat" style={styles.button} onPress={closeModal}>
            Close
          </Button>
          <Button style={styles.button} onPress={() => updateDate(date)}>
            Ok
          </Button>
        </View>
      </View>
    </Modal>
  );
};

export default ModalCalendar;

const styles = StyleSheet.create({
  modal: {
    flex: 1,
    backgroundColor: GlobalStyles.colors.primary700,
    paddingTop: 50,
    alignItems: "center",
  },
  button: {
    marginTop: 25,
    paddingVertical: 10,
    paddingHorizontal: 40,
    minWidth: "40%",
    marginHorizontal: 10,
  },
  buttons: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
});
