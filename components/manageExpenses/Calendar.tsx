import { useState } from "react";
import { StyleSheet, View } from "react-native";

import { GlobalStyles } from "../../constants/styles";
import Input from "./Input";
import ModalCalendar from "./ModalCalendar";

import IconButton from "../UI/IconButton";

interface ICalendarPickerProps {
  date: string;
  setDate: (date: string) => void;
  isValid: boolean;
}

const Calendar: React.FC<ICalendarPickerProps> = ({
  date,
  setDate,
  isValid,
}) => {
  const [modalVisibility, setModalVisible] = useState(false);
  const closeModal = () => setModalVisible(false);

  const updateDate = (date: string) => {
    closeModal();
    setDate(date);
  };
  return (
    <>
      <View>
        <Input
          isValid={isValid}
          label="Date"
          textInputProps={{
            keyboardType: "decimal-pad",
            maxLength: 10,
            placeholder: "YYYY-MM-DD",
            onChangeText: (text: string) => setDate(text),
          }}
          value={date}
        >
          <IconButton
            icon="calendar"
            color={GlobalStyles.colors.primary50}
            size={26}
            onPress={() => setModalVisible(true)}
          />
        </Input>
      </View>

      <ModalCalendar
        modalVisibility={modalVisibility}
        closeModal={closeModal}
        updateDate={updateDate}
        date={date}
      />
    </>
  );
};

export default Calendar;
const styles = StyleSheet.create({
  input: {},
});
