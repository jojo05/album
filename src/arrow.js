import { h, Component } from 'preact';
import Icon from './icon';


export default class Arrow extends Component {
	render({icon, onClick, ...props }) {
		return (
			<button
				type="button"
				onClick={onClick}
				{...props}
			>
				<Icon fill="white" type={icon} />
			</button>
		);
	}
};
