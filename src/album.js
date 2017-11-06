import { h, Component } from 'preact';
import Portal from 'preact-portal';
import Icon from './icon';
import Arrow from './arrow';


export default class Album extends Component {
	constructor () {
		super();
		this.state = {
			currentImage: 0,
			isOpen: false,
		};
	}

	open = (index, event) => {
		event.preventDefault();
		this.setState({
			currentImage: index,
			isOpen: true,
		});
	}
	onClose = () => {
		this.setState({
			currentImage: 0,
			isOpen: false,
		});
	}
	onNext = () => {
		this.setState({
			currentImage: this.state.currentImage + 1,
		});
	}
	onPrev = () => {
		this.setState({
			currentImage: this.state.currentImage - 1,
		});
	}
	onClickImage = () => {
		if (this.state.currentImage === this.props.images.length - 1) 
			return;
		this.onNext();
	}

	renderThumbs() {
		const { images } = this.props;
		if (!images) 
			return;
		const album = images.map((obj, i) => {
			return (
				<a href={obj.src} key={i} onClick={(e) => this.open(i, e)} >
					<img src={obj.thumbnail} class="thumb" />
				</a>
			);
		});
		return ( <div> {album} </div> );
	}

	render({images}, {currentImage, isOpen}) {
		return (
			<div>
				{this.renderThumbs()}
				<Lightbox 
					currentImage={currentImage}
					isOpen={isOpen}
					onClose={this.onClose}
					onNext={this.onNext}
					onPrev={this.onPrev}
					onClickImage={this.onClickImage}
					images={images}
				/>
			</div>
		)
	}
}

class Lightbox extends Component {

	constructor () {
		super();
	}

	renderArrowNext = () => {
		if (this.props.currentImage === (this.props.images.length - 1)) 
			return null;
		return ( <Arrow icon="arrowRight" onClick={this.props.onNext} type="button" class="arrow arrow_right" /> ); 
	}
	renderArrowPrev = () => {
		if (this.props.currentImage === 0) 
			return null;
		return ( <Arrow icon="arrowLeft" onClick={this.props.onPrev} type="button" class="arrow arrow_left" /> ); 
	}

	render({currentImage, isOpen, onClose, onClickImage, images}) {
		const url = images[currentImage].src;
		return (
			<div>
				{ isOpen ? (
					<Portal into="body">
						<Container class="container">
							<div class="content"> 
								<Header class="header" onClose={onClose} />
								<figure class="figure">
									<img src={url} class="image" onClick={onClickImage} />
									<Footer 
										class="footer"
										caption={images[currentImage].caption}
										countCurrent={currentImage + 1}
										countTotal={images.length}
									/>
								</figure>
							</div>
							{this.renderArrowPrev()}
							{this.renderArrowNext()}
						</Container>
					</Portal>
				) : <span /> }
			</div>
		);
	}
}

class Container extends Component {
	render({...props}) {
		return (
			<div {...props} />
		);
	}
}
	
class Header extends Component {
	render({onClose, ...props}) {
		return (
			<div {...props}>
				<span> </span>
				<button class="close" onClick={onClose} >
					<Icon fill="white" type="close" />
				</button>
			</div>
		);
	}
}

class Footer extends Component {
	render({caption, countCurrent, countTotal, ...props}) {
		return (
			<div {...props}>
				<figcaption class="footer_caption">
					{caption}
				</figcaption>
				<div class="footer_count"> {countCurrent} {" | "} {countTotal} </div>
			</div>
		);
	}
};



