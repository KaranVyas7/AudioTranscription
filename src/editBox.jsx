import React, { useState, useRef } from 'react';
import { StyleSheet, View, TextInput, Button } from 'react-native';
import PropTypes from 'prop-types';

function EditBox({ value, onChange, ...props }) {
    const [canEdit, setEditMode] = useState(false);
    const [text, setText] = useState(value);
    const inputRef = useRef(null);

    function turnOnEdit() {
        setEditMode(true);
        inputRef.current.focus();
    }

    const handleChange = (newText) => {
        setText(newText);
        onChange(newText); // Call the parent function to handle text change
    };

    const mystyle = StyleSheet.create({
        button: {
            position: 'absolute',
            right: 0,
            top: 0,
        },
        wrapper: {
            width: 700,
            padding: 10,
            overflowY: 'scroll',
        },
        input: {
            borderColor: 'gray',
            height: 100,
            borderWidth: 1,
            padding: 5,
        },
    });

    return (
        <View style={mystyle.wrapper}>
            <TextInput
                style={mystyle.input}
                value={text}
                editable={canEdit}
                ref={inputRef}
                onChangeText={handleChange}
                onBlur={() => setEditMode(false)}
                multiline={true}
            />
            {!canEdit && (
                <Button
                    style={mystyle.button}
                    title="Edit"
                    onPress={turnOnEdit}
                />
            )}
        </View>
    );
}

EditBox.propTypes = {
    value: PropTypes.string,
    onChange: PropTypes.func.isRequired,
};

export default EditBox;
