import  { router } from './router';
import "./style.css";

const $root = document.getElementById('root');

if (!$root) {
    throw new Error('No encontrado');
}

router();