import React from 'react'
import { RankFormRepr } from 'shared/types';
import { FormAction } from "../../types/FormActions";
import Question from './Question';
import { DragDropContext, Droppable, Draggable } from 'react-beautiful-dnd';
import { updateOption, reorderRank, addOption, removeOption } from '../../actions/actionCreaters';
import "./RankQ.css";

type PropType = {
  formRepr: RankFormRepr,
  dispatch?: React.Dispatch<FormAction>,
  editable: boolean,
};

const RankQ: React.FC<PropType> = ({ formRepr, dispatch, editable }) => {
  const { options } = formRepr;

  const onDragEnd = (res: any) => {
    const { destination, source } = res;
    if (!destination || (source.droppableId === destination.droppableId && source.index === destination.index)) return;
    // The droppableId is the formid, so make sure that matches
    dispatch && dispatch(reorderRank(source.index, destination.index, source.droppableId));
  };

  const handleAddOption = (e: React.MouseEvent<HTMLElement>) => {
    e.preventDefault();
    dispatch && dispatch(addOption("New Option", formRepr.id));
  };

  const handleDeleteOption = (e: React.MouseEvent<HTMLElement>, index: number) => {
    e.preventDefault();
    dispatch && dispatch(removeOption(index, formRepr.id));
  };


  // const DragComp = ({ id, i, option }) => (
  //   <Draggable key={id} draggableId={id} index={i} isDragDisabled={dispatch === undefined}>
  //     {provided => 
  //       <div {...provided.draggableProps} {...provided.dragHandleProps} ref={provided.innerRef}>
  //         {editable 
  //           ? <input className="dragoptionbox" value={option} onChange={e => dispatch(updateOption(e.target.value, i, formRepr.id))}/>
  //           : (<><span style={{marginBottom:"5px", marginTop:"5px", display:"inline-block", fontFamily:"Lucida Console, Monaco, monospace"}}>{option}</span><br/></>) // Lags horrendously if block element is rendered here instead
  //         }
  //         {provided.placeholder}
  //       </div>
  //     }
  //   </Draggable>
  // );


  return (
    <DragDropContext onDragEnd={onDragEnd}>
      <Question formRepr={formRepr} dispatch={dispatch} editable={editable} />
      {editable && <button className='generic-button' onClick={handleAddOption}>Add Option</button>}
      <Droppable droppableId={formRepr.id}>
        {provided => 
          <div {...provided.droppableProps} ref={provided.innerRef}>
            {options.map(([option, id], i) => (
                <Draggable key={id} draggableId={id} index={i} isDragDisabled={dispatch === undefined}>
                {provided => 
                  <div {...provided.draggableProps} {...provided.dragHandleProps} ref={provided.innerRef}>
                    {editable 
                      ? <input key={id} className="dragoptionbox" value={option} onChange={e => dispatch && dispatch(updateOption(e.target.value, i, formRepr.id))}/>
                      : (<><span style={{marginBottom:"5px", marginTop:"5px", display:"inline-block", fontFamily:"Lucida Console, Monaco, monospace"}}>{option}</span><br/></>) // Lags horrendously if block element is rendered here instead
                    }
                    {editable && <button onClick={e => handleDeleteOption(e, i)} className="generic-button">del</button>}
                    {provided.placeholder}
                  </div>
                }
              </Draggable>
            ))}
            {provided.placeholder}
          </div>
        }
      </Droppable>
    </DragDropContext>
  );
};

export default RankQ;
