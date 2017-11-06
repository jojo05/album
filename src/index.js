import { h, Component, render } from 'preact';

import Album from './album';
import './album.css';

import IMAGES from './images.json';


render(<Album images={IMAGES} />, document.body); 



