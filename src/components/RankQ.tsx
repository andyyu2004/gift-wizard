import React from 'react'
import { RankFormRepr } from './QEdit';
import { FormAction } from '../containers/QEditContainer';
import Question from './Question';
import { DragDropContext, Droppable, Draggable } from 'react-beautiful-dnd';
import { updateOption, reorderRank } from '../actions/actionCreaters';

type PropType = {
  formRepr: RankFormRepr,
  dispatch: React.Dispatch<FormAction>,
  editable: boolean,
};

const RankQ: React.FC<PropType> = ({ formRepr, dispatch, editable }) => {
  const { options } = formRepr;

  const onDragEnd = res => {
    const { destination, source } = res;
    if (!destination || (source.droppableId === destination.droppableId && source.index === destination.index)) return;
    // The droppableId is the formid, so make sure that matches
    dispatch(reorderRank(source.index, destination.index, source.droppableId));
  };

  const DragComp = ({ id, i, option }) => (
    <Draggable key={id} draggableId={id} index={i} isDragDisabled={dispatch === undefined}>
      {provided => 
        <div {...provided.draggableProps} {...provided.dragHandleProps} ref={provided.innerRef}>
          {editable 
            ? <input value={option} onChange={e => dispatch(updateOption(e.target.value, i, formRepr.id))}/>
            : (<><span>{option}</span><br/></>) // Lags horrendously if block element is rendered here instead
          }
          {provided.placeholder}
        </div>
      }
    </Draggable>
  );

  return (
    <DragDropContext onDragEnd={onDragEnd}>
      <Question formRepr={formRepr} dispatch={dispatch} editable={editable} />
      <Droppable droppableId={formRepr.id}>
        {provided => 
          <div {...provided.droppableProps} ref={provided.innerRef}>
            {options.map(([option, id], i) => <DragComp key={id} id={id} i={i} option={option} />)}
            {provided.placeholder}
          </div>
        }
      </Droppable>
    </DragDropContext>
  );
};

export default RankQ;
