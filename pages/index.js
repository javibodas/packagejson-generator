import Container from 'components/Container';
import { TextEditorJSONContextProvider } from 'context/textEditorJsonContext';
import { FormJSONContextProvider } from 'context/formJsonContext';
import Header from 'components/Header';

export default function HomePage(props) {
	  
  	return (<>
                <Header />
                <TextEditorJSONContextProvider>
                <FormJSONContextProvider>
                    <Container />
                </FormJSONContextProvider>
                </TextEditorJSONContextProvider>
            </>)
}