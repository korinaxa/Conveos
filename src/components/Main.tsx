import { useNavigate } from 'react-router-dom';

function Main() {
const navigate = useNavigate();

const goToSecondsComp = () => {

	// This will navigate to second component
	navigate('/movie/:Title');
};
const gotToFirstComp = () => {

	// This will navigate to first component
	navigate('/first');
};

return (
	<div className="App">
	<header className="App-header">
		<p>Main components</p>
		<button onClick={goToSecondsComp}>go to 2nd </button>
		<button onClick={gotToFirstComp}>go to 1st </button>
	</header>
	</div>
);
}

export default Main;
