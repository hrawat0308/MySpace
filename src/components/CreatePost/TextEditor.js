import JoditEditor from 'jodit-react';
import { useRef } from 'react';
import { TextEditorActions } from '../../store';
import { useSelector, useDispatch } from 'react-redux';

const TextEditor = function(props){

    const textValue = useSelector((state)=>state.textEditor.textValue);
    console.log(textValue);
    const editor = useRef(null);
    const dispatch = useDispatch();
    const onTextChangeHandler = (content) => {
        dispatch(TextEditorActions.setTextValue({ value : content }));
    }
    
    return(
        <JoditEditor    
            ref={editor}
            value={props.initialValue}
            onChange={ onTextChangeHandler}
        />
    );
}

export default TextEditor;