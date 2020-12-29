import React, {useContext, useRef, useState} from 'react';

import {Text, View} from 'react-native';
import CreateContactComponent from '../../components/CreateContactComponent';
import createContact from '../../context/actions/contacts/createContact';
import {GlobalContext} from '../../context/Provider';
import {useNavigation} from '@react-navigation/native';
import {CONTACT_LIST} from '../../constants/routeNames';

const CreateContact = () => {
  const {
    contactsDispatch,
    contactsState: {
      createContact: {loading, error},
    },
  } = useContext(GlobalContext);

  const sheetRef = useRef(null);
  const [form, setForm] = useState({});
  const {navigate} = useNavigation();
  const onChangeText = ({name, value}) => {
    setForm({...form, [name]: value});
  };
  const [localFile, setLocalFile] = useState(null);

  const onSubmit = () => {
    console.log('form :>> ', form);
    createContact(form)(contactsDispatch)(() => {
      navigate(CONTACT_LIST);
    });
  };

  const closeSheet = () => {
    if (sheetRef.current) {
      sheetRef.current.close();
    }
  };
  const openSheet = () => {
    if (sheetRef.current) {
      sheetRef.current.open();
    }
  };
  const toggleValueChange = () => {
    setForm({...form, isFavorite: !form.isFavorite});
  };

  const onFileSelected = (image) => {
    closeSheet();
    setLocalFile(image);
  };
  return (
    <CreateContactComponent
      onSubmit={onSubmit}
      onChangeText={onChangeText}
      form={form}
      setForm={setForm}
      loading={loading}
      toggleValueChange={toggleValueChange}
      error={error}
      sheetRef={sheetRef}
      closeSheet={closeSheet}
      openSheet={openSheet}
      onFileSelected={onFileSelected}
      localFile={localFile}
    />
  );
};

export default CreateContact;
