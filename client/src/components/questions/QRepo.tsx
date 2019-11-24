import React, { useState } from 'react'
import { useSelector, useDispatch } from 'react-redux';
import { AppState } from '../../reducers';
import { Questionnaire } from 'shared/types';
import { deleteTemplate } from '../../actions/actionCreaters';
import "./QRepo.css";

/** Component for modifying the questionnaire template repository */
const QRepo = () => {
	const [showDelete, setShowDelete] = useState(false);
	const templates = useSelector<AppState, { [key:string]: Questionnaire }>(state => state.forms.templates);
	
	const dispatch = useDispatch();

	return (
		<div className="templateDelete">
			<h3 className="header">Delete Templates</h3>
			<div className="templateContainer">
				<button className= "showdel" onClick={() => setShowDelete(!showDelete)}>Show Template Deletion</button>
				{showDelete && Object.values(templates).map(q => 
					<div className= "temp" key={q.label}>
						{q.label}
						<button className="del" onClick={() => dispatch(deleteTemplate(q.label))}>del</button>
					</div>)
				}
			</div>
		</div>
	);

};

export default QRepo;
