import {useState} from 'react'
import TypeSelector from './TypeSelector'
import Question from './Question'
import Option from './Options'
import { useHistory } from "react-router";

const CreateSurvey = ({squestions,setSquestions})=>{

    const history = useHistory();
    const getRandom = () =>{
        return Math.floor((Math.random() * 1000) + 1)
    } 

    const defaultOptionsState = [{uid: getRandom(), value:''},{uid: getRandom(), value:''}];
    const [qText,setQtext] = useState('');
    const [qType,setQtype] = useState(0);
    const [options,setOptions] = useState(defaultOptionsState);

    const addOption = () => {
        let newOption = {
            uid:getRandom(),
            value:''
        };
        let updateOptions = [...options];
        updateOptions.push(newOption);
        setOptions(updateOptions);
    } 

    const deleteOption = () => {
        if(options.length === 2){
            alert('Error:A selected question should have atleast 2 options')
        }
        else{
            let updateOptions = [...options];
            updateOptions.pop();
            setOptions(updateOptions);
        } 
    }

    const updateOptionText = (id,text) => {
        let updateOptions = [...options];
        let changeIndex = updateOptions.findIndex( x => x.uid === id);
        updateOptions[changeIndex].value = text;
        setOptions(updateOptions);
    }

    const updateSurveyQuestion = () => {
        let newSurveyQuestion = [...squestions];
        let newQ = {
            qtext : qText,
            qtype : qType,
            options : options
        }
        newSurveyQuestion.push(newQ);
        setSquestions(newSurveyQuestion);
        setQtype(0);
        setQtext('');
        setOptions(defaultOptionsState);
        
    }

    const publish = () => {
        updateSurveyQuestion();
        history.push('/published')
    }

    return (
        <>
            <TypeSelector qType={qType} setQtype={setQtype}/>

            {qType!==0? 
                <>
                    <Question onTextUpdate={setQtext} />
                    
                    {options.map((opt,key) =>(
                        <Option 
                        key={key}
                        uid={opt.uid} 
                        addOption={addOption} 
                        deleteOption={deleteOption}
                        updateOptionText={updateOptionText}
                        />
                    ))}
                    <button className="btn btn-primary m-1" onClick={() => updateSurveyQuestion()}>Add Question</button>
                    <button className="btn btn-primary m-1" onClick={() => publish()}>Publish</button>
                </>
                : null}
            
        </>
    )
}
export default CreateSurvey;