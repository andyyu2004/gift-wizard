import React, { useState } from 'react'
import { useSelector, useDispatch } from 'react-redux';
import { AppState } from '../reducers';
import { Questionnaire } from '../types/FormTypes';
import { deleteTemplate } from '../actions/actionCreaters';

/** Component for modifying the questionnaire template repository */
const QRepo = () => {
	const [showDelete, setShowDelete] = useState(false);
	const templates = useSelector<AppState, { [key:string]: Questionnaire }>(state => state.forms.templates);
	
	const dispatch = useDispatch();

	return (
		<div>
			<button onClick={() => setShowDelete(!showDelete)}>Show Template Deletion</button>
			{showDelete && Object.values(templates).map(q => 
				<div key={q.label}>
					{q.label}
					<button onClick={() => dispatch(deleteTemplate(q.label))}>DEL</button>
				</div>)
			}
		</div>
	);

};

export default QRepo;
